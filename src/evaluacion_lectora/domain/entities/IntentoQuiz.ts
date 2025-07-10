export class IntentoQuiz {
  constructor(
    private readonly idQuiz: number,
    private readonly idUsuario: number,
    private readonly respuestasCorrectas: number,
    private readonly id: number | null = null,
    private readonly fecha: Date = new Date()
  ) {
    if (respuestasCorrectas < 0 || respuestasCorrectas > 7)
      throw new Error("Cantidad de respuestas correctas inválida");
  }

  /* getters … */
  fueAprobado(): boolean {
    return this.respuestasCorrectas >= 4; // mínimo 4/7
  }

  getIdQuiz(): number {
    return this.idQuiz;
  }
  getIdUsuario(): number {
    return this.idUsuario;
  }
  getRespuestasCorrectas(): number {
    return this.respuestasCorrectas;
  }
  getFecha(): Date {
    return this.fecha;
  }
}
