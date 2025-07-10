"use strict";
// infrastructure/http/gateway/S3Gateway.ts
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
exports.S3Gateway = void 0;
const aws_sdk_1 = require("aws-sdk");
class S3Gateway {
    constructor() {
        this.s3 = new aws_sdk_1.S3({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
                sessionToken: process.env.AWS_SESSION_TOKEN || "",
            },
        });
        this.bucketName = process.env.AWS_BUCKET_NAME || "mi-bucket";
    }
    obtenerArchivo(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                Bucket: this.bucketName,
                Key: key,
            };
            try {
                const data = yield this.s3.getObject(params).promise();
                return data.Body;
            }
            catch (error) {
                console.error("Error obteniendo archivo de S3:", error);
                throw new Error("No se pudo obtener archivo");
            }
        });
    }
}
exports.S3Gateway = S3Gateway;
