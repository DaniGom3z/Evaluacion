import { Respuesta } from './Respuesta';

export class Pregunta {
  constructor(
    private readonly texto: string,
    private readonly respuestas: Respuesta[],
    private readonly idQuiz: number,
    private readonly id: number | null = null
  ) {
    if (respuestas.length < 2) throw new Error('Debe haber al menos 2 respuestas');
    if (respuestas.filter(r => r.esCorrecta).length !== 1)
      throw new Error('Debe existir exactamente 1 respuesta correcta');
  }

  getId(): number | null         { return this.id; }
  getTexto(): string             { return this.texto; }
  getRespuestas(): Respuesta[]   { return this.respuestas; }
  getIdQuiz(): number            { return this.idQuiz; }
}
