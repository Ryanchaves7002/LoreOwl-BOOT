class Transacao {
  constructor(
    id, 
    usuarioId, 
    cartaoId, 
    iditens, 
    valorTotal
  ) {
    this.id = id;                 // PK da transação
    this.usuarioId = usuarioId;   // FK -> Usuario.id
    this.cartaoId = cartaoId;     // FK -> Cartao.id
    this.iditens = iditens;           // lista de livros comprados [{livro, quantidade}]
    this.valorTotal = valorTotal; // valor da compra
    this.data = new Date();       // data/hora da transação
    this.status = "pendente";     // pendente | aprovado | recusado
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

  // Mostrar resumo da compra
  resumo() {
    console.log(`--- Transação #${this.id} ---`);
    console.log(`Usuário ID: ${this.usuarioId}`);
    console.log(`Cartão ID: ${this.cartaoId}`);
    this.iditens.forEach(item => {
      console.log(`${item.quantidade}x ${item.livro.titulo} - R$${item.livro.preco.toFixed(2)} cada`);
    });
    console.log(`Total: R$${this.valorTotal.toFixed(2)}`);
    console.log(`Status: ${this.status}`);
    console.log(`Data: ${this.data.toLocaleString()}`);
  }
}
