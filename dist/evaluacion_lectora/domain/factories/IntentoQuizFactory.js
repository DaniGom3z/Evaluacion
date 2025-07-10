"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentoQuizFactory = void 0;
const IntentoQuiz_1 = require("../entities/IntentoQuiz");
class IntentoQuizFactory {
    static crearNuevo(idQuiz, idUsuario, respuestasCorrectas) {
        return new IntentoQuiz_1.IntentoQuiz(idQuiz, idUsuario, respuestasCorrectas);
    }
    static reconstruir(id, idQuiz, idUsuario, respuestasCorrectas, fecha) {
        return new IntentoQuiz_1.IntentoQuiz(idQuiz, idUsuario, respuestasCorrectas, id, fecha);
    }
}
exports.IntentoQuizFactory = IntentoQuizFactory;
