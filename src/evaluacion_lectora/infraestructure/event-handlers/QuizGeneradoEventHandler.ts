import { EventHandler } from '../../domain/events/EventBus';
import { QuizGeneradoEvent } from '../../domain/events/QuizGeneradoEvent';

export class QuizGeneradoEventHandler implements EventHandler<QuizGeneradoEvent> {
  async handle(event: QuizGeneradoEvent): Promise<void> {
    console.log(`🎯 Quiz generado: ID=${event.quizId.getValue()}, Libro=${event.libroId.getValue()}, Usuario=${event.usuarioId.getValue()}, Página=${event.pagina.getValue()}`);
    
    // Aquí podrías agregar lógica adicional como:
    // - Enviar notificación al usuario
    // - Actualizar métricas
    // - Registrar en logs de auditoría
    // - Enviar a un sistema de analytics
    
    console.log(`📊 Evento procesado en: ${event.occurredOn.toISOString()}`);
  }
} 