import { IntentoQuiz } from '../entities/IntentoQuiz';

export class IntentoQuizFactory {
  static crearNuevo(
    idQuiz: number,
    idUsuario: number,
    respuestasCorrectas: number
  ): IntentoQuiz {
    return new IntentoQuiz(idQuiz, idUsuario, respuestasCorrectas);
  }

  static reconstruir(
    id: number,
    idQuiz: number,
    idUsuario: number,
    respuestasCorrectas: number,
    fecha: Date
  ): IntentoQuiz {
    return new IntentoQuiz(idQuiz, idUsuario, respuestasCorrectas, id, fecha);
  }
}
