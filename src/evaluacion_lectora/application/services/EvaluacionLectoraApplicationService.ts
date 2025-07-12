import { GenerarQuizPorProgreso } from '../usecases/GenerarQuizPorProgreso';
import { ObtenerQuiz } from '../usecases/ObtenerQuiz';
import { ResponderQuiz } from '../usecases/ResponderQuiz';
import { QuizRepository } from '../../domain/repositories/interfaces/QuizRepository';
import { IntentoQuizRepository } from '../../domain/repositories/interfaces/IntentoQuizRepository';
import { GeneradorQuizService } from '../../domain/services/GeneradorQuizService';
import { EventBus } from '../../domain/events/EventBus';
import { LibroGateway } from '../../infraestructure/http/gateways/LibroGateway';

export class EvaluacionLectoraApplicationService {
  private readonly generarQuizUseCase: GenerarQuizPorProgreso;
  private readonly obtenerQuizUseCase: ObtenerQuiz;
  private readonly responderQuizUseCase: ResponderQuiz;
  private readonly libroGateway: LibroGateway;

  constructor(
    quizRepository: QuizRepository,
    intentoQuizRepository: IntentoQuizRepository,
    generadorService: GeneradorQuizService,
    eventBus: EventBus
  ) {
    this.generarQuizUseCase = new GenerarQuizPorProgreso(
      quizRepository,
      generadorService,
      eventBus
    );
    this.obtenerQuizUseCase = new ObtenerQuiz(quizRepository);
    this.responderQuizUseCase = new ResponderQuiz(quizRepository, intentoQuizRepository, eventBus);
    this.libroGateway = new LibroGateway();
  }

  async generarQuiz(
    idUsuario: number,
    idLibro: number,
    paginaActual: number,
    s3Path: string
  ) {
    // Obtener contenido HTML desde S3
    const [contenidoHTML] = await this.libroGateway.obtenerFragmentosHTMLDesdeS3(
      s3Path,
      paginaActual,
      paginaActual
    );

    return await this.generarQuizUseCase.execute({
      idUsuario,
      idLibro,
      paginaActual,
      contenidoHTML
    });
  }

  async obtenerQuiz(id: number) {
    return await this.obtenerQuizUseCase.execute(id);
  }

  async responderQuiz(
    idQuiz: number,
    idUsuario: number,
    respuestas: { idPregunta: number; idRespuestaSeleccionada: number }[]
  ) {
    return await this.responderQuizUseCase.execute({
      idQuiz,
      idUsuario,
      respuestas
    });
  }
} 