// PreguntaRepository.ts
import { Pregunta } from '../../entities/Pregunta';
export interface PreguntaRepository {
  crearMuchas(preguntas: Pregunta[]): Promise<void>;
}
