import { QuizFactory } from '../../domain/factories/QuizFactory';
import { QuizRepository } from '../../domain/repositories/interfaces/QuizRepository';
import { GeneradorQuizService } from '../../domain/services/GeneradorQuizService';
import { EventBus } from '../../domain/events/EventBus';
import { QuizGeneradoEvent } from '../../domain/events/QuizGeneradoEvent';
import { LibroId } from '../../domain/value-objects/LibroId';
import { UsuarioId } from '../../domain/value-objects/UsuarioId';
import { Pagina } from '../../domain/value-objects/Pagina';

interface Input {
  idUsuario: number;
  idLibro: number;
  paginaActual: number;
  contenidoHTML: string;
}

interface Output {
  quizId: number;
  mensaje: string;
}

export class GenerarQuizPorProgreso {
  private static readonly PAGINAS_POR_QUIZ = 10;

  constructor(
    private readonly quizRepo: QuizRepository,
    private readonly generadorService: GeneradorQuizService,
    private readonly eventBus: EventBus
  ) {}

  async execute(input: Input): Promise<Output> {
    const { idUsuario, idLibro, paginaActual, contenidoHTML } = input;

    const libroId = LibroId.create(idLibro);
    const usuarioId = UsuarioId.create(idUsuario);
    const pagina = Pagina.create(paginaActual);

    // Validar que la página permita generar quiz
    if (!pagina.esMultiploDe(GenerarQuizPorProgreso.PAGINAS_POR_QUIZ)) {
      throw new Error('La página actual no dispara generación de quiz');
    }

    // Crear entidad Quiz vacía
    const quizVacio = QuizFactory.crearNuevo(
      libroId,
      usuarioId,
      pagina,
      []
    );

    // Persistir quiz vacío
    const quizGuardado = await this.quizRepo.crearConPreguntas(quizVacio);
    const quizId = quizGuardado.getId()!;

    // Generar preguntas con IA
    const preguntas = await this.generadorService.generarPreguntas(contenidoHTML, quizId.getValue());

    // Actualizar el quiz con las preguntas generadas
    await this.quizRepo.actualizarPreguntas(quizId.getValue(), preguntas);

    // Publicar domain event
    const event = new QuizGeneradoEvent(quizId, libroId, usuarioId, pagina);
    await this.eventBus.publish(event);

    return {
      quizId: quizId.getValue(),
      mensaje: 'Quiz generado exitosamente'
    };
  }
}
