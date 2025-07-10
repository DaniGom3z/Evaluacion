import { Pregunta } from '../entities/Pregunta';
import { Respuesta } from '../entities/Respuesta';
import { PreguntaFactory } from '../factories/PreguntaFactory';
import { RespuestaFactory } from '../factories/RespuestaFactory';

import dotenv from 'dotenv';
dotenv.config();

interface PreguntaIA {
  texto: string;
  opciones: { texto: string; correcta: boolean }[];
}

export class GeneradorQuizService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY!;
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno');
    }
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
  }

  async generarPreguntas(texto: string, idQuiz: number): Promise<Pregunta[]> {
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

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error en respuesta de Gemini:', response.status, errorText);
        throw new Error(`Error en API de Gemini: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('📥 Respuesta completa de Gemini:', JSON.stringify(data, null, 2));

      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
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

      let parsedData: { preguntas: PreguntaIA[] };
      try {
        parsedData = JSON.parse(cleanedContent);
      } catch (parseError) {
        console.error('❌ Error parseando JSON:', parseError);
        console.error('📄 Contenido que falló al parsear:');
        console.error('--- CONTENIDO COMPLETO ---');
        console.error(cleanedContent);
        console.error('--- FIN DEL CONTENIDO ---');
        throw new Error('Gemini devolvió un JSON inválido');
      }

      if (!parsedData.preguntas || parsedData.preguntas.length !== 7) {
        throw new Error(`Gemini debe generar exactamente 7 preguntas, pero generó ${parsedData.preguntas?.length || 0}`);
      }

      return parsedData.preguntas.map(p => {
        const respuestas = p.opciones.map(o =>
          RespuestaFactory.crear(o.texto, o.correcta)
        );
        return PreguntaFactory.crear(p.texto, respuestas, idQuiz);
      });

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Timeout: La petición a Gemini tardó más de 60 segundos');
      }
      console.error('❌ Error en petición a Gemini:', error);
      throw error;
    }
  }
}
