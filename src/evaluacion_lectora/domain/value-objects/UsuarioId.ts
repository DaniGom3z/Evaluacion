export class UsuarioId {
  private constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('Usuario ID debe ser un número positivo');
    }
  }

  static create(value: number): UsuarioId {
    return new UsuarioId(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: UsuarioId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 