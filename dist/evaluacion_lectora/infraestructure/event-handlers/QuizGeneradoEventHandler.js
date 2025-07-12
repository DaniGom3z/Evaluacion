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
exports.QuizGeneradoEventHandler = void 0;
class QuizGeneradoEventHandler {
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`🎯 Quiz generado: ID=${event.quizId.getValue()}, Libro=${event.libroId.getValue()}, Usuario=${event.usuarioId.getValue()}, Página=${event.pagina.getValue()}`);
            // Aquí podrías agregar lógica adicional como:
            // - Enviar notificación al usuario
            // - Actualizar métricas
            // - Registrar en logs de auditoría
            // - Enviar a un sistema de analytics
            console.log(`📊 Evento procesado en: ${event.occurredOn.toISOString()}`);
        });
    }
}
exports.QuizGeneradoEventHandler = QuizGeneradoEventHandler;
