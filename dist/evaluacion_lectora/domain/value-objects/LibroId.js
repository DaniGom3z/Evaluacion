"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibroId = void 0;
class LibroId {
    constructor(value) {
        this.value = value;
        if (value <= 0) {
            throw new Error('Libro ID debe ser un número positivo');
        }
    }
    static create(value) {
        return new LibroId(value);
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
exports.LibroId = LibroId;
