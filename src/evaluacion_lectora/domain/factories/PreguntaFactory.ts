import { Pregunta } from '../entities/Pregunta';
import { Respuesta } from '../entities/Respuesta';

export class PreguntaFactory {
  static crear(texto: string, respuestas: Respuesta[], idQuiz: number): Pregunta {
  return new Pregunta(texto, respuestas, idQuiz);
}

static reconstruir(id: number, texto: string, respuestas: Respuesta[], idQuiz: number): Pregunta {
  return new Pregunta(texto, respuestas, idQuiz, id);
}

}
