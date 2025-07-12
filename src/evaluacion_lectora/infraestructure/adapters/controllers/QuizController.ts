import { Request, Response } from 'express';
import { EvaluacionLectoraApplicationService } from '../../../application/services/EvaluacionLectoraApplicationService';

export class QuizController {
  constructor(
    private readonly applicationService: EvaluacionLectoraApplicationService
  ) {}

  async generarQuiz(req: Request, res: Response): Promise<void> {
    try {
      const idUsuario = req.user?.id;
      const { idLibro, paginaActual, s3Path } = req.body;

      if (!idUsuario || !idLibro || !paginaActual || !s3Path) {
        res.status(400).json({ error: 'Faltan parámetros obligatorios' });
        return;
      }

      const resultado = await this.applicationService.generarQuiz(
        Number(idUsuario),
        idLibro,
        paginaActual,
        s3Path
      );

      res.status(201).json(resultado);
    } catch (err: any) {
      console.error('Error al generar quiz:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async obtenerQuiz(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const quiz = await this.applicationService.obtenerQuiz(id);
      res.status(200).json(quiz);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async responderQuiz(req: Request, res: Response): Promise<void> {
    try {
      const idQuiz = Number(req.params.id);
      const idUsuario = req.user?.id;
      const respuestas = req.body.respuestas;

      if (!idUsuario || !respuestas || !Array.isArray(respuestas)) {
        res.status(400).json({ error: 'Datos incompletos' });
        return;
      }

      const resultado = await this.applicationService.responderQuiz(
        idQuiz,
        Number(idUsuario),
        respuestas
      );

      res.status(200).json(resultado);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
