// infraestructure/http/gateways/LibroGateway.ts

import { S3Gateway } from './S3Gateway';

export class LibroGateway {
  private s3Gateway: S3Gateway;

  constructor() {
    this.s3Gateway = new S3Gateway();
  }

 async obtenerFragmentosHTMLDesdeS3(s3Path: string, desdePagina: number, hastaPagina: number): Promise<string[]> {
  if (desdePagina < 1 || hastaPagina < desdePagina) {
    throw new Error('Rango de páginas inválido.');
  }

  // Obtener el HTML completo desde S3
  const contenidoBuffer = await this.s3Gateway.obtenerArchivo(s3Path);
  if (!contenidoBuffer) {
    throw new Error('No se pudo obtener el contenido del archivo desde S3.');
  }

  const contenidoHTML = contenidoBuffer.toString('utf-8');

  // Dividir el contenido por los page-break
  const fragmentos = contenidoHTML.split('<!-- page-break -->');

  if (hastaPagina > fragmentos.length) {
    throw new Error(`Página ${hastaPagina} fuera de rango. El libro solo tiene ${fragmentos.length} páginas.`);
  }

  // Extraer el rango solicitado, restando 1 para índice 0
  const paginasSolicitadas = fragmentos.slice(desdePagina - 1, hastaPagina);

  return paginasSolicitadas.map(p => p.trim());
}

}
