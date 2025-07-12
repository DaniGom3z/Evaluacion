"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluacionLectora = void 0;
const LibroId_1 = require("../value-objects/LibroId");
const UsuarioId_1 = require("../value-objects/UsuarioId");
class EvaluacionLectora {
    constructor(libroId, usuarioId, quizzes, intentos) {
        this.libroId = libroId;
        this.usuarioId = usuarioId;
        this.quizzes = quizzes;
        this.intentos = intentos;
    }
    static crear(libroId, usuarioId) {
        return new EvaluacionLectora(libroId, usuarioId, [], []);
    }
    static reconstruir(libroId, usuarioId, quizzes, intentos) {
        return new EvaluacionLectora(LibroId_1.LibroId.create(libroId), UsuarioId_1.UsuarioId.create(usuarioId), quizzes, intentos);
    }
    // Business methods
    puedeGenerarQuizEnPagina(pagina) {
        return pagina.esMultiploDe(10) && !this.tieneQuizEnPagina(pagina);
    }
    tieneQuizEnPagina(pagina) {
        return this.quizzes.some(quiz => quiz.getPagina().equals(pagina));
    }
    agregarQuiz(quiz) {
        if (!quiz.getLibroId().equals(this.libroId) || !quiz.getUsuarioId().equals(this.usuarioId)) {
            throw new Error('El quiz no pertenece a esta evaluación lectora');
        }
        return new EvaluacionLectora(this.libroId, this.usuarioId, [...this.quizzes, quiz], this.intentos);
    }
    agregarIntento(intento) {
        if (intento.getIdUsuario() !== this.usuarioId.getValue()) {
            throw new Error('El intento no pertenece a este usuario');
        }
        return new EvaluacionLectora(this.libroId, this.usuarioId, this.quizzes, [...this.intentos, intento]);
    }
    obtenerProgreso() {
        const quizzesCompletados = this.quizzes.filter(quiz => quiz.estaCompleto()).length;
        return quizzesCompletados;
    }
    obtenerPromedioAprobacion() {
        if (this.intentos.length === 0)
            return 0;
        const intentosAprobados = this.intentos.filter(intento => intento.fueAprobado()).length;
        return (intentosAprobados / this.intentos.length) * 100;
    }
    // Getters
    getLibroId() { return this.libroId; }
    getUsuarioId() { return this.usuarioId; }
    getQuizzes() { return [...this.quizzes]; }
    getIntentos() { return [...this.intentos]; }
}
exports.EvaluacionLectora = EvaluacionLectora;
