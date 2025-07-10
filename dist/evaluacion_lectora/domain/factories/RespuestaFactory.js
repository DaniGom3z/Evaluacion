"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaFactory = void 0;
const Respuesta_1 = require("../entities/Respuesta");
class RespuestaFactory {
    static crear(texto, esCorrecta) {
        return new Respuesta_1.Respuesta(texto, esCorrecta);
    }
    static reconstruir(id, texto, esCorrecta) {
        return new Respuesta_1.Respuesta(texto, esCorrecta, id);
    }
}
exports.RespuestaFactory = RespuestaFactory;
