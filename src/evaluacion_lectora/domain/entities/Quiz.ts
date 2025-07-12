import { Pregunta } from './Pregunta';
import { QuizId } from '../value-objects/QuizId';
import { LibroId } from '../value-objects/LibroId';
import { UsuarioId } from '../value-objects/UsuarioId';
import { Pagina } from '../value-objects/Pagina';

export class Quiz {
  private constructor(
    private readonly id: QuizId | null,
    private readonly libroId: LibroId,
    private readonly usuarioId: UsuarioId,
    private readonly pagina: Pagina,
    private readonly preguntas: Pregunta[],
    private readonly fechaCreacion: Date
  ) {
    this.validarPreguntas(preguntas);
  }

  private validarPreguntas(preguntas: Pregunta[]): void {
    if (preguntas.length !== 0 && preguntas.length !== 7) {
      throw new Error('Un quiz debe tener exactamente 7 preguntas o estar vacío');
    }
  }

  // Factory methods
  static crearNuevo(
    libroId: LibroId,
    usuarioId: UsuarioId,
    pagina: Pagina,
    preguntas: Pregunta[] = []
  ): Quiz {
    return new Quiz(null, libroId, usuarioId, pagina, preguntas, new Date());
  }

  static reconstruir(
    id: number,
    libroId: number,
    usuarioId: number,
    pagina: number,
    fechaCreacion: Date,
    preguntas: Pregunta[]
  ): Quiz {
    return new Quiz(
      QuizId.create(id),
      LibroId.create(libroId),
      UsuarioId.create(usuarioId),
      Pagina.create(pagina),
      preguntas,
      fechaCreacion
    );
  }

  // Business methods
  agregarPreguntas(nuevasPreguntas: Pregunta[]): Quiz {
    const preguntasCombinadas = [...this.preguntas, ...nuevasPreguntas];
    return new Quiz(
      this.id,
      this.libroId,
      this.usuarioId,
      this.pagina,
      preguntasCombinadas,
      this.fechaCreacion
    );
  }

  estaCompleto(): boolean {
    return this.preguntas.length === 7;
  }

  // Getters
  getId(): QuizId | null { return this.id; }
  getLibroId(): LibroId { return this.libroId; }
  getUsuarioId(): UsuarioId { return this.usuarioId; }
  getPagina(): Pagina { return this.pagina; }
  getPreguntas(): Pregunta[] { return [...this.preguntas]; } // Return copy to prevent mutation
  getFechaCreacion(): Date { return this.fechaCreacion; }
}
