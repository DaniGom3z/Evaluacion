export class LibroId {
  private constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('Libro ID debe ser un número positivo');
    }
  }

  static create(value: number): LibroId {
    return new LibroId(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: LibroId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 