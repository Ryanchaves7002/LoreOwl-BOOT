
import { Repository } from "./repositorio.js";
export const CarrinhoRepo = new Repository("carrinho");
// Classe Carrinho
 export class Carrinho {
  constructor() {
    this.iditens = []; // vai guardar objetos {livro, quantidade}
  }

  // Adicionar livro ao carrinho
  adicionarItem(livro, quantidade = 1) {
    // Checa se o livro já está no carrinho
    const itemExistente = this.iditens.find(item => item.livro.id === livro.id);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.iditens.push({ livro, quantidade });
    }
    console.log(`${quantidade}x ${livro.titulo} adicionado ao carrinho.`);
  }

  // Remover livro do carrinho
  removerItem(livroId) {
    this.iditens = this.itens.filter(item => item.livro.id !== livroId);
    console.log(`Livro removido do carrinho.`);
  }

  // Calcular total
  calcularTotal() {
    return this.iditens.reduce((total, item) => total + item.livro.preco * item.quantidade, 0);
  }

  // Limpar carrinho
  limparCarrinho() {
    this.iditens = [];
    console.log("Carrinho limpo.");
  }

  // Mostrar itens do carrinho
  mostrarItens() {
    console.log("Itens no carrinho:");
    this.iditens.forEach(item => {
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
