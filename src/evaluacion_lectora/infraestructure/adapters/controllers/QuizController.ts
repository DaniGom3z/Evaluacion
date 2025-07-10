import { Request, Response } from 'express';
import { GenerarQuizPorProgreso } from '../../../application/usecases/GenerarQuizPorProgreso';
import { ObtenerQuiz } from '../../../application/usecases/ObtenerQuiz';
import { ResponderQuiz } from '../../../application/usecases/ResponderQuiz';
import { LibroGateway } from '../../http/gateways/LibroGateway';

export class QuizController {
  constructor(
    private readonly generarQuizUseCase: GenerarQuizPorProgreso,
    private readonly obtenerQuizUseCase: ObtenerQuiz,
    private readonly responderQuizUseCase: ResponderQuiz
  ) {}

   async generarQuiz(req: Request, res: Response): Promise<void> {
    try {
      const idUsuario = req.user?.id;
      const { idLibro, paginaActual, s3Path } = req.body;

      if (!idUsuario || !idLibro || !paginaActual || !s3Path) {
        res.status(400).json({ error: 'Faltan parámetros obligatorios' });
        return;
      }

      const libroGateway = new LibroGateway();
const [contenidoHTML] = await libroGateway.obtenerFragmentosHTMLDesdeS3(s3Path, paginaActual, paginaActual);

      const quizId = await this.generarQuizUseCase.execute({
        idUsuario: Number(idUsuario),
        idLibro,
        paginaActual,
        contenidoHTML
      });

      res.status(201).json({ quizId });
    } catch (err: any) {
      console.error('Error al generar quiz:', err);
      res.status(400).json({ error: err.message });
    }
  }


  // GET /quizzes/:id
  async obtenerQuiz(req: Request, res: Response): Promise<void> {
    // sin cambios
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const quiz = await this.obtenerQuizUseCase.execute(id);
      res.status(200).json(quiz);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  // POST /quizzes/:id/responder
  async responderQuiz(req: Request, res: Response): Promise<void> {
    // sin cambios
    try {
      const idQuiz = Number(req.params.id);
      const idUsuario = req.user?.id;
      const respuestas = req.body.respuestas;

      if (!idUsuario || !respuestas || !Array.isArray(respuestas)) {
        res.status(400).json({ error: 'Datos incompletos' });
        return;
      }

      const resultado = await this.responderQuizUseCase.execute({
        idQuiz,
        idUsuario: Number(idUsuario),
        respuestas
      });

      res.status(200).json(resultado);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
