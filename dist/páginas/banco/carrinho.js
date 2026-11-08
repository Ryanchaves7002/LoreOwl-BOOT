import { getCart, removeFromCart } from './api.js';

const lista = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const badgeCarrinho = document.querySelector('.badge-secondary.badge-pill');

function escapeHtml(value) {
	return String(value ?? '').replace(/[&<>"']/g, character => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	})[character]);
}

function formatarMoeda(valor) {
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(valor || 0));
}

function renderizarItem(item) {
	const quantidade = Number(item.quantidade || 1);
	const preco = Number(item.preco || 0);
	return `
		<li class="list-group-item d-flex justify-content-between align-items-center lh-condensed">
			<div>
				<h6 class="my-0">${escapeHtml(item.titulo)}</h6>
				<small class="text-muted">Qtd: ${quantidade}</small>
			</div>
			<div class="text-right">
				<span class="text-muted d-block">${formatarMoeda(preco * quantidade)}</span>
				<button class="btn btn-sm btn-danger mt-2 remover-btn" data-id="${escapeHtml(item.id)}" type="button">
					Remover
				</button>
			</div>
		</li>
	`;
}

async function renderizarCarrinho() {
	if (!lista) return;
	lista.innerHTML = '<li class="list-group-item">Carregando carrinho...</li>';

	try {
		const items = await getCart();
		const total = items.reduce((sum, item) => sum + (Number(item.preco || 0) * Number(item.quantidade || 1)), 0);
		const quantidadeTotal = items.reduce((sum, item) => sum + Number(item.quantidade || 1), 0);

		lista.innerHTML = items.length
			? items.map(renderizarItem).join('')
			: '<li class="list-group-item">Seu carrinho está vazio.</li>';
		if (totalCarrinho) totalCarrinho.textContent = formatarMoeda(total);
		if (badgeCarrinho) badgeCarrinho.textContent = String(quantidadeTotal);

		lista.querySelectorAll('.remover-btn').forEach(button => {
			button.addEventListener('click', async () => {
				button.disabled = true;
				try {
					await removeFromCart(button.dataset.id);
					await renderizarCarrinho();
				} catch (error) {
					button.disabled = false;
					alert(error.message);
				}
			});
		});
	} catch (error) {
		lista.innerHTML = `<li class="list-group-item text-danger">${escapeHtml(error.message)}</li>`;
	}
}

renderizarCarrinho();
