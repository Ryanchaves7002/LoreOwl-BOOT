// ======================
// Funções de carrinho
// ======================

// Salva carrinho no localStorage
function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Retorna carrinho atual
function pegarCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

// Mostra toast estilizado
function mostrarToast(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.innerText = mensagem;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 2500);
}

// Adiciona item ao carrinho
function adicionarAoCarrinho(titulo, preco) {
    const carrinho = pegarCarrinho();
    carrinho.push({ titulo, preco: parseFloat(preco.replace('R$', '').replace(',', '.')) });
    salvarCarrinho(carrinho);
    mostrarToast(`${titulo} adicionado ao carrinho!`);
    atualizarBadgeCarrinho();
}

// Remove item do carrinho
function removerDoCarrinho(index) {
    const carrinho = pegarCarrinho();
    const removido = carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    mostrarToast(`${removido[0].titulo} removido do carrinho!`);
    mostrarCarrinho();
    atualizarBadgeCarrinho();
}

// Mostra o carrinho na tela (em carrinho.html)
function mostrarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    if (!lista) return;

    const carrinho = pegarCarrinho();
    lista.innerHTML = '';

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between lh-condensed';
        li.innerHTML = `
            <div>
                <h6 class="my-0">${item.titulo}</h6>
            </div>
            <span class="text-muted">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
            <button class="btn btn-sm btn-danger ml-2" onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        lista.appendChild(li);
    });

    // Atualiza total
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    const totalEl = document.getElementById("total-carrinho");
    if (totalEl) totalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Atualiza badge do carrinho (se houver)
function atualizarBadgeCarrinho() {
    const badge = document.querySelector('.badge-cart-count');
    if (badge) badge.innerText = pegarCarrinho().length;
}

// Inicializa eventos de adicionar ao carrinho
function inicializarBotoes() {
    const botoes = document.querySelectorAll('.add-to-cart, .btn-brand');
    botoes.forEach(btn => {
        btn.addEventListener('click', () => {
            // Pega título e preço
            let card = btn.closest('.card, .product-main');
            if (!card) card = document; // fallback

            const titulo = card.querySelector(".card-title, #bookTitle")?.innerText || "Produto";
            const preco = card.querySelector(".preco, #bookPrice")?.innerText || "0";

            adicionarAoCarrinho(titulo, preco);
        });
    });
    
}


// ======================
// Toast custom CSS
// ======================
const style = document.createElement('style');
style.innerHTML = `
.toast-custom {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #7c3aed;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    opacity: 0;
    transform: translateY(20px);
    transition: 0.4s ease;
    z-index: 9999;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}
.toast-custom.show {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(style);

// ======================
// Inicialização
// ======================
document.addEventListener('DOMContentLoaded', () => {
    inicializarBotoes();
    mostrarCarrinho();
    atualizarBadgeCarrinho();
});

