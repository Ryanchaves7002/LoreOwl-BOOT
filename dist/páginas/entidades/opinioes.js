import { Repository } from "./repositorio.js";

// Repositório específico de opiniões
export const OpinioesRepo = new Repository("opinioes");

export class Opinioes {
  constructor(usuarioId, avaliacao, idopiniao, notaavaliacao) {
    this.idopiniao = idopiniao || Date.now(); // gera id automático
    this.usuarioId = usuarioId;
    this.avaliacao = avaliacao || "";         // texto da opinião
    this.notaavaliacao = notaavaliacao || 0;  // nota de 0 a 5
  }
}
