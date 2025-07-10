"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pregunta = void 0;
class Pregunta {
    constructor(texto, respuestas, idQuiz, id = null) {
        this.texto = texto;
        this.respuestas = respuestas;
        this.idQuiz = idQuiz;
        this.id = id;
        if (respuestas.length < 2)
            throw new Error('Debe haber al menos 2 respuestas');
        if (respuestas.filter(r => r.esCorrecta).length !== 1)
            throw new Error('Debe existir exactamente 1 respuesta correcta');
    }
    getId() { return this.id; }
    getTexto() { return this.texto; }
    getRespuestas() { return this.respuestas; }
    getIdQuiz() { return this.idQuiz; }
}
exports.Pregunta = Pregunta;
