import { Pregunta } from './Pregunta';

export class Quiz {
  constructor(
    private readonly idLibro: number,
    private readonly idUsuario: number,
    private readonly pagina: number,
    private readonly preguntas: Pregunta[],
    private readonly id: number | null = null,
    private readonly fechaCreacion: Date = new Date()
  ) {
    if (preguntas.length !== 0 && preguntas.length !== 7) {
  throw new Error('Un quiz debe tener exactamente 7 preguntas o estar vacío');
    }
  }

  /* getters … */
  getId(): number | null      { return this.id; }
  getLibroId(): number        { return this.idLibro; }
  getUsuarioId(): number      { return this.idUsuario; }
  getPagina(): number         { return this.pagina; }
  getPreguntas(): Pregunta[]  { return this.preguntas; }
  getFechaCreacion(): Date    { return this.fechaCreacion; }
}
