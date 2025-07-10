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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreguntaPrismaRepository = void 0;
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
class PreguntaPrismaRepository {
    crearMuchas(preguntas) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const pregunta of preguntas) {
                yield prismaClient_1.default.pregunta.create({
                    data: {
                        idQuiz: pregunta.getIdQuiz(),
                        textoPregunta: pregunta.getTexto(),
                        respuestas: {
                            create: pregunta.getRespuestas().map(r => ({
                                textoRespuesta: r.getTexto(),
                                esCorrecta: r.esCorrecta,
                            }))
                        }
                    }
                });
            }
        });
    }
}
exports.PreguntaPrismaRepository = PreguntaPrismaRepository;
