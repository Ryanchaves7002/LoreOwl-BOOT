// ../js/services/CarrinhoService.js
import { CarrinhoRepo } from '../entidades/carrinho.js';
import { ItemCompra } from '../entidades/itemcompra.js';
import { LivrosRepo } from '../entidades/livro.js';

export const CarrinhoService = {
  adicionarAoCarrinho(livroId, quantidade = 1) {
    const livro = LivrosRepo.listar().find(l => l.id === Number(livroId));
    if (!livro) throw new Error('Livro não encontrado');

    const item = new ItemCompra(null, null, livro, quantidade);
    CarrinhoRepo.adicionar(item);
  },

  listar() {
    return CarrinhoRepo.listar();
  },

  limpar() {
    // implementar remoção por repo (pode criar método limpar no Repository)
  }
};
