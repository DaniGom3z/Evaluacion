// application/usecases/ObtenerQuiz.ts
import { QuizRepository } from '../../domain/repositories/interfaces/QuizRepository';
import { Quiz } from '../../domain/entities/Quiz';

export class ObtenerQuiz {
  constructor(private readonly quizRepo: QuizRepository) {}

  async execute(idQuiz: number): Promise<Quiz> {
    const quiz = await this.quizRepo.encontrarPorId(idQuiz);
    if (!quiz) throw new Error('Quiz no encontrado');
    return quiz;
  }
}
