// Classe Carrinho
class Carrinho {
  constructor() {
    this.itens = []; // vai guardar objetos {livro, quantidade}
  }

  // Adicionar livro ao carrinho
  adicionarItem(livro, quantidade = 1) {
    // Checa se o livro já está no carrinho
    const itemExistente = this.itens.find(item => item.livro.id === livro.id);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.push({ livro, quantidade });
    }
    console.log(`${quantidade}x ${livro.titulo} adicionado ao carrinho.`);
  }

  // Remover livro do carrinho
  removerItem(livroId) {
    this.itens = this.itens.filter(item => item.livro.id !== livroId);
    console.log(`Livro removido do carrinho.`);
  }

  // Calcular total
  calcularTotal() {
    return this.itens.reduce((total, item) => total + item.livro.preco * item.quantidade, 0);
  }

  // Limpar carrinho
  limparCarrinho() {
    this.itens = [];
    console.log("Carrinho limpo.");
  }

  // Mostrar itens do carrinho
  mostrarItens() {
    console.log("Itens no carrinho:");
    this.itens.forEach(item => {
      console.log(`${item.quantidade}x ${item.livro.titulo} - R$${item.livro.preco.toFixed(2)} cada`);
    });
    console.log(`Total: R$${this.calcularTotal().toFixed(2)}`);
  }
}

// Exemplo de uso
const carrinhoDoUsuario = new Carrinho();
carrinhoDoUsuario.adicionarItem(livro1, 2); // livro1 da classe Livro
carrinhoDoUsuario.mostrarItens();
carrinhoDoUsuario.removerItem(livro1.id);
carrinhoDoUsuario.mostrarItens();
