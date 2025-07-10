
// IntentoQuizRepository.ts
import { IntentoQuiz } from '../../entities/IntentoQuiz';
export interface IntentoQuizRepository {
  guardarIntento(intento: IntentoQuiz): Promise<void>;
  obtenerIntentosUsuario(idUsuario: number, idQuiz: number): Promise<IntentoQuiz[]>;
}
