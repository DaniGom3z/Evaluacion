import { QuizRepository } from '../../domain/repositories/interfaces/QuizRepository';
import { IntentoQuizRepository } from '../../domain/repositories/interfaces/IntentoQuizRepository';
import { IntentoQuiz } from '../../domain/entities/IntentoQuiz';
import { EventBus } from '../../domain/events/EventBus';
import { QuizCompletadoEvent } from '../../domain/events/QuizCompletadoEvent';
import { QuizId } from '../../domain/value-objects/QuizId';
import { UsuarioId } from '../../domain/value-objects/UsuarioId';

interface RespuestaUsuario {
  idPregunta: number;
  idRespuestaSeleccionada: number;
}

interface Input {
  idUsuario: number;
  idQuiz: number;
  respuestas: RespuestaUsuario[];
}

interface Output {
  puntaje: number;
  aprobado: boolean;
  mensaje: string;
}

export class ResponderQuiz {
  private static readonly MIN_APROBADO = 4; 
  
  constructor(
    private readonly quizRepo: QuizRepository,
    private readonly intentoRepo: IntentoQuizRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(input: Input): Promise<Output> {
    const { idUsuario, idQuiz, respuestas } = input;

    const quizId = QuizId.create(idQuiz);
    const usuarioId = UsuarioId.create(idUsuario);

    // Obtener quiz completo
    const quiz = await this.quizRepo.encontrarPorId(quizId.getValue()); 
    if (!quiz) throw new Error('Quiz no encontrado');

    // Calcular puntaje
    let puntaje = 0;

    for (const respuestaUsuario of respuestas) {
      const pregunta = quiz
        .getPreguntas()
        .find(p => p.getId() === respuestaUsuario.idPregunta);
      if (!pregunta) continue;

      const respuesta = pregunta
        .getRespuestas()
        .find(r => r.getId() === respuestaUsuario.idRespuestaSeleccionada);

      if (respuesta?.esLaCorrecta()) puntaje++;
    }

    const aprobado = puntaje >= ResponderQuiz.MIN_APROBADO;

    // Crear entidad IntentoQuiz y guardar
    const intento = new IntentoQuiz(idQuiz, idUsuario, puntaje);
    await this.intentoRepo.guardarIntento(intento);

    // Publicar domain event
    const event = new QuizCompletadoEvent(quizId, usuarioId, puntaje, aprobado);
    await this.eventBus.publish(event);

    return { 
      puntaje, 
      aprobado,
      mensaje: aprobado ? '¡Felicitaciones! Has aprobado el quiz.' : 'Necesitas más práctica. ¡Sigue intentando!'
    };
  }
}
