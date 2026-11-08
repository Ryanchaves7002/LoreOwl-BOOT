import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from '../banco/api.js';

export const CarrinhoService = {
  listar() {
    return getCart();
  },

  adicionarAoCarrinho(item, quantidade = 1) {
    return addToCart(item.id, quantidade);
  },

  removerDoCarrinho(itemId) {
    return removeFromCart(itemId);
  },

  limpar() {
    return clearCart();
  },

  total() {
    return getCart().then(items => items.reduce((total, item) => total + (item.preco * item.quantidade), 0));
  },

  atualizarQuantidade(itemId, quantidade) {
    return updateCartItem(itemId, quantidade);
  }
};
