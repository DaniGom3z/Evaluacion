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
Object.defineProperty(exports, "__esModule", { value: true });
// pruebaLibroGateway.ts
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Carga variables del .env
const LibroGateway_1 = require("./infraestructure/http/gateways/LibroGateway"); // ajusta la ruta si es diferente
(() => __awaiter(void 0, void 0, void 0, function* () {
    const libroGateway = new LibroGateway_1.LibroGateway();
    const s3Path = 'libros/DonQuijote.txt';
    const desdePagina = 1;
    const hastaPagina = 2;
    try {
        const paginas = yield libroGateway.obtenerFragmentosHTMLDesdeS3(s3Path, desdePagina, hastaPagina);
        paginas.forEach((paginaContenido, index) => {
            console.log(`📄 Página ${desdePagina + index}:\n\n${paginaContenido}\n\n---\n`);
        });
    }
    catch (error) {
        console.error('❌ Error al obtener fragmentos del libro:', error.message);
    }
}))();
