import { DomainEvent } from './DomainEvent';
import { QuizId } from '../value-objects/QuizId';
import { UsuarioId } from '../value-objects/UsuarioId';

export class QuizCompletadoEvent implements DomainEvent {
  public readonly occurredOn: Date;
  public readonly eventType: string = 'QuizCompletado';

  constructor(
    public readonly quizId: QuizId,
    public readonly usuarioId: UsuarioId,
    public readonly puntaje: number,
    public readonly aprobado: boolean
  ) {
    this.occurredOn = new Date();
  }
} 