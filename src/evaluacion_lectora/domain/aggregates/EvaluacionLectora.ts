import { Quiz } from '../entities/Quiz';
import { IntentoQuiz } from '../entities/IntentoQuiz';
import { LibroId } from '../value-objects/LibroId';
import { UsuarioId } from '../value-objects/UsuarioId';
import { Pagina } from '../value-objects/Pagina';

export class EvaluacionLectora {
  private constructor(
    private readonly libroId: LibroId,
    private readonly usuarioId: UsuarioId,
    private readonly quizzes: Quiz[],
    private readonly intentos: IntentoQuiz[]
  ) {}

  static crear(
    libroId: LibroId,
    usuarioId: UsuarioId
  ): EvaluacionLectora {
    return new EvaluacionLectora(libroId, usuarioId, [], []);
  }

  static reconstruir(
    libroId: number,
    usuarioId: number,
    quizzes: Quiz[],
    intentos: IntentoQuiz[]
  ): EvaluacionLectora {
    return new EvaluacionLectora(
      LibroId.create(libroId),
      UsuarioId.create(usuarioId),
      quizzes,
      intentos
    );
  }

  // Business methods
  puedeGenerarQuizEnPagina(pagina: Pagina): boolean {
    return pagina.esMultiploDe(10) && !this.tieneQuizEnPagina(pagina);
  }

  private tieneQuizEnPagina(pagina: Pagina): boolean {
    return this.quizzes.some(quiz => quiz.getPagina().equals(pagina));
  }

  agregarQuiz(quiz: Quiz): EvaluacionLectora {
    if (!quiz.getLibroId().equals(this.libroId) || !quiz.getUsuarioId().equals(this.usuarioId)) {
      throw new Error('El quiz no pertenece a esta evaluación lectora');
    }

    return new EvaluacionLectora(
      this.libroId,
      this.usuarioId,
      [...this.quizzes, quiz],
      this.intentos
    );
  }

  agregarIntento(intento: IntentoQuiz): EvaluacionLectora {
    if (intento.getIdUsuario() !== this.usuarioId.getValue()) {
      throw new Error('El intento no pertenece a este usuario');
    }

    return new EvaluacionLectora(
      this.libroId,
      this.usuarioId,
      this.quizzes,
      [...this.intentos, intento]
    );
  }

  obtenerProgreso(): number {
    const quizzesCompletados = this.quizzes.filter(quiz => quiz.estaCompleto()).length;
    return quizzesCompletados;
  }

  obtenerPromedioAprobacion(): number {
    if (this.intentos.length === 0) return 0;
    
    const intentosAprobados = this.intentos.filter(intento => intento.fueAprobado()).length;
    return (intentosAprobados / this.intentos.length) * 100;
  }

  // Getters
  getLibroId(): LibroId { return this.libroId; }
  getUsuarioId(): UsuarioId { return this.usuarioId; }
  getQuizzes(): Quiz[] { return [...this.quizzes]; }
  getIntentos(): IntentoQuiz[] { return [...this.intentos]; }
} 