"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = jwtMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function jwtMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "No token" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET no definido en variables de entorno");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.user = { id: Number(payload.id) };
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Token inválido" });
    }
}
