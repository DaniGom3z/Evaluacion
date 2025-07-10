"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreguntaFactory = void 0;
const Pregunta_1 = require("../entities/Pregunta");
class PreguntaFactory {
    static crear(texto, respuestas, idQuiz) {
        return new Pregunta_1.Pregunta(texto, respuestas, idQuiz);
    }
    static reconstruir(id, texto, respuestas, idQuiz) {
        return new Pregunta_1.Pregunta(texto, respuestas, idQuiz, id);
    }
}
exports.PreguntaFactory = PreguntaFactory;
