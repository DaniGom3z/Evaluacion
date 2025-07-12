import { DomainEvent } from './DomainEvent';
import { QuizId } from '../value-objects/QuizId';
import { LibroId } from '../value-objects/LibroId';
import { UsuarioId } from '../value-objects/UsuarioId';
import { Pagina } from '../value-objects/Pagina';

export class QuizGeneradoEvent implements DomainEvent {
  public readonly occurredOn: Date;
  public readonly eventType: string = 'QuizGenerado';

  constructor(
    public readonly quizId: QuizId,
    public readonly libroId: LibroId,
    public readonly usuarioId: UsuarioId,
    public readonly pagina: Pagina
  ) {
    this.occurredOn = new Date();
  }
} 