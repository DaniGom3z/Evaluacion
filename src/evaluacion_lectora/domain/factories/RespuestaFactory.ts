import { Respuesta } from '../entities/Respuesta';

export class RespuestaFactory {
  static crear(texto: string, esCorrecta: boolean): Respuesta {
    return new Respuesta(texto, esCorrecta);
  }

  static reconstruir(id: number, texto: string, esCorrecta: boolean): Respuesta {
    return new Respuesta(texto, esCorrecta, id);
  }
}
