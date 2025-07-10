import { Router } from 'express';
import { QuizController } from '../controllers/QuizController';
import { jwtMiddleware } from '../../http/middleware/jwtMiddleware';

import { GenerarQuizPorProgreso } from '../../../application/usecases/GenerarQuizPorProgreso';
import { ObtenerQuiz } from '../../../application/usecases/ObtenerQuiz';
import { ResponderQuiz } from '../../../application/usecases/ResponderQuiz';

import { QuizPrismaRepository } from '../../repositories/QuizPrismaRepository';
import { IntentoQuizPrismaRepository } from '../../repositories/IntentoQuizPrismaRepository';
import { PreguntaPrismaRepository } from '../../repositories/PreguntaPrismaRepository';

import { GeneradorQuizService } from '../../../domain/services/GeneradorQuizService';

const router = Router();

// Instanciar dependencias
const quizRepo = new QuizPrismaRepository();
const intentoRepo = new IntentoQuizPrismaRepository();
const preguntaRepo = new PreguntaPrismaRepository();
const generadorService = new GeneradorQuizService();

// Casos de uso
const generarQuizUseCase = new GenerarQuizPorProgreso(quizRepo, generadorService);
const obtenerQuizUseCase = new ObtenerQuiz(quizRepo);
const responderQuizUseCase = new ResponderQuiz(quizRepo, intentoRepo);

// Controlador
const quizController = new QuizController(
  generarQuizUseCase,
  obtenerQuizUseCase,
  responderQuizUseCase
);

// Rutas protegidas
router.post('/quizzes', jwtMiddleware, (req, res) => quizController.generarQuiz(req, res));
router.get('/quizzes/:id', jwtMiddleware, (req, res) => quizController.obtenerQuiz(req, res));
router.post('/quizzes/:id/responder', jwtMiddleware, (req, res) => quizController.responderQuiz(req, res));

export default router;
