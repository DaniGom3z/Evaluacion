// QuizRepository.ts
import { Quiz } from '../../entities/Quiz';
import { Pregunta } from '../../entities/Pregunta';

export interface QuizRepository {
  crearConPreguntas(quiz: Quiz): Promise<Quiz>;      
  encontrarPorId(id: number): Promise<Quiz | null>;
  actualizarPreguntas(idQuiz: number, preguntas: Pregunta[]): Promise<void>;
}

