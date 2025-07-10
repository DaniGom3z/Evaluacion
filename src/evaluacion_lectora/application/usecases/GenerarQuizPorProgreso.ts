// application/usecases/GenerarQuizPorProgreso.ts
import { QuizFactory } from '../../domain/factories/QuizFactory';
import { QuizRepository } from '../../domain/repositories/interfaces/QuizRepository';
import { GeneradorQuizService } from '../../domain/services/GeneradorQuizService';

interface Input {
  idUsuario: number;
  idLibro: number;
  paginaActual: number;
  contenidoHTML: string; // HTML ya descargado desde S3
}

export class GenerarQuizPorProgreso {
  // Cada 15 páginas se genera un quiz
  private static readonly PAGINAS_POR_QUIZ = 10;

  constructor(
    private readonly quizRepo: QuizRepository,
    private readonly generadorService: GeneradorQuizService
  ) {}

  /** Devuelve el id del quiz generado */
  async execute(input: Input): Promise<number> {
    const { idUsuario, idLibro, paginaActual, contenidoHTML } = input;

    // 1️⃣ Solo permitimos cuando es múltiplo de 15
    if (paginaActual % GenerarQuizPorProgreso.PAGINAS_POR_QUIZ !== 0) {
      throw new Error('La página actual no dispara generación de quiz');
    }


    // 3️⃣ Crear entidad Quiz vacía
    const quizVacio = QuizFactory.crearNuevo(
      idLibro,
      idUsuario,
      paginaActual,
      [] // sin preguntas
    );

    // 4️⃣ Persistir quiz vacío
    const quizGuardado = await this.quizRepo.crearConPreguntas(quizVacio);
    const idQuiz = quizGuardado.getId()!;

    // 5️⃣ Generar 7 preguntas con IA usando el idQuiz
    const preguntas = await this.generadorService.generarPreguntas(contenidoHTML, idQuiz);

    // 6️⃣ Actualizar el quiz con las preguntas generadas
    await this.quizRepo.actualizarPreguntas(idQuiz, preguntas);

    // 7️⃣ Devolver id
    return idQuiz;
  }
}
