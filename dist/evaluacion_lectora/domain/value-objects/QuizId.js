"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizId = void 0;
class QuizId {
    constructor(value) {
        this.value = value;
        if (value <= 0) {
            throw new Error('Quiz ID debe ser un número positivo');
        }
    }
    static create(value) {
        return new QuizId(value);
    }
    static createNullable(value) {
        return value ? new QuizId(value) : null;
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
exports.QuizId = QuizId;
