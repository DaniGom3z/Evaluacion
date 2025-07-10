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
exports.IntentoQuizPrismaRepository = void 0;
const IntentoQuiz_1 = require("../../domain/entities/IntentoQuiz");
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
class IntentoQuizPrismaRepository {
    guardarIntento(intento) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.intentoQuiz.create({
                data: {
                    idQuiz: intento.getIdQuiz(),
                    idUsuario: intento.getIdUsuario(),
                    puntajeObtenido: intento.getRespuestasCorrectas(),
                    aprobado: intento.fueAprobado(),
                    fechaIntento: intento.getFecha()
                }
            });
        });
    }
    obtenerIntentosUsuario(idUsuario, idQuiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultados = yield prismaClient_1.default.intentoQuiz.findMany({
                where: {
                    idUsuario,
                    idQuiz
                }
            });
            return resultados.map(i => new IntentoQuiz_1.IntentoQuiz(i.idQuiz, i.idUsuario, i.puntajeObtenido, i.id, i.fechaIntento));
        });
    }
}
exports.IntentoQuizPrismaRepository = IntentoQuizPrismaRepository;
