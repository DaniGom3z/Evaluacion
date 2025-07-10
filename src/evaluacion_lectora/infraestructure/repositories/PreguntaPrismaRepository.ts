import { PreguntaRepository } from '../../domain/repositories/interfaces/PreguntaRepository';
import { Pregunta } from '../../domain/entities/Pregunta';
import prisma from '../prisma/prismaClient';

export class PreguntaPrismaRepository implements PreguntaRepository {
  async crearMuchas(preguntas: Pregunta[]): Promise<void> {
    for (const pregunta of preguntas) {
      await prisma.pregunta.create({
        data: {
          idQuiz: pregunta.getIdQuiz(),
          textoPregunta: pregunta.getTexto(),
          respuestas: {
            create: pregunta.getRespuestas().map(r => ({
              textoRespuesta: r.getTexto(),
              esCorrecta: r.esCorrecta,
            }))
          }
        }
      });
    }
  }
}
