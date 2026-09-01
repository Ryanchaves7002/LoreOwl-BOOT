import { CarrinhoService } from './CarrinhoService.js';

function extrairPreco(valor) {
  if (!valor) return 0;
  const numero = Number(String(valor).replace(/[R$\s.]/g, '').replace(',', '.'));
  return Number.isFinite(numero) ? numero : 0;
}

function configurarBotaoCarrinho(botao) {
  if (!botao) return;

  botao.addEventListener('click', () => {
    const card = botao.closest('.card, .card-lore') || botao.closest('.col-md-4');
    const tituloElement = card?.querySelector('.card-title');
    const precoElement = card?.querySelector('.preco');
    const imagemElement = card?.querySelector('.card-img-top');

    const item = {
      id: String(tituloElement?.textContent || 'livro-' + Date.now()),
      titulo: tituloElement?.textContent?.trim() || 'Livro',
      preco: extrairPreco(precoElement?.textContent),
      img: imagemElement?.getAttribute('src') || '',
      quantidade: 1
    };

    CarrinhoService.adicionarAoCarrinho(item, 1);

    const textoOriginal = botao.textContent;
    botao.textContent = 'Adicionado!';
    botao.disabled = true;

    setTimeout(() => {
      botao.textContent = textoOriginal;
      botao.disabled = false;
    }, 1500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(configurarBotaoCarrinho);
});
