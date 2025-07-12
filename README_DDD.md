# Arquitectura DDD - Evaluación Lectora

## 📋 Resumen

Este proyecto implementa Domain-Driven Design (DDD) para un sistema de evaluación lectora que genera quizzes automáticamente basados en el progreso de lectura del usuario.

## 🏗️ Arquitectura DDD

### Capas de la Arquitectura

```
src/evaluacion_lectora/
├── domain/                    # 🎯 Dominio (Core)
│   ├── entities/             # Entidades de dominio
│   ├── value-objects/        # Objetos de valor
│   ├── aggregates/           # Agregados
│   ├── services/             # Servicios de dominio
│   ├── events/               # Eventos de dominio
│   ├── factories/            # Factories
│   └── repositories/         # Interfaces de repositorios
├── application/              # 📱 Aplicación
│   ├── usecases/            # Casos de uso
│   └── services/            # Servicios de aplicación
└── infraestructure/         # 🔧 Infraestructura
    ├── adapters/            # Adaptadores (Controllers, Routes)
    ├── repositories/        # Implementaciones de repositorios
    ├── container/           # Container de dependencias
    ├── event-handlers/      # Manejadores de eventos
    └── http/                # Gateways HTTP
```

## 🎯 Dominio (Domain Layer)

### Entidades (Entities)
- **Quiz**: Entidad principal que representa un cuestionario
- **Pregunta**: Entidad que representa una pregunta del quiz
- **Respuesta**: Entidad que representa una respuesta de opción múltiple
- **IntentoQuiz**: Entidad que registra los intentos de un usuario

### Objetos de Valor (Value Objects)
- **QuizId**: Identificador único del quiz
- **UsuarioId**: Identificador del usuario
- **LibroId**: Identificador del libro
- **Pagina**: Número de página con validaciones

### Agregados (Aggregates)
- **EvaluacionLectora**: Aggregate root que encapsula la lógica de negocio relacionada con la evaluación

### Servicios de Dominio (Domain Services)
- **GeneradorQuizService**: Genera preguntas usando IA (Gemini)

### Eventos de Dominio (Domain Events)
- **QuizGeneradoEvent**: Se dispara cuando se genera un nuevo quiz
- **QuizCompletadoEvent**: Se dispara cuando se completa un quiz

## 📱 Aplicación (Application Layer)

### Casos de Uso (Use Cases)
- **GenerarQuizPorProgreso**: Genera un quiz cuando el usuario llega a cierta página
- **ObtenerQuiz**: Obtiene un quiz por ID
- **ResponderQuiz**: Procesa las respuestas de un usuario

### Servicios de Aplicación (Application Services)
- **EvaluacionLectoraApplicationService**: Orquesta los casos de uso y maneja la lógica de aplicación

## 🔧 Infraestructura (Infrastructure Layer)

### Adaptadores (Adapters)
- **QuizController**: Controlador REST que maneja las peticiones HTTP
- **Routes**: Definición de rutas de la API

### Repositorios (Repositories)
- **QuizPrismaRepository**: Implementación del repositorio usando Prisma
- **PreguntaPrismaRepository**: Repositorio para preguntas
- **IntentoQuizPrismaRepository**: Repositorio para intentos

### Container de Dependencias
- **DependencyContainer**: Maneja la inyección de dependencias

### Event Handlers
- **QuizGeneradoEventHandler**: Maneja el evento de quiz generado

## 🚀 Principios DDD Implementados

### 1. **Ubiquitous Language**
- Términos como "Quiz", "Pregunta", "Respuesta", "Intento" son consistentes en todo el código
- Los nombres de clases y métodos reflejan el lenguaje del dominio

### 2. **Bounded Contexts**
- El contexto está claramente definido: "Evaluación Lectora"
- Las entidades y reglas de negocio están encapsuladas

### 3. **Aggregate Roots**
- `EvaluacionLectora` actúa como aggregate root
- Maneja la consistencia de las entidades relacionadas

### 4. **Value Objects**
- IDs y otros valores primitivos están encapsulados en objetos de valor
- Proporcionan validaciones y comportamiento específico del dominio

### 5. **Domain Events**
- Los eventos permiten desacoplamiento entre componentes
- Facilitan la extensibilidad del sistema

### 6. **Repository Pattern**
- Abstrae el acceso a datos
- Permite cambiar la implementación de persistencia

### 7. **Factory Pattern**
- Encapsula la lógica de creación de entidades
- Maneja la reconstrucción desde la base de datos

## 🔄 Flujo de Datos

```
HTTP Request → Controller → Application Service → Use Case → Domain Service → Repository → Database
                                    ↓
                              Domain Events → Event Handlers
```

## 📊 Ventajas de esta Arquitectura

### ✅ **Mantenibilidad**
- Separación clara de responsabilidades
- Código organizado por capas

### ✅ **Testabilidad**
- Dependencias inyectadas
- Lógica de negocio aislada

### ✅ **Escalabilidad**
- Fácil agregar nuevos casos de uso
- Eventos permiten extensibilidad

### ✅ **Flexibilidad**
- Cambiar implementaciones sin afectar el dominio
- Agregar nuevos adaptadores fácilmente

## 🛠️ Cómo Usar

### 1. **Configuración**
```bash
npm install
```

### 2. **Variables de Entorno**
```env
DATABASE_URL="mysql://..."
GEMINI_API_KEY="your-api-key"
```

### 3. **Ejecutar**
```bash
npm start
```

## 🔧 Extensibilidad

### Agregar Nuevo Caso de Uso
1. Crear en `application/usecases/`
2. Registrar en `DependencyContainer`
3. Agregar método en `ApplicationService`

### Agregar Nuevo Event Handler
1. Implementar `EventHandler<T>`
2. Registrar en `DependencyContainer.registerEventHandlers()`

### Agregar Nueva Entidad
1. Crear en `domain/entities/`
2. Agregar value objects si es necesario
3. Crear factory y repository

## 📝 Notas de Implementación

- **Inmutabilidad**: Las entidades son inmutables, los cambios crean nuevas instancias
- **Validaciones**: Se realizan en el dominio, no en la infraestructura
- **Eventos**: Se publican de forma asíncrona para no bloquear el flujo principal
- **Dependencias**: Se inyectan a través del container para facilitar testing 