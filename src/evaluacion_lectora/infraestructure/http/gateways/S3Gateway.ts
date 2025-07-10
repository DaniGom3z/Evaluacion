// infrastructure/http/gateway/S3Gateway.ts

import { S3 } from "aws-sdk";

export class S3Gateway {
  private s3: S3;
  private bucketName: string;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        sessionToken: process.env.AWS_SESSION_TOKEN || "",
      },
    });

    this.bucketName = process.env.AWS_BUCKET_NAME || "mi-bucket";
  }


  async obtenerArchivo(key: string) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      const data = await this.s3.getObject(params).promise();
      return data.Body;
    } catch (error) {
      console.error("Error obteniendo archivo de S3:", error);
      throw new Error("No se pudo obtener archivo");
    }
  }


}
