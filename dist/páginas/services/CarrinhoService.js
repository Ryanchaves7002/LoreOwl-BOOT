const CARRINHO_KEY = 'carrinho';

function parsePreco(valor) {
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : 0;
  if (typeof valor === 'string') {
    const numero = Number(valor.replace(/[R$\s.]/g, '').replace(',', '.'));
    return Number.isFinite(numero) ? numero : 0;
  }
  return 0;
}

function normalizarItem(item = {}, quantidadePadrao = 1) {
  const quantidade = Number(item.quantidade ?? quantidadePadrao ?? 1);

  return {
    id: String(item.id ?? item.livroId ?? item.titulo ?? `item-${Date.now()}-${Math.random()}`),
    titulo: String(item.titulo ?? item.nome ?? 'Livro sem título'),
    preco: parsePreco(item.preco ?? item.precoUnitario ?? 0),
    quantidade: Number.isFinite(quantidade) && quantidade > 0 ? quantidade : 1,
    img: item.img || '',
    author: item.author || '',
    publisher: item.publisher || '',
    year: item.year || '',
    description: item.description || ''
  };
}

function obterCarrinho() {
  try {
    const itens = JSON.parse(localStorage.getItem(CARRINHO_KEY) || '[]');
    return Array.isArray(itens) ? itens.map(item => normalizarItem(item)) : [];
  } catch (error) {
    console.warn('Carrinho inválido, resetando.', error);
    localStorage.setItem(CARRINHO_KEY, JSON.stringify([]));
    return [];
  }
}

function salvarCarrinho(carrinho) {
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
}

export const CarrinhoService = {
  listar() {
    return obterCarrinho();
  },

  adicionarAoCarrinho(item, quantidade = 1) {
    const carrinho = obterCarrinho();
    const produto = normalizarItem(item, quantidade);
    const indice = carrinho.findIndex(i => String(i.id) === String(produto.id));

    if (indice >= 0) {
      carrinho[indice].quantidade += produto.quantidade;
    } else {
      carrinho.push(produto);
    }

    salvarCarrinho(carrinho);
    return carrinho;
  },

  removerDoCarrinho(itemId) {
    const carrinho = obterCarrinho().filter(item => String(item.id) !== String(itemId));
    salvarCarrinho(carrinho);
    return carrinho;
  },

  limpar() {
    salvarCarrinho([]);
    return [];
  },

  total() {
    return obterCarrinho().reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }
};
