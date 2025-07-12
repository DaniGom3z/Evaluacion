"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagina = void 0;
class Pagina {
    constructor(value) {
        this.value = value;
        if (value <= 0) {
            throw new Error('El número de página debe ser positivo');
        }
    }
    static create(value) {
        return new Pagina(value);
    }
    getValue() {
        return this.value;
    }
    esMultiploDe(multiplo) {
        return this.value % multiplo === 0;
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value.toString();
    }
}
exports.Pagina = Pagina;
