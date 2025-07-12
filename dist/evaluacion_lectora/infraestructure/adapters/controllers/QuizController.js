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
class QuizController {
    constructor(applicationService) {
        this.applicationService = applicationService;
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
                const resultado = yield this.applicationService.generarQuiz(Number(idUsuario), idLibro, paginaActual, s3Path);
                res.status(201).json(resultado);
            }
            catch (err) {
                console.error('Error al generar quiz:', err);
                res.status(400).json({ error: err.message });
            }
        });
    }
    obtenerQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({ error: 'ID inválido' });
                    return;
                }
                const quiz = yield this.applicationService.obtenerQuiz(id);
                res.status(200).json(quiz);
            }
            catch (err) {
                res.status(404).json({ error: err.message });
            }
        });
    }
    responderQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const idQuiz = Number(req.params.id);
                const idUsuario = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const respuestas = req.body.respuestas;
                if (!idUsuario || !respuestas || !Array.isArray(respuestas)) {
                    res.status(400).json({ error: 'Datos incompletos' });
                    return;
                }
                const resultado = yield this.applicationService.responderQuiz(idQuiz, Number(idUsuario), respuestas);
                res.status(200).json(resultado);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.QuizController = QuizController;
