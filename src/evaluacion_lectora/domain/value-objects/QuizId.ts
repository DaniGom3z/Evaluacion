export class QuizId {
  private constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('Quiz ID debe ser un número positivo');
    }
  }

  static create(value: number): QuizId {
    return new QuizId(value);
  }

  static createNullable(value: number | null): QuizId | null {
    return value ? new QuizId(value) : null;
  }

  getValue(): number {
    return this.value;
  }

  equals(other: QuizId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 