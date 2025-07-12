// Script de prueba para verificar la arquitectura DDD
console.log('🧪 Probando la arquitectura DDD...\n');

// Simular la creación de value objects
console.log('1. Probando Value Objects:');
try {
  const { LibroId } = require('./dist/evaluacion_lectora/domain/value-objects/LibroId');
  const { UsuarioId } = require('./dist/evaluacion_lectora/domain/value-objects/UsuarioId');
  const { Pagina } = require('./dist/evaluacion_lectora/domain/value-objects/Pagina');
  
  const libroId = LibroId.create(1);
  const usuarioId = UsuarioId.create(1);
  const pagina = Pagina.create(10);
  
  console.log('✅ Value Objects creados correctamente');
  console.log(`   - LibroId: ${libroId.getValue()}`);
  console.log(`   - UsuarioId: ${usuarioId.getValue()}`);
  console.log(`   - Página: ${pagina.getValue()}`);
  console.log(`   - ¿Es múltiplo de 10?: ${pagina.esMultiploDe(10)}\n`);
} catch (error) {
  console.log('❌ Error con Value Objects:', error.message);
}

// Simular la creación de entidades
console.log('2. Probando Entidades:');
try {
  const { Quiz } = require('./dist/evaluacion_lectora/domain/entities/Quiz');
  const { LibroId } = require('./dist/evaluacion_lectora/domain/value-objects/LibroId');
  const { UsuarioId } = require('./dist/evaluacion_lectora/domain/value-objects/UsuarioId');
  const { Pagina } = require('./dist/evaluacion_lectora/domain/value-objects/Pagina');
  
  const quiz = Quiz.crearNuevo(
    LibroId.create(1),
    UsuarioId.create(1),
    Pagina.create(10),
    []
  );
  
  console.log('✅ Quiz creado correctamente');
  console.log(`   - LibroId: ${quiz.getLibroId().getValue()}`);
  console.log(`   - UsuarioId: ${quiz.getUsuarioId().getValue()}`);
  console.log(`   - Página: ${quiz.getPagina().getValue()}`);
  console.log(`   - ¿Está completo?: ${quiz.estaCompleto()}\n`);
} catch (error) {
  console.log('❌ Error con Entidades:', error.message);
}

// Simular domain events
console.log('3. Probando Domain Events:');
try {
  const { EventBus } = require('./dist/evaluacion_lectora/domain/events/EventBus');
  const { QuizGeneradoEvent } = require('./dist/evaluacion_lectora/domain/events/QuizGeneradoEvent');
  
  const eventBus = new EventBus();
  let eventHandled = false;
  
  eventBus.subscribe('QuizGenerado', {
    handle: async (event) => {
      console.log('✅ Evento manejado correctamente');
      console.log(`   - QuizId: ${event.quizId.getValue()}`);
      console.log(`   - LibroId: ${event.libroId.getValue()}`);
      eventHandled = true;
    }
  });
  
  const event = new QuizGeneradoEvent(
    require('./dist/evaluacion_lectora/domain/value-objects/QuizId').QuizId.create(1),
    require('./dist/evaluacion_lectora/domain/value-objects/LibroId').LibroId.create(1),
    require('./dist/evaluacion_lectora/domain/value-objects/UsuarioId').UsuarioId.create(1),
    require('./dist/evaluacion_lectora/domain/value-objects/Pagina').Pagina.create(10)
  );
  
  await eventBus.publish(event);
  
  if (!eventHandled) {
    console.log('❌ Evento no fue manejado');
  }
} catch (error) {
  console.log('❌ Error con Domain Events:', error.message);
}

console.log('\n🎉 Pruebas completadas!');
console.log('Si ves ✅, la arquitectura DDD está funcionando correctamente.');
console.log('Si ves ❌, hay algún problema que necesita ser corregido.'); 