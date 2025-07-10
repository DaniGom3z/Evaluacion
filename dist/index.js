"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prismaClient_1 = __importDefault(require("./evaluacion_lectora/infraestructure/prisma/prismaClient"));
const routes_1 = __importDefault(require("./evaluacion_lectora/infraestructure/adapters/routes/routes"));
dotenv_1.default.config();
// Log temporal para depurar variables de entorno
console.log('🔧 Variables de entorno cargadas:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Configurada' : '❌ No configurada');
console.log('PORT:', process.env.PORT || '3000 (default)');
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
// Salud
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK' });
});
// Rutas de evaluación
app.use('/api/evaluacion', routes_1.default);
// 404
app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});
// Error handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Prisma client
// Graceful shutdown
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Shutting down...');
    yield prismaClient_1.default.$disconnect();
    process.exit(0);
});
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
// Arrancar servidor
app.listen(port, () => {
    console.log(`📝 Evaluación Lectora service running on port ${port}`);
});
