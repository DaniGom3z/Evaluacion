"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponderQuiz = void 0;
const IntentoQuiz_1 = require("../../domain/entities/IntentoQuiz");
class ResponderQuiz {
    constructor(quizRepo, intentoRepo) {
        this.quizRepo = quizRepo;
        this.intentoRepo = intentoRepo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario, idQuiz, respuestas } = input;
            // 1️⃣ Obtener quiz completo
            const quiz = yield this.quizRepo.encontrarPorId(idQuiz);
            if (!quiz)
                throw new Error('Quiz no encontrado');
            // 2️⃣ Calcular puntaje
            let puntaje = 0;
            for (const respuestaUsuario of respuestas) {
                const pregunta = quiz
                    .getPreguntas()
                    .find(p => p.getId() === respuestaUsuario.idPregunta);
                if (!pregunta)
                    continue;
                const respuesta = pregunta
                    .getRespuestas()
                    .find(r => r.getId() === respuestaUsuario.idRespuestaSeleccionada);
                if (respuesta === null || respuesta === void 0 ? void 0 : respuesta.esLaCorrecta())
                    puntaje++;
            }
            const aprobado = puntaje >= ResponderQuiz.MIN_APROBADO;
            // 3️⃣ Crear entidad IntentoQuiz y guardar
            const intento = new IntentoQuiz_1.IntentoQuiz(idQuiz, idUsuario, puntaje);
            yield this.intentoRepo.guardarIntento(intento);
            return { puntaje, aprobado };
        });
    }
}
exports.ResponderQuiz = ResponderQuiz;
ResponderQuiz.MIN_APROBADO = 4;
