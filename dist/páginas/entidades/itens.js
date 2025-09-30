import { Repository } from "./repositorio.js";

// Repositório para itens genéricos
export const ItensRepo = new Repository("itens");

export class Itens {
  constructor(iditens, transacaoId, livro, quantidade, itemCompraId) {
    this.iditens = iditens || Date.now(); // gera id automático se não passar
    this.transacaoId = transacaoId;       // FK -> Transacao.id
    this.livro = livro;                   // objeto Livro
    this.quantidade = quantidade;
    this.itemCompraId = itemCompraId;     // FK -> ItemCompra.id
  }
}
