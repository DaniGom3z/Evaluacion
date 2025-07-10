"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const LibroGateway_1 = require("../../http/gateways/LibroGateway");
class QuizController {
    constructor(generarQuizUseCase, obtenerQuizUseCase, responderQuizUseCase) {
        this.generarQuizUseCase = generarQuizUseCase;
        this.obtenerQuizUseCase = obtenerQuizUseCase;
        this.responderQuizUseCase = responderQuizUseCase;
    }
    generarQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const idUsuario = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { idLibro, paginaActual, s3Path } = req.body;
                if (!idUsuario || !idLibro || !paginaActual || !s3Path) {
                    res.status(400).json({ error: 'Faltan parámetros obligatorios' });
                    return;
                }
                const libroGateway = new LibroGateway_1.LibroGateway();
                const [contenidoHTML] = yield libroGateway.obtenerFragmentosHTMLDesdeS3(s3Path, paginaActual, paginaActual);
                const quizId = yield this.generarQuizUseCase.execute({
                    idUsuario: Number(idUsuario),
                    idLibro,
                    paginaActual,
                    contenidoHTML
                });
                res.status(201).json({ quizId });
            }
            catch (err) {
                console.error('Error al generar quiz:', err);
                res.status(400).json({ error: err.message });
            }
        });
    }
    // GET /quizzes/:id
    obtenerQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // sin cambios
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({ error: 'ID inválido' });
                    return;
                }
                const quiz = yield this.obtenerQuizUseCase.execute(id);
                res.status(200).json(quiz);
            }
            catch (err) {
                res.status(404).json({ error: err.message });
            }
        });
    }
    // POST /quizzes/:id/responder
    responderQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // sin cambios
            try {
                const idQuiz = Number(req.params.id);
                const idUsuario = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const respuestas = req.body.respuestas;
                if (!idUsuario || !respuestas || !Array.isArray(respuestas)) {
                    res.status(400).json({ error: 'Datos incompletos' });
                    return;
                }
                const resultado = yield this.responderQuizUseCase.execute({
                    idQuiz,
                    idUsuario: Number(idUsuario),
                    respuestas
                });
                res.status(200).json(resultado);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.QuizController = QuizController;
