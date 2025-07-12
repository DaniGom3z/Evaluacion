"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizFactory = void 0;
const Quiz_1 = require("../entities/Quiz");
class QuizFactory {
    /**
     * Crea un quiz nuevo (sin ID, se asignará al persistir)
     */
    static crearNuevo(libroId, usuarioId, pagina, preguntas = []) {
        return Quiz_1.Quiz.crearNuevo(libroId, usuarioId, pagina, preguntas);
    }
    /**
     * Reconstruye un quiz ya existente (cargado de la BD)
     */
    static reconstruir(id, idLibro, idUsuario, pagina, fecha, preguntas) {
        return Quiz_1.Quiz.reconstruir(id, idLibro, idUsuario, pagina, fecha, preguntas);
    }
}
exports.QuizFactory = QuizFactory;
