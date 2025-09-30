// ../js/main.js
import { LivrosRepo } from './entidades/livro.js';
import { CarrinhoService } from './services/CarrinhoService.js';

// Função para renderizar cards de livro
function renderizarLivros() {
  const container = document.getElementById('livros-container');
  container.innerHTML = '';

  const livros = LivrosRepo.listar(); // array de objetos Livro
  livros.forEach(l => {
    const card = document.createElement('div');
    card.className = 'card col-3 m-2 p-0';
    card.innerHTML = `
      <img src="${l.imagemCapa}" class="card-img-top" alt="${l.titulo}">
      <div class="card-body">
        <h5 class="card-title">${l.titulo}</h5>
        <p>R$${Number(l.preco).toFixed(2)}</p>
        <button class="btn-add btn btn-primary">Adicionar ao carrinho</button>
      </div>
    `;
    // evento do botão
    card.querySelector('.btn-add').addEventListener('click', () => {
      CarrinhoService.adicionarAoCarrinho(l.id, 1);
      alert(`${l.titulo} adicionado ao carrinho!`);
    });

    container.appendChild(card);
  });
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
  renderizarLivros();
});
