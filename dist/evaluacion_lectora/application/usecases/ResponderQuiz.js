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
exports.ResponderQuiz = void 0;
const IntentoQuiz_1 = require("../../domain/entities/IntentoQuiz");
const QuizCompletadoEvent_1 = require("../../domain/events/QuizCompletadoEvent");
const QuizId_1 = require("../../domain/value-objects/QuizId");
const UsuarioId_1 = require("../../domain/value-objects/UsuarioId");
class ResponderQuiz {
    constructor(quizRepo, intentoRepo, eventBus) {
        this.quizRepo = quizRepo;
        this.intentoRepo = intentoRepo;
        this.eventBus = eventBus;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario, idQuiz, respuestas } = input;
            const quizId = QuizId_1.QuizId.create(idQuiz);
            const usuarioId = UsuarioId_1.UsuarioId.create(idUsuario);
            // Obtener quiz completo
            const quiz = yield this.quizRepo.encontrarPorId(quizId.getValue());
            if (!quiz)
                throw new Error('Quiz no encontrado');
            // Calcular puntaje
            let puntaje = 0;
            for (const respuestaUsuario of respuestas) {
                const pregunta = quiz
                    .getPreguntas()
                    .find(p => p.getId() === respuestaUsuario.idPregunta);
                if (!pregunta)
                    continue;
                const respuesta = pregunta
                    .getRespuestas()
                    .find(r => r.getId() === respuestaUsuario.idRespuestaSeleccionada);
                if (respuesta === null || respuesta === void 0 ? void 0 : respuesta.esLaCorrecta())
                    puntaje++;
            }
            const aprobado = puntaje >= ResponderQuiz.MIN_APROBADO;
            // Crear entidad IntentoQuiz y guardar
            const intento = new IntentoQuiz_1.IntentoQuiz(idQuiz, idUsuario, puntaje);
            yield this.intentoRepo.guardarIntento(intento);
            // Publicar domain event
            const event = new QuizCompletadoEvent_1.QuizCompletadoEvent(quizId, usuarioId, puntaje, aprobado);
            yield this.eventBus.publish(event);
            return {
                puntaje,
                aprobado,
                mensaje: aprobado ? '¡Felicitaciones! Has aprobado el quiz.' : 'Necesitas más práctica. ¡Sigue intentando!'
            };
        });
    }
}
exports.ResponderQuiz = ResponderQuiz;
ResponderQuiz.MIN_APROBADO = 4;
