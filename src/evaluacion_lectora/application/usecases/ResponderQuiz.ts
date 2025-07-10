import { QuizRepository } from '../../domain/repositories/interfaces/QuizRepository';
import { IntentoQuizRepository } from '../../domain/repositories/interfaces/IntentoQuizRepository';
import { IntentoQuiz } from '../../domain/entities/IntentoQuiz';

interface RespuestaUsuario {
  idPregunta: number;
  idRespuestaSeleccionada: number;
}

interface Input {
  idUsuario: number;
  idQuiz: number;
  respuestas: RespuestaUsuario[];
}

export class ResponderQuiz {
  private static readonly MIN_APROBADO = 4; 
  constructor(
    private readonly quizRepo: QuizRepository,
    private readonly intentoRepo: IntentoQuizRepository
  ) {}

  async execute(input: Input): Promise<{ puntaje: number; aprobado: boolean }> {
    const { idUsuario, idQuiz, respuestas } = input;

    // 1️⃣ Obtener quiz completo
    const quiz = await this.quizRepo.encontrarPorId(idQuiz); 
    if (!quiz) throw new Error('Quiz no encontrado');

    // 2️⃣ Calcular puntaje
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

    // 3️⃣ Crear entidad IntentoQuiz y guardar
    const intento = new IntentoQuiz(idQuiz, idUsuario, puntaje);
    await this.intentoRepo.guardarIntento(intento);

    return { puntaje, aprobado };
  }
}
