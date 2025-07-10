// infrastructure/repositories/QuizPrismaRepository.ts
import { QuizRepository } from '../../domain/repositories/interfaces/QuizRepository';
import { Quiz } from '../../domain/entities/Quiz';
import { PreguntaFactory } from '../../domain/factories/PreguntaFactory';
import { RespuestaFactory } from '../../domain/factories/RespuestaFactory';
import { QuizFactory } from '../../domain/factories/QuizFactory';
import prisma from '../prisma/prismaClient';

export class QuizPrismaRepository implements QuizRepository {
  async crearConPreguntas(quiz: Quiz): Promise<Quiz> {
    const paginaInicio = quiz.getPagina() - 9;

    const created = await prisma.quiz.create({
      data: {
        idLibro: quiz.getLibroId(),
        idUsuario: quiz.getUsuarioId(),
        pagina: quiz.getPagina(),
        paginaInicio,
        paginaFin: quiz.getPagina(),
        preguntas: {
          create: quiz.getPreguntas().map(p => ({
            textoPregunta: p.getTexto(),
            respuestas: {
              create: p.getRespuestas().map(r => ({
                textoRespuesta: r.getTexto(),
                esCorrecta: r.esLaCorrecta()
              }))
            }
          }))
        }
      },
      include: {
        preguntas: {
          include: { respuestas: true }
        }
      }
    });

    const preguntas = created.preguntas.map(p => {
      const respuestas = p.respuestas.map(r =>
        RespuestaFactory.reconstruir(r.id, r.textoRespuesta, r.esCorrecta)
      );
      return PreguntaFactory.reconstruir(p.id, p.textoPregunta, respuestas, p.idQuiz);
    });

    return QuizFactory.reconstruir(
      created.id,
      created.idLibro,
      created.idUsuario,
      created.pagina,
      created.fechaCreacion,
      preguntas
    );
  }

  async encontrarPorId(id: number): Promise<Quiz | null> {
    const found = await prisma.quiz.findUnique({
      where: { id },
      include: {
        preguntas: {
          include: { respuestas: true }
        }
      }
    });

    if (!found) return null;

    const preguntas = found.preguntas.map(p => {
      const respuestas = p.respuestas.map(r =>
        RespuestaFactory.reconstruir(r.id, r.textoRespuesta, r.esCorrecta)
      );
      return PreguntaFactory.reconstruir(p.id, p.textoPregunta, respuestas, found.id);
    });

    return QuizFactory.reconstruir(
      found.id,
      found.idLibro,
      found.idUsuario,
      found.pagina,
      found.fechaCreacion,
      preguntas
    );
  }

  async actualizarPreguntas(idQuiz: number, preguntas: any[]): Promise<void> {
    // Eliminar preguntas y respuestas existentes
    await prisma.pregunta.deleteMany({ where: { idQuiz } });

    // Crear nuevas preguntas y respuestas
    for (const pregunta of preguntas) {
      await prisma.pregunta.create({
        data: {
          idQuiz,
          textoPregunta: pregunta.getTexto(),
          respuestas: {
            create: pregunta.getRespuestas().map((r: any) => ({
              textoRespuesta: r.getTexto(),
              esCorrecta: r.esLaCorrecta(),
            })),
          },
        },
      });
    }
  }
}
