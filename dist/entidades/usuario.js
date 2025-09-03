class Transacao {
  constructor(id, usuarioId, cartaoId) {
    this.id = id;                
    this.usuarioId = usuarioId;  
    this.cartaoId = cartaoId;    
    this.itens = [];             // lista de ItemCompra
    this.valorTotal = 0;
    this.data = new Date();
    this.status = "pendente";
  }

  // Adicionar item à transação
  adicionarItem(livro, quantidade) {
    const item = new ItemCompra(this.itens.length + 1, this.id, livro, quantidade);
    this.itens.push(item);
    this.valorTotal += item.subtotal;
  }

  finalizar(cartao) {
    if (cartao.estaValido()) {
      this.status = "aprovado";
      console.log(`Transação #${this.id} aprovada no cartão ${cartao.resumo()}`);
    } else {
      this.status = "recusado";
      console.log(`Transação #${this.id} recusada: cartão inválido.`);
    }
  }

  resumo() {
    console.log(`--- Transação #${this.id} ---`);
    this.itens.forEach(item => console.log(item.resumo()));
    console.log(`Total: R$${this.valorTotal.toFixed(2)}`);
    console.log(`Status: ${this.status}`);
    console.log(`Data: ${this.data.toLocaleString()}`);
  }
}
