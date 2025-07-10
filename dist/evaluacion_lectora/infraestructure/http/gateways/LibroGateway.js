"use strict";
// infraestructure/http/gateways/LibroGateway.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibroGateway = void 0;
const S3Gateway_1 = require("./S3Gateway");
class LibroGateway {
    constructor() {
        this.s3Gateway = new S3Gateway_1.S3Gateway();
    }
    obtenerFragmentosHTMLDesdeS3(s3Path, desdePagina, hastaPagina) {
        return __awaiter(this, void 0, void 0, function* () {
            if (desdePagina < 1 || hastaPagina < desdePagina) {
                throw new Error('Rango de páginas inválido.');
            }
            // Obtener el HTML completo desde S3
            const contenidoBuffer = yield this.s3Gateway.obtenerArchivo(s3Path);
            if (!contenidoBuffer) {
                throw new Error('No se pudo obtener el contenido del archivo desde S3.');
            }
            const contenidoHTML = contenidoBuffer.toString('utf-8');
            // Dividir el contenido por los page-break
            const fragmentos = contenidoHTML.split('<!-- page-break -->');
            if (hastaPagina > fragmentos.length) {
                throw new Error(`Página ${hastaPagina} fuera de rango. El libro solo tiene ${fragmentos.length} páginas.`);
            }
            // Extraer el rango solicitado, restando 1 para índice 0
            const paginasSolicitadas = fragmentos.slice(desdePagina - 1, hastaPagina);
            return paginasSolicitadas.map(p => p.trim());
        });
    }
}
exports.LibroGateway = LibroGateway;
