export class Pagina {
  private constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('El número de página debe ser positivo');
    }
  }

  static create(value: number): Pagina {
    return new Pagina(value);
  }

  getValue(): number {
    return this.value;
  }

  esMultiploDe(multiplo: number): boolean {
    return this.value % multiplo === 0;
  }

  equals(other: Pagina): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 