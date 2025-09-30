import { Repository } from "./repositorio.js";

// Repositório específico de itens de compra
export const ItemCompraRepo = new Repository("itensCompra");

export class ItemCompra {
  constructor(id, transacaoId, livro, quantidade) {
    this.id = id || Date.now();            // PK do item
    this.transacaoId = transacaoId;        // FK -> Transacao.id
    this.livroId = livro.id;               // FK -> Livro.id
    this.livro = livro;                    // objeto Livro
    this.quantidade = quantidade;
    this.precoUnitario = livro.preco;
    this.subtotal = this.precoUnitario * this.quantidade;
  }

  resumo() {
    return `${this.quantidade}x ${this.livro.titulo} - R$${this.precoUnitario.toFixed(2)} (Subtotal: R$${this.subtotal.toFixed(2)})`;
  }
}
