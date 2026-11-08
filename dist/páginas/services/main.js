import { CarrinhoService } from './CarrinhoService.js';

function configurarBotaoCarrinho(botao) {
  if (!botao) return;

  botao.addEventListener('click', async () => {
    const card = botao.closest('.card, .card-lore') || botao.closest('.col-md-4');
    const bookId = card?.dataset.bookId || card?.querySelector('[data-book-id]')?.dataset.bookId;
    if (!bookId) return alert('Não foi possível identificar este livro.');

    botao.disabled = true;
    try {
      await CarrinhoService.adicionarAoCarrinho({ id: bookId }, 1);
    } catch (error) {
      alert(error.message);
      botao.disabled = false;
      return;
    }

    const textoOriginal = botao.textContent;
    botao.textContent = 'Adicionado!';

    setTimeout(() => {
      botao.textContent = textoOriginal;
      botao.disabled = false;
    }, 1500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(configurarBotaoCarrinho);
});
