"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Respuesta = void 0;
class Respuesta {
    constructor(texto, esCorrecta, id = null) {
        this.texto = texto;
        this.esCorrecta = esCorrecta;
        this.id = id;
        if (!texto.trim())
            throw new Error('El texto de la respuesta no puede estar vacío');
    }
    getId() { return this.id; }
    getTexto() { return this.texto; }
    esLaCorrecta() { return this.esCorrecta; }
}
exports.Respuesta = Respuesta;
