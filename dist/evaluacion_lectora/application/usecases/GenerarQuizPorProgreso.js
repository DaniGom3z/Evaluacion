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
const QuizFactory_1 = require("../../domain/factories/QuizFactory");
const QuizGeneradoEvent_1 = require("../../domain/events/QuizGeneradoEvent");
const LibroId_1 = require("../../domain/value-objects/LibroId");
const UsuarioId_1 = require("../../domain/value-objects/UsuarioId");
const Pagina_1 = require("../../domain/value-objects/Pagina");
class GenerarQuizPorProgreso {
    constructor(quizRepo, generadorService, eventBus) {
        this.quizRepo = quizRepo;
        this.generadorService = generadorService;
        this.eventBus = eventBus;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario, idLibro, paginaActual, contenidoHTML } = input;
            const libroId = LibroId_1.LibroId.create(idLibro);
            const usuarioId = UsuarioId_1.UsuarioId.create(idUsuario);
            const pagina = Pagina_1.Pagina.create(paginaActual);
            // Validar que la página permita generar quiz
            if (!pagina.esMultiploDe(GenerarQuizPorProgreso.PAGINAS_POR_QUIZ)) {
                throw new Error('La página actual no dispara generación de quiz');
            }
            // Crear entidad Quiz vacía
            const quizVacio = QuizFactory_1.QuizFactory.crearNuevo(libroId, usuarioId, pagina, []);
            // Persistir quiz vacío
            const quizGuardado = yield this.quizRepo.crearConPreguntas(quizVacio);
            const quizId = quizGuardado.getId();
            // Generar preguntas con IA
            const preguntas = yield this.generadorService.generarPreguntas(contenidoHTML, quizId.getValue());
            // Actualizar el quiz con las preguntas generadas
            yield this.quizRepo.actualizarPreguntas(quizId.getValue(), preguntas);
            // Publicar domain event
            const event = new QuizGeneradoEvent_1.QuizGeneradoEvent(quizId, libroId, usuarioId, pagina);
            yield this.eventBus.publish(event);
            return {
                quizId: quizId.getValue(),
                mensaje: 'Quiz generado exitosamente'
            };
        });
    }
}
exports.GenerarQuizPorProgreso = GenerarQuizPorProgreso;
GenerarQuizPorProgreso.PAGINAS_POR_QUIZ = 10;
