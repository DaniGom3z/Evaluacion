export class Respuesta {
  constructor(
    private readonly texto: string,
    readonly esCorrecta: boolean,
    private readonly id: number | null = null
  ) {
    if (!texto.trim()) throw new Error('El texto de la respuesta no puede estar vacío');
  }

  getId(): number | null  { return this.id; }
  getTexto(): string      { return this.texto; }
  esLaCorrecta(): boolean { return this.esCorrecta; }
}
