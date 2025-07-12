import { Router } from 'express';
import { QuizController } from '../controllers/QuizController';
import { jwtMiddleware } from '../../http/middleware/jwtMiddleware';
import { DependencyContainer } from '../../container/DependencyContainer';
import { EvaluacionLectoraApplicationService } from '../../../application/services/EvaluacionLectoraApplicationService';

const router = Router();

// Obtener dependencias del container
const container = DependencyContainer.getInstance();
const applicationService = container.get<EvaluacionLectoraApplicationService>('EvaluacionLectoraApplicationService');

// Controlador
const quizController = new QuizController(applicationService);

// Rutas protegidas
router.post('/quizzes', jwtMiddleware, (req, res) => quizController.generarQuiz(req, res));
router.get('/quizzes/:id', jwtMiddleware, (req, res) => quizController.obtenerQuiz(req, res));
router.post('/quizzes/:id/responder', jwtMiddleware, (req, res) => quizController.responderQuiz(req, res));

export default router;
