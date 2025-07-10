"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextoSegmentador = void 0;
const cheerio_1 = require("cheerio");
/**
 * Utilidad pura de dominio.
 * - Limpia HTML y lo deja como texto plano (una sola línea).
 * - Permite extraer un bloque de texto por rango de páginas.
 */
class TextoSegmentador {
    static limpiarHtml(html) {
        const $ = (0, cheerio_1.load)(html);
        const raw = $('body').text();
        return raw.replace(/\s+/g, ' ').trim();
    }
    /**
     * Devuelve el texto correspondiente al rango de páginas inclusive.
     * @param textoPlano  Texto limpio (sin HTML).
     * @param paginaIni   Página 1-based donde inicia el rango.
     * @param paginaFin   Página 1-based donde termina el rango.
     */
    static extraerRango(textoPlano, paginaIni, paginaFin) {
        if (paginaIni <= 0 || paginaFin < paginaIni) {
            throw new Error('Rango de páginas inválido');
        }
        const palabras = textoPlano.split(' ');
        const iniWordIdx = (paginaIni - 1) * this.PALABRAS_POR_PAGINA;
        const finWordIdx = (paginaFin) * this.PALABRAS_POR_PAGINA;
        return palabras.slice(iniWordIdx, finWordIdx).join(' ');
    }
}
exports.TextoSegmentador = TextoSegmentador;
/** Palabras que consideramos ≈ 1 página (ajústalo a tu promedio). */
TextoSegmentador.PALABRAS_POR_PAGINA = 400;
