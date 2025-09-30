import { Repository } from "./repositorio.js";

// Repositório específico de transações
export const TransacoesRepo = new Repository("transacoes");

export class Transacao {
  constructor(id, usuarioId, cartaoId, iditens, valorTotal) {
    this.id = id || Date.now();           // PK da transação
    this.usuarioId = usuarioId;           // FK -> Usuario.id
    this.cartaoId = cartaoId;             // FK -> Cartao.id
    this.iditens = iditens;               // lista de itens [{livro, quantidade}]
    this.valorTotal = valorTotal;
    this.data = new Date().toISOString(); // data/hora da transação
    this.status = "pendente";             // pendente | aprovado | recusado
  }

  // Finalizar a transação (simulação)
  finalizar(cartao) {
    if (cartao.estaValido()) {
      this.status = "aprovado";
      console.log(`Transação #${this.id} aprovada no cartão ${cartao.resumo()}`);
    } else {
      this.status = "recusado";
      console.log(`Transação #${this.id} recusada: cartão inválido.`);
    }
  }

  // Retorna resumo da compra como objeto
  resumo() {
    return {
      id: this.id,
      usuarioId: this.usuarioId,
      cartaoId: this.cartaoId,
      itens: this.iditens.map(item => ({
        titulo: item.livro.titulo,
        quantidade: item.quantidade,
        precoUnitario: item.livro.preco
      })),
      total: this.valorTotal,
      status: this.status,
      data: this.data
    };
  }
}
