import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import  PrismaClient  from './evaluacion_lectora/infraestructure/prisma/prismaClient';
import evaluacionRouter from './evaluacion_lectora/infraestructure/adapters/routes/routes';

dotenv.config();

// Log temporal para depurar variables de entorno
console.log('🔧 Variables de entorno cargadas:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Configurada' : '❌ No configurada');
console.log('PORT:', process.env.PORT || '3000 (default)');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Salud
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// Rutas de evaluación
app.use('/api/evaluacion', evaluacionRouter);

// 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Prisma client

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down...');
  await PrismaClient.$disconnect();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Arrancar servidor
app.listen(port, () => {
  console.log(`📝 Evaluación Lectora service running on port ${port}`);
});
