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
exports.ObtenerQuiz = void 0;
class ObtenerQuiz {
    constructor(quizRepo) {
        this.quizRepo = quizRepo;
    }
    execute(idQuiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const quiz = yield this.quizRepo.encontrarPorId(idQuiz);
            if (!quiz)
                throw new Error('Quiz no encontrado');
            return quiz;
        });
    }
}
exports.ObtenerQuiz = ObtenerQuiz;
