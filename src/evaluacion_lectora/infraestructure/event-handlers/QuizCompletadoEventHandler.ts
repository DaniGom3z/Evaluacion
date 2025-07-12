import { EventHandler } from '../../domain/events/EventBus';
import { QuizCompletadoEvent } from '../../domain/events/QuizCompletadoEvent';

export class QuizCompletadoEventHandler implements EventHandler<QuizCompletadoEvent> {
  async handle(event: QuizCompletadoEvent): Promise<void> {
    console.log(`🎯 Quiz completado: ID=${event.quizId.getValue()}, Usuario=${event.usuarioId.getValue()}, Puntaje=${event.puntaje}, Aprobado=${event.aprobado}`);
    
    // Aquí podrías agregar lógica adicional como:
    // - Enviar notificación al usuario sobre su resultado
    // - Actualizar estadísticas del usuario
    // - Registrar en logs de auditoría
    // - Enviar a un sistema de analytics
    // - Actualizar progreso del usuario en el libro
    
    if (event.aprobado) {
      console.log(`🎉 ¡Usuario ${event.usuarioId.getValue()} aprobó el quiz ${event.quizId.getValue()}!`);
    } else {
      console.log(`📚 Usuario ${event.usuarioId.getValue()} necesita más práctica en el quiz ${event.quizId.getValue()}`);
    }
    
    console.log(`📊 Evento procesado en: ${event.occurredOn.toISOString()}`);
  }
} 