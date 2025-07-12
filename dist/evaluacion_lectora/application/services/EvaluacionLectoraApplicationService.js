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
exports.EvaluacionLectoraApplicationService = void 0;
const GenerarQuizPorProgreso_1 = require("../usecases/GenerarQuizPorProgreso");
const ObtenerQuiz_1 = require("../usecases/ObtenerQuiz");
const ResponderQuiz_1 = require("../usecases/ResponderQuiz");
const LibroGateway_1 = require("../../infraestructure/http/gateways/LibroGateway");
class EvaluacionLectoraApplicationService {
    constructor(quizRepository, intentoQuizRepository, generadorService, eventBus) {
        this.generarQuizUseCase = new GenerarQuizPorProgreso_1.GenerarQuizPorProgreso(quizRepository, generadorService, eventBus);
        this.obtenerQuizUseCase = new ObtenerQuiz_1.ObtenerQuiz(quizRepository);
        this.responderQuizUseCase = new ResponderQuiz_1.ResponderQuiz(quizRepository, intentoQuizRepository, eventBus);
        this.libroGateway = new LibroGateway_1.LibroGateway();
    }
    generarQuiz(idUsuario, idLibro, paginaActual, s3Path) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtener contenido HTML desde S3
            const [contenidoHTML] = yield this.libroGateway.obtenerFragmentosHTMLDesdeS3(s3Path, paginaActual, paginaActual);
            return yield this.generarQuizUseCase.execute({
                idUsuario,
                idLibro,
                paginaActual,
                contenidoHTML
            });
        });
    }
    obtenerQuiz(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.obtenerQuizUseCase.execute(id);
        });
    }
    responderQuiz(idQuiz, idUsuario, respuestas) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.responderQuizUseCase.execute({
                idQuiz,
                idUsuario,
                respuestas
            });
        });
    }
}
exports.EvaluacionLectoraApplicationService = EvaluacionLectoraApplicationService;
