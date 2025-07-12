"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizCompletadoEvent = void 0;
class QuizCompletadoEvent {
    constructor(quizId, usuarioId, puntaje, aprobado) {
        this.quizId = quizId;
        this.usuarioId = usuarioId;
        this.puntaje = puntaje;
        this.aprobado = aprobado;
        this.eventType = 'QuizCompletado';
        this.occurredOn = new Date();
    }
}
exports.QuizCompletadoEvent = QuizCompletadoEvent;
