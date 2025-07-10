"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuizController_1 = require("../controllers/QuizController");
const jwtMiddleware_1 = require("../../http/middleware/jwtMiddleware");
const GenerarQuizPorProgreso_1 = require("../../../application/usecases/GenerarQuizPorProgreso");
const ObtenerQuiz_1 = require("../../../application/usecases/ObtenerQuiz");
const ResponderQuiz_1 = require("../../../application/usecases/ResponderQuiz");
const QuizPrismaRepository_1 = require("../../repositories/QuizPrismaRepository");
const IntentoQuizPrismaRepository_1 = require("../../repositories/IntentoQuizPrismaRepository");
const PreguntaPrismaRepository_1 = require("../../repositories/PreguntaPrismaRepository");
const GeneradorQuizService_1 = require("../../../domain/services/GeneradorQuizService");
const router = (0, express_1.Router)();
// Instanciar dependencias
const quizRepo = new QuizPrismaRepository_1.QuizPrismaRepository();
const intentoRepo = new IntentoQuizPrismaRepository_1.IntentoQuizPrismaRepository();
const preguntaRepo = new PreguntaPrismaRepository_1.PreguntaPrismaRepository();
const generadorService = new GeneradorQuizService_1.GeneradorQuizService();
// Casos de uso
const generarQuizUseCase = new GenerarQuizPorProgreso_1.GenerarQuizPorProgreso(quizRepo, generadorService);
const obtenerQuizUseCase = new ObtenerQuiz_1.ObtenerQuiz(quizRepo);
const responderQuizUseCase = new ResponderQuiz_1.ResponderQuiz(quizRepo, intentoRepo);
// Controlador
const quizController = new QuizController_1.QuizController(generarQuizUseCase, obtenerQuizUseCase, responderQuizUseCase);
// Rutas protegidas
router.post('/quizzes', jwtMiddleware_1.jwtMiddleware, (req, res) => quizController.generarQuiz(req, res));
router.get('/quizzes/:id', jwtMiddleware_1.jwtMiddleware, (req, res) => quizController.obtenerQuiz(req, res));
router.post('/quizzes/:id/responder', jwtMiddleware_1.jwtMiddleware, (req, res) => quizController.responderQuiz(req, res));
exports.default = router;
