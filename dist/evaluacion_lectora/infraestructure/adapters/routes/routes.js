"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuizController_1 = require("../controllers/QuizController");
const jwtMiddleware_1 = require("../../http/middleware/jwtMiddleware");
const DependencyContainer_1 = require("../../container/DependencyContainer");
const router = (0, express_1.Router)();
// Obtener dependencias del container
const container = DependencyContainer_1.DependencyContainer.getInstance();
const applicationService = container.get('EvaluacionLectoraApplicationService');
// Controlador
const quizController = new QuizController_1.QuizController(applicationService);
// Rutas protegidas
router.post('/quizzes', jwtMiddleware_1.jwtMiddleware, (req, res) => quizController.generarQuiz(req, res));
router.get('/quizzes/:id', jwtMiddleware_1.jwtMiddleware, (req, res) => quizController.obtenerQuiz(req, res));
router.post('/quizzes/:id/responder', jwtMiddleware_1.jwtMiddleware, (req, res) => quizController.responderQuiz(req, res));
exports.default = router;
