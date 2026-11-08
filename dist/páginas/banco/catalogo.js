export let livrosCatalogo = [];
export let catalogoErro = null;

try {
  const response = await fetch('/api/livros');
  if (!response.ok) throw new Error('Não foi possível carregar o catálogo.');
  const payload = await response.json();
  livrosCatalogo = Array.isArray(payload.books) ? payload.books : [];
} catch (error) {
  catalogoErro = error;
}

export function normalizarTexto(valor = '') {
  return String(valor).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

export function buscarLivros(consulta = '', genero = 'Todos') {
  const termo = normalizarTexto(consulta);
  const filtroGenero = genero && genero !== 'Todos' ? normalizarTexto(genero) : '';

  return livrosCatalogo.filter((livro) => {
    const emGenero = !filtroGenero || normalizarTexto(livro.genero).includes(filtroGenero);
    if (!termo) return emGenero;

    const campos = [
      livro.titulo,
      livro.autor,
      livro.genero,
      livro.tag,
      livro.descricao,
      livro.editora
    ];

    const coincide = campos.some((campo) => normalizarTexto(campo).includes(termo));
    return emGenero && coincide;
  });
}

export function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(valor || 0));
}

export function montarLivroParaDetalhes(livro) {
  return {
    id: livro.id,
    titulo: livro.titulo,
    author: livro.autor,
    preco: String(livro.preco),
    img: livro.imagem,
    publisher: livro.editora,
    year: String(livro.ano),
    description: livro.descricao,
    genero: livro.genero,
    tag: livro.tag
  };
}
