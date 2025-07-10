import { Quiz } from '../entities/Quiz';
import { Pregunta } from '../entities/Pregunta';

export class QuizFactory {
  /**
   * Crea un quiz nuevo (sin ID, se asignará al persistir)
   */
  static crearNuevo(
    idLibro: number,
    idUsuario: number,
    pagina: number,
    preguntas: Pregunta[]
  ): Quiz {
    return new Quiz(idLibro, idUsuario, pagina, preguntas);
  }

  /**
   * Reconstruye un quiz ya existente (cargado de la BD)
   */
  static reconstruir(
    id: number,
    idLibro: number,
    idUsuario: number,
    pagina: number,
    fecha: Date,
    preguntas: Pregunta[]
  ): Quiz {
    return new Quiz(idLibro, idUsuario, pagina, preguntas, id, fecha);
  }
}
