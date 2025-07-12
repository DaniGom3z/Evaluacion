import { QuizRepository } from '../../domain/repositories/interfaces/QuizRepository';
import { IntentoQuizRepository } from '../../domain/repositories/interfaces/IntentoQuizRepository';
import { QuizPrismaRepository } from '../repositories/QuizPrismaRepository';
import { IntentoQuizPrismaRepository } from '../repositories/IntentoQuizPrismaRepository';
import { GeneradorQuizService } from '../../domain/services/GeneradorQuizService';
import { EventBus } from '../../domain/events/EventBus';
import { EvaluacionLectoraApplicationService } from '../../application/services/EvaluacionLectoraApplicationService';
import { QuizGeneradoEventHandler } from '../event-handlers/QuizGeneradoEventHandler';
import { QuizCompletadoEventHandler } from '../event-handlers/QuizCompletadoEventHandler';

export class DependencyContainer {
  private static instance: DependencyContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.initializeServices();
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  private initializeServices(): void {
    // Infrastructure services
    this.services.set('QuizRepository', new QuizPrismaRepository());
    this.services.set('IntentoQuizRepository', new IntentoQuizPrismaRepository());
    this.services.set('EventBus', new EventBus());
    
    // Domain services
    this.services.set('GeneradorQuizService', new GeneradorQuizService());
    
    // Application services
    this.services.set('EvaluacionLectoraApplicationService', 
      new EvaluacionLectoraApplicationService(
        this.get<QuizRepository>('QuizRepository'),
        this.get<IntentoQuizRepository>('IntentoQuizRepository'),
        this.get<GeneradorQuizService>('GeneradorQuizService'),
        this.get<EventBus>('EventBus')
      )
    );

    // Register event handlers
    this.registerEventHandlers();
  }

  private registerEventHandlers(): void {
    const eventBus = this.get<EventBus>('EventBus');
    const quizGeneradoHandler = new QuizGeneradoEventHandler();
    const quizCompletadoHandler = new QuizCompletadoEventHandler();
    
    eventBus.subscribe('QuizGenerado', quizGeneradoHandler);
    eventBus.subscribe('QuizCompletado', quizCompletadoHandler);
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service as T;
  }

  register<T>(serviceName: string, service: T): void {
    this.services.set(serviceName, service);
  }
} 