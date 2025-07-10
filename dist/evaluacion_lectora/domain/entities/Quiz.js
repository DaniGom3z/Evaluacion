"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
class Quiz {
    constructor(idLibro, idUsuario, pagina, preguntas, id = null, fechaCreacion = new Date()) {
        this.idLibro = idLibro;
        this.idUsuario = idUsuario;
        this.pagina = pagina;
        this.preguntas = preguntas;
        this.id = id;
        this.fechaCreacion = fechaCreacion;
        if (preguntas.length !== 0 && preguntas.length !== 7) {
            throw new Error('Un quiz debe tener exactamente 7 preguntas o estar vacío');
        }
    }
    /* getters … */
    getId() { return this.id; }
    getLibroId() { return this.idLibro; }
    getUsuarioId() { return this.idUsuario; }
    getPagina() { return this.pagina; }
    getPreguntas() { return this.preguntas; }
    getFechaCreacion() { return this.fechaCreacion; }
}
exports.Quiz = Quiz;
