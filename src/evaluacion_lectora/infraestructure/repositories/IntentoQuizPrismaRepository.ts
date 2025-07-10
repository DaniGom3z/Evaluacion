// infrastructure/repositories/IntentoQuizPrismaRepository.ts
import { IntentoQuizRepository } from '../../domain/repositories/interfaces/IntentoQuizRepository';
import { IntentoQuiz } from '../../domain/entities/IntentoQuiz';
import  prisma  from '../prisma/prismaClient';

export class IntentoQuizPrismaRepository implements IntentoQuizRepository {
  async guardarIntento(intento: IntentoQuiz): Promise<void> {
    await prisma.intentoQuiz.create({
      data: {
        idQuiz: intento.getIdQuiz(),
        idUsuario: intento.getIdUsuario(),
        puntajeObtenido: intento.getRespuestasCorrectas(),
        aprobado: intento.fueAprobado(),
        fechaIntento: intento.getFecha()
      }
    });
  }

  async obtenerIntentosUsuario(idUsuario: number, idQuiz: number): Promise<IntentoQuiz[]> {
    const resultados = await prisma.intentoQuiz.findMany({
      where: {
        idUsuario,
        idQuiz
      }
    });

    return resultados.map(i =>
      new IntentoQuiz(i.idQuiz, i.idUsuario, i.puntajeObtenido, i.id, i.fechaIntento)
    );
  }
}
