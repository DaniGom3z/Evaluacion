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
exports.GenerarQuizPorProgreso = void 0;
// application/usecases/GenerarQuizPorProgreso.ts
const QuizFactory_1 = require("../../domain/factories/QuizFactory");
class GenerarQuizPorProgreso {
    constructor(quizRepo, generadorService) {
        this.quizRepo = quizRepo;
        this.generadorService = generadorService;
    }
    /** Devuelve el id del quiz generado */
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario, idLibro, paginaActual, contenidoHTML } = input;
            // 1️⃣ Solo permitimos cuando es múltiplo de 15
            if (paginaActual % GenerarQuizPorProgreso.PAGINAS_POR_QUIZ !== 0) {
                throw new Error('La página actual no dispara generación de quiz');
            }
            // 2️⃣ TODO: comprobar si ya existe un quiz para este (libro, usuario, página)
            //    -> cuando agregues método en el repositorio, llámalo aquí.
            // 3️⃣ Crear entidad Quiz vacía
            const quizVacio = QuizFactory_1.QuizFactory.crearNuevo(idLibro, idUsuario, paginaActual, [] // sin preguntas
            );
            // 4️⃣ Persistir quiz vacío
            const quizGuardado = yield this.quizRepo.crearConPreguntas(quizVacio);
            const idQuiz = quizGuardado.getId();
            // 5️⃣ Generar 7 preguntas con IA usando el idQuiz
            const preguntas = yield this.generadorService.generarPreguntas(contenidoHTML, idQuiz);
            // 6️⃣ Actualizar el quiz con las preguntas generadas
            yield this.quizRepo.actualizarPreguntas(idQuiz, preguntas);
            // 7️⃣ Devolver id
            return idQuiz;
        });
    }
}
exports.GenerarQuizPorProgreso = GenerarQuizPorProgreso;
// Cada 15 páginas se genera un quiz
GenerarQuizPorProgreso.PAGINAS_POR_QUIZ = 10;
