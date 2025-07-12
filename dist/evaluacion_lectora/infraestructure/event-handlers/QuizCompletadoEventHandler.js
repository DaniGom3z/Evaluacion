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
exports.QuizCompletadoEventHandler = void 0;
class QuizCompletadoEventHandler {
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`🎯 Quiz completado: ID=${event.quizId.getValue()}, Usuario=${event.usuarioId.getValue()}, Puntaje=${event.puntaje}, Aprobado=${event.aprobado}`);
            // Aquí podrías agregar lógica adicional como:
            // - Enviar notificación al usuario sobre su resultado
            // - Actualizar estadísticas del usuario
            // - Registrar en logs de auditoría
            // - Enviar a un sistema de analytics
            // - Actualizar progreso del usuario en el libro
            if (event.aprobado) {
                console.log(`🎉 ¡Usuario ${event.usuarioId.getValue()} aprobó el quiz ${event.quizId.getValue()}!`);
            }
            else {
                console.log(`📚 Usuario ${event.usuarioId.getValue()} necesita más práctica en el quiz ${event.quizId.getValue()}`);
            }
            console.log(`📊 Evento procesado en: ${event.occurredOn.toISOString()}`);
        });
    }
}
exports.QuizCompletadoEventHandler = QuizCompletadoEventHandler;
