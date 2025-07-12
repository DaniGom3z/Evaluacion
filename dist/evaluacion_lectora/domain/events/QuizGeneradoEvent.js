"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizGeneradoEvent = void 0;
class QuizGeneradoEvent {
    constructor(quizId, libroId, usuarioId, pagina) {
        this.quizId = quizId;
        this.libroId = libroId;
        this.usuarioId = usuarioId;
        this.pagina = pagina;
        this.eventType = 'QuizGenerado';
        this.occurredOn = new Date();
    }
}
exports.QuizGeneradoEvent = QuizGeneradoEvent;
