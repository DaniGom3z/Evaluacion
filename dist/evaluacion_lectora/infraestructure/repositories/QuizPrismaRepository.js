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
exports.QuizPrismaRepository = void 0;
const PreguntaFactory_1 = require("../../domain/factories/PreguntaFactory");
const RespuestaFactory_1 = require("../../domain/factories/RespuestaFactory");
const QuizFactory_1 = require("../../domain/factories/QuizFactory");
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
class QuizPrismaRepository {
    crearConPreguntas(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const paginaInicio = quiz.getPagina() - 9;
            const created = yield prismaClient_1.default.quiz.create({
                data: {
                    idLibro: quiz.getLibroId(),
                    idUsuario: quiz.getUsuarioId(),
                    pagina: quiz.getPagina(),
                    paginaInicio,
                    paginaFin: quiz.getPagina(),
                    preguntas: {
                        create: quiz.getPreguntas().map(p => ({
                            textoPregunta: p.getTexto(),
                            respuestas: {
                                create: p.getRespuestas().map(r => ({
                                    textoRespuesta: r.getTexto(),
                                    esCorrecta: r.esLaCorrecta()
                                }))
                            }
                        }))
                    }
                },
                include: {
                    preguntas: {
                        include: { respuestas: true }
                    }
                }
            });
            const preguntas = created.preguntas.map(p => {
                const respuestas = p.respuestas.map(r => RespuestaFactory_1.RespuestaFactory.reconstruir(r.id, r.textoRespuesta, r.esCorrecta));
                return PreguntaFactory_1.PreguntaFactory.reconstruir(p.id, p.textoPregunta, respuestas, p.idQuiz);
            });
            return QuizFactory_1.QuizFactory.reconstruir(created.id, created.idLibro, created.idUsuario, created.pagina, created.fechaCreacion, preguntas);
        });
    }
    encontrarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield prismaClient_1.default.quiz.findUnique({
                where: { id },
                include: {
                    preguntas: {
                        include: { respuestas: true }
                    }
                }
            });
            if (!found)
                return null;
            const preguntas = found.preguntas.map(p => {
                const respuestas = p.respuestas.map(r => RespuestaFactory_1.RespuestaFactory.reconstruir(r.id, r.textoRespuesta, r.esCorrecta));
                return PreguntaFactory_1.PreguntaFactory.reconstruir(p.id, p.textoPregunta, respuestas, found.id);
            });
            return QuizFactory_1.QuizFactory.reconstruir(found.id, found.idLibro, found.idUsuario, found.pagina, found.fechaCreacion, preguntas);
        });
    }
    actualizarPreguntas(idQuiz, preguntas) {
        return __awaiter(this, void 0, void 0, function* () {
            // Eliminar preguntas y respuestas existentes
            yield prismaClient_1.default.pregunta.deleteMany({ where: { idQuiz } });
            // Crear nuevas preguntas y respuestas
            for (const pregunta of preguntas) {
                yield prismaClient_1.default.pregunta.create({
                    data: {
                        idQuiz,
                        textoPregunta: pregunta.getTexto(),
                        respuestas: {
                            create: pregunta.getRespuestas().map((r) => ({
                                textoRespuesta: r.getTexto(),
                                esCorrecta: r.esLaCorrecta(),
                            })),
                        },
                    },
                });
            }
        });
    }
}
exports.QuizPrismaRepository = QuizPrismaRepository;
