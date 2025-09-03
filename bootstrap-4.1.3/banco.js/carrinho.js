import {
  initDB, requireAuthOrRedirect, getCart,
  addToCart, updateQty, removeFromCart, clearCart,
  getSession, clearSession
} from './db.js';
import { moneyBRL, on } from './utils.js';

initDB();

const session = requireAuthOrRedirect('./login.html');
if (!session) throw new Error('Sem sessão. Redirecionando...');

const userId = session.userId;

// Produtos de exemplo (num real você buscaria do servidor ou teria um catalogo)
const produtos = [
  { id: 'p1', title: 'Livro A', price: 39.9 },
  { id: 'p2', title: 'Livro B', price: 49.9 },
  { id: 'p3', title: 'Livro C', price: 29.9 },
];

const divProdutos = document.getElementById('produtos');
const divCarrinho = document.getElementById('carrinho');
const totalEl = document.getElementById('total');
const btnFinalizar = document.getElementById('finalizar');
const btnLogout = document.getElementById('logout');

function renderProdutos() {
  divProdutos.innerHTML = produtos.map(p => `
    <div class="produto">
      <strong>${p.title}</strong> — ${moneyBRL(p.price)}
      <button data-add="${p.id}">Adicionar</button>
    </div>
  `).join('');
}

function calcularTotal(cart) {
  return cart.reduce((acc, it) => acc + it.price * it.qty, 0);
}

function renderCarrinho() {
  const cart = getCart(userId);
  if (cart.length === 0) {
    divCarrinho.innerHTML = '<em>Seu carrinho está vazio.</em>';
    totalEl.textContent = '';
    return;
  }
  divCarrinho.innerHTML = cart.map(it => `
    <div class="item">
      <span>${it.title} — ${moneyBRL(it.price)}</span>
      <label>Qtd:
        <input type="number" min="1" data-qty="${it.id}" value="${it.qty}">
      </label>
      <button data-del="${it.id}">Remover</button>
    </div>
  `).join('');

  const total = calcularTotal(cart);
  totalEl.textContent = 'Total: ' + moneyBRL(total);
}

on(divProdutos, 'click', (e) => {
  const id = e.target?.dataset?.add;
  if (!id) return;
  const p = produtos.find(x => x.id === id);
  addToCart(userId, { id: p.id, title: p.title, price: p.price, qty: 1 });
  renderCarrinho();
});

on(divCarrinho, 'input', (e) => {
  const id = e.target?.dataset?.qty;
  if (!id) return;
  const qty = parseInt(e.target.value, 10) || 1;
  updateQty(userId, id, qty);
  renderCarrinho();
});

on(divCarrinho, 'click', (e) => {
  const id = e.target?.dataset?.del;
  if (!id) return;
  removeFromCart(userId, id);
  renderCarrinho();
});

on(btnFinalizar, 'click', () => {
  const cart = getCart(userId);
  if (cart.length === 0) return alert('Carrinho vazio.');
  alert('Compra finalizada! (mock) Limpando carrinho...');
  clearCart(userId);
  renderCarrinho();
});

on(btnLogout, 'click', () => {
  clearSession();
  window.location.href = 'login.html';
});

renderProdutos();
renderCarrinho();