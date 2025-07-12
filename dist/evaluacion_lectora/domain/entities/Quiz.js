"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const QuizId_1 = require("../value-objects/QuizId");
const LibroId_1 = require("../value-objects/LibroId");
const UsuarioId_1 = require("../value-objects/UsuarioId");
const Pagina_1 = require("../value-objects/Pagina");
class Quiz {
    constructor(id, libroId, usuarioId, pagina, preguntas, fechaCreacion) {
        this.id = id;
        this.libroId = libroId;
        this.usuarioId = usuarioId;
        this.pagina = pagina;
        this.preguntas = preguntas;
        this.fechaCreacion = fechaCreacion;
        this.validarPreguntas(preguntas);
    }
    validarPreguntas(preguntas) {
        if (preguntas.length !== 0 && preguntas.length !== 7) {
            throw new Error('Un quiz debe tener exactamente 7 preguntas o estar vacío');
        }
    }
    // Factory methods
    static crearNuevo(libroId, usuarioId, pagina, preguntas = []) {
        return new Quiz(null, libroId, usuarioId, pagina, preguntas, new Date());
    }
    static reconstruir(id, libroId, usuarioId, pagina, fechaCreacion, preguntas) {
        return new Quiz(QuizId_1.QuizId.create(id), LibroId_1.LibroId.create(libroId), UsuarioId_1.UsuarioId.create(usuarioId), Pagina_1.Pagina.create(pagina), preguntas, fechaCreacion);
    }
    // Business methods
    agregarPreguntas(nuevasPreguntas) {
        const preguntasCombinadas = [...this.preguntas, ...nuevasPreguntas];
        return new Quiz(this.id, this.libroId, this.usuarioId, this.pagina, preguntasCombinadas, this.fechaCreacion);
    }
    estaCompleto() {
        return this.preguntas.length === 7;
    }
    // Getters
    getId() { return this.id; }
    getLibroId() { return this.libroId; }
    getUsuarioId() { return this.usuarioId; }
    getPagina() { return this.pagina; }
    getPreguntas() { return [...this.preguntas]; } // Return copy to prevent mutation
    getFechaCreacion() { return this.fechaCreacion; }
}
exports.Quiz = Quiz;
