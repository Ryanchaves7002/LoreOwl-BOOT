import { Repository } from "./repositorio.js";

// Repositório específico de documentos
export const DocumentosUsuarioRepo = new Repository("documentosUsuario");

export class DocumentoUsuario {
  constructor(
    iddocumentousuario,
    tipodedocumento,
    numerodedocumento
  ) {
    // se não passar id, gera automático
    this.iddocumentousuario = iddocumentousuario || Date.now(); 
    this.tipodedocumento = tipodedocumento;
    this.numerodedocumento = numerodedocumento;
  }
}
