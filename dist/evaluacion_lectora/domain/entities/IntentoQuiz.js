"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentoQuiz = void 0;
class IntentoQuiz {
    constructor(idQuiz, idUsuario, respuestasCorrectas, id = null, fecha = new Date()) {
        this.idQuiz = idQuiz;
        this.idUsuario = idUsuario;
        this.respuestasCorrectas = respuestasCorrectas;
        this.id = id;
        this.fecha = fecha;
        if (respuestasCorrectas < 0 || respuestasCorrectas > 7)
            throw new Error("Cantidad de respuestas correctas inválida");
    }
    /* getters … */
    fueAprobado() {
        return this.respuestasCorrectas >= 4; // mínimo 4/7
    }
    getIdQuiz() {
        return this.idQuiz;
    }
    getIdUsuario() {
        return this.idUsuario;
    }
    getRespuestasCorrectas() {
        return this.respuestasCorrectas;
    }
    getFecha() {
        return this.fecha;
    }
}
exports.IntentoQuiz = IntentoQuiz;
