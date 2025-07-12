import { Quiz } from '../entities/Quiz';
import { Pregunta } from '../entities/Pregunta';
import { LibroId } from '../value-objects/LibroId';
import { UsuarioId } from '../value-objects/UsuarioId';
import { Pagina } from '../value-objects/Pagina';

export class QuizFactory {
  /**
   * Crea un quiz nuevo (sin ID, se asignará al persistir)
   */
  static crearNuevo(
    libroId: LibroId,
    usuarioId: UsuarioId,
    pagina: Pagina,
    preguntas: Pregunta[] = []
  ): Quiz {
    return Quiz.crearNuevo(libroId, usuarioId, pagina, preguntas);
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
    return Quiz.reconstruir(id, idLibro, idUsuario, pagina, fecha, preguntas);
  }
}
