"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyContainer = void 0;
const QuizPrismaRepository_1 = require("../repositories/QuizPrismaRepository");
const IntentoQuizPrismaRepository_1 = require("../repositories/IntentoQuizPrismaRepository");
const GeneradorQuizService_1 = require("../../domain/services/GeneradorQuizService");
const EventBus_1 = require("../../domain/events/EventBus");
const EvaluacionLectoraApplicationService_1 = require("../../application/services/EvaluacionLectoraApplicationService");
const QuizGeneradoEventHandler_1 = require("../event-handlers/QuizGeneradoEventHandler");
const QuizCompletadoEventHandler_1 = require("../event-handlers/QuizCompletadoEventHandler");
class DependencyContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    static getInstance() {
        if (!DependencyContainer.instance) {
            DependencyContainer.instance = new DependencyContainer();
        }
        return DependencyContainer.instance;
    }
    initializeServices() {
        // Infrastructure services
        this.services.set('QuizRepository', new QuizPrismaRepository_1.QuizPrismaRepository());
        this.services.set('IntentoQuizRepository', new IntentoQuizPrismaRepository_1.IntentoQuizPrismaRepository());
        this.services.set('EventBus', new EventBus_1.EventBus());
        // Domain services
        this.services.set('GeneradorQuizService', new GeneradorQuizService_1.GeneradorQuizService());
        // Application services
        this.services.set('EvaluacionLectoraApplicationService', new EvaluacionLectoraApplicationService_1.EvaluacionLectoraApplicationService(this.get('QuizRepository'), this.get('IntentoQuizRepository'), this.get('GeneradorQuizService'), this.get('EventBus')));
        // Register event handlers
        this.registerEventHandlers();
    }
    registerEventHandlers() {
        const eventBus = this.get('EventBus');
        const quizGeneradoHandler = new QuizGeneradoEventHandler_1.QuizGeneradoEventHandler();
        const quizCompletadoHandler = new QuizCompletadoEventHandler_1.QuizCompletadoEventHandler();
        eventBus.subscribe('QuizGenerado', quizGeneradoHandler);
        eventBus.subscribe('QuizCompletado', quizCompletadoHandler);
    }
    get(serviceName) {
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }
        return service;
    }
    register(serviceName, service) {
        this.services.set(serviceName, service);
    }
}
exports.DependencyContainer = DependencyContainer;
