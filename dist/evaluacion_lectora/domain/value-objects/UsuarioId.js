"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioId = void 0;
class UsuarioId {
    constructor(value) {
        this.value = value;
        if (value <= 0) {
            throw new Error('Usuario ID debe ser un número positivo');
        }
    }
    static create(value) {
        return new UsuarioId(value);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value.toString();
    }
}
exports.UsuarioId = UsuarioId;
