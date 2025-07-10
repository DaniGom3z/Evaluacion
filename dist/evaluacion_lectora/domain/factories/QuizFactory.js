"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizFactory = void 0;
const Quiz_1 = require("../entities/Quiz");
class QuizFactory {
    /**
     * Crea un quiz nuevo (sin ID, se asignará al persistir)
     */
    static crearNuevo(idLibro, idUsuario, pagina, preguntas) {
        return new Quiz_1.Quiz(idLibro, idUsuario, pagina, preguntas);
    }
    /**
     * Reconstruye un quiz ya existente (cargado de la BD)
     */
    static reconstruir(id, idLibro, idUsuario, pagina, fecha, preguntas) {
        return new Quiz_1.Quiz(idLibro, idUsuario, pagina, preguntas, id, fecha);
    }
}
exports.QuizFactory = QuizFactory;
