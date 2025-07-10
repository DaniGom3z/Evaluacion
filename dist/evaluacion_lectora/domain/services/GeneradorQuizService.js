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
exports.GeneradorQuizService = void 0;
const PreguntaFactory_1 = require("../factories/PreguntaFactory");
const RespuestaFactory_1 = require("../factories/RespuestaFactory");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class GeneradorQuizService {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        if (!this.apiKey) {
            throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno');
        }
        this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
    }
    generarPreguntas(texto, idQuiz) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const prompt = `Eres un generador de quizzes. Debes responder ÚNICAMENTE con un JSON válido que contenga EXACTAMENTE 7 preguntas de opción múltiple (A-D), donde una sola opción es correcta.

IMPORTANTE: Responde SOLO con el JSON, sin explicaciones, sin texto adicional, sin markdown.

Formato requerido:
{
  "preguntas":[
    {
      "texto":"Pregunta ...",
      "opciones":[
        {"texto":"Opción A", "correcta":false},
        {"texto":"Opción B", "correcta":true},
        {"texto":"Opción C", "correcta":false},
        {"texto":"Opción D", "correcta":false}
      ]
    }
  ]
}

Texto fuente:
"""${texto}"""`;
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            };
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos
                const response = yield fetch(this.apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                if (!response.ok) {
                    const errorText = yield response.text();
                    console.error('❌ Error en respuesta de Gemini:', response.status, errorText);
                    throw new Error(`Error en API de Gemini: ${response.status} - ${errorText}`);
                }
                const data = yield response.json();
                console.log('📥 Respuesta completa de Gemini:', JSON.stringify(data, null, 2));
                const content = (_e = (_d = (_c = (_b = (_a = data.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text;
                if (!content) {
                    console.error('❌ No se encontró texto en la respuesta:', data);
                    throw new Error('Respuesta de Gemini no contiene texto válido');
                }
                console.log('📝 Texto extraído de Gemini:');
                console.log('--- INICIO DEL TEXTO ---');
                console.log(content);
                console.log('--- FIN DEL TEXTO ---');
                console.log('Longitud del texto:', content.length);
                console.log('Primeros 200 caracteres:', content.substring(0, 200));
                console.log('Últimos 200 caracteres:', content.substring(content.length - 200));
                // Limpieza del texto para eliminar markdown ```json y ``` al inicio y final
                let cleanedContent = content.trim();
                if (cleanedContent.startsWith('```json')) {
                    cleanedContent = cleanedContent.slice('```json'.length).trim();
                }
                if (cleanedContent.endsWith('```')) {
                    cleanedContent = cleanedContent.slice(0, -3).trim();
                }
                let parsedData;
                try {
                    parsedData = JSON.parse(cleanedContent);
                }
                catch (parseError) {
                    console.error('❌ Error parseando JSON:', parseError);
                    console.error('📄 Contenido que falló al parsear:');
                    console.error('--- CONTENIDO COMPLETO ---');
                    console.error(cleanedContent);
                    console.error('--- FIN DEL CONTENIDO ---');
                    throw new Error('Gemini devolvió un JSON inválido');
                }
                if (!parsedData.preguntas || parsedData.preguntas.length !== 7) {
                    throw new Error(`Gemini debe generar exactamente 7 preguntas, pero generó ${((_f = parsedData.preguntas) === null || _f === void 0 ? void 0 : _f.length) || 0}`);
                }
                return parsedData.preguntas.map(p => {
                    const respuestas = p.opciones.map(o => RespuestaFactory_1.RespuestaFactory.crear(o.texto, o.correcta));
                    return PreguntaFactory_1.PreguntaFactory.crear(p.texto, respuestas, idQuiz);
                });
            }
            catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    throw new Error('Timeout: La petición a Gemini tardó más de 60 segundos');
                }
                console.error('❌ Error en petición a Gemini:', error);
                throw error;
            }
        });
    }
}
exports.GeneradorQuizService = GeneradorQuizService;
