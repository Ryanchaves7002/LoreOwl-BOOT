export const livrosCatalogo = [
  {
    id: 1,
    titulo: 'A Guerra dos Tronos',
    autor: 'George R. R. Martin',
    genero: 'Fantasia',
    preco: 79.9,
    imagem: './img/bcd05ed6-c44d-4e3f-953d-ee479c993aa3.png',
    editora: 'HarperCollins',
    ano: 1996,
    descricao: 'Uma trama épica de poder, traições e mistérios em um mundo de reinos em conflito.',
    tag: 'Fantasia épica'
  },
  {
    id: 2,
    titulo: 'O Hobbit',
    autor: 'J. R. R. Tolkien',
    genero: 'Aventura',
    preco: 49.9,
    imagem: './img/assets_task_01jxg11vxsetvscb452b0at8zd_1749663486_img_3.webp',
    editora: 'HarperCollins',
    ano: 1937,
    descricao: 'Bilbo Bolseiro embarca numa jornada inesperada ao lado de um grupo de anões.',
    tag: 'Aventura fantástica'
  },
  {
    id: 3,
    titulo: 'Orgulho e Preconceito',
    autor: 'Jane Austen',
    genero: 'Romance',
    preco: 39.9,
    imagem: './img/assets_task_01jxms2q6aegm8hd2xfzhm9x3r_1749822857_img_3.webp',
    editora: 'Penguin',
    ano: 1813,
    descricao: 'Uma história clássica de amor, orgulho, mal-entendidos e crescimento emocional.',
    tag: 'Clássico romântico'
  },
  {
    id: 4,
    titulo: 'It: A Coisa',
    autor: 'Stephen King',
    genero: 'Terror',
    preco: 64.9,
    imagem: './img/coruja.1.png',
    editora: 'Scribner',
    ano: 1986,
    descricao: 'Uma criatura ancestral espreita em Derry, trazendo medo e segredos para uma cidade inteira.',
    tag: 'Suspense sobrenatural'
  },
  {
    id: 5,
    titulo: 'A Vida de Pi',
    autor: 'Yann Martel',
    genero: 'Drama',
    preco: 52.9,
    imagem: './img/bcd05ed6-c44d-4e3f-953d-ee479c993aa3.png',
    editora: 'Editora Companhia das Letras',
    ano: 2001,
    descricao: 'Uma história intensa sobre sobrevivência, fé, razão e as profundezas relações humanas.',
    tag: 'Drama filosófico'
  },
  {
    id: 6,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    genero: 'Drama',
    preco: 42.5,
    imagem: './img/assets_task_01jxms2q6aegm8hd2xfzhm9x3r_1749822857_img_3.webp',
    editora: 'Brito',
    ano: 1899,
    descricao: 'Um clássico da literatura brasileira sobre dúvida, ciúme e memória.',
    tag: 'Literatura nacional'
  },
  {
    id: 7,
    titulo: 'A Pequena Sereia',
    autor: 'Hans Christian Andersen',
    genero: 'Fantasia',
    preco: 31.5,
    imagem: './img/assets_task_01jxg11vxsetvscb452b0at8zd_1749663486_img_3.webp',
    editora: 'Caminho Editorial',
    ano: 1837,
    descricao: 'Uma narrativa encantadora sobre amor, sacrifício e sonhos impossíveis.',
    tag: 'Conto clássico'
  },
  {
    id: 8,
    titulo: 'A Menina que Roubava Livros',
    autor: 'Markus Zusak',
    genero: 'Drama',
    preco: 58.4,
    imagem: './img/coruja.1.png',
    editora: 'Intrínseca',
    ano: 2005,
    descricao: 'Uma história profunda sobre literatura, coragem e a força da humanidade em tempos sombrios.',
    tag: 'Drama histórico'
  },
  {
    id: 9,
    titulo: 'Harry Potter e a Pedra Filosofal',
    autor: 'J. K. Rowling',
    genero: 'Fantasia',
    preco: 69.9,
    imagem: './img/bcd05ed6-c44d-4e3f-953d-ee479c993aa3.png',
    editora: 'Rocco',
    ano: 1997,
    descricao: 'Uma jornada mágica para um mundo encantado, cheio de mistério e amizade.',
    tag: 'Fantasia juvenil'
  },
  {
    id: 10,
    titulo: 'O Nome do Vento',
    autor: 'Patrick Rothfuss',
    genero: 'Fantasia',
    preco: 88.2,
    imagem: './img/assets_task_01jxg11vxsetvscb452b0at8zd_1749663486_img_3.webp',
    editora: 'Suma',
    ano: 2007,
    descricao: 'Uma narrativa lírica sobre talento, fama, magia e a busca por um passado esquecido.',
    tag: 'Fantasia contemporânea'
  },
  {
    id: 11,
    titulo: 'A Metamorfose',
    autor: 'Franz Kafka',
    genero: 'Drama',
    preco: 34.9,
    imagem: './img/coruja.1.png',
    editora: 'Editora 34',
    ano: 1915,
    descricao: 'Um relato inquietante sobre transformação, isolamento e desconforto existencial.',
    tag: 'Clássico moderno'
  },
  {
    id: 12,
    titulo: 'O Alquimista',
    autor: 'Paulo Coelho',
    genero: 'Aventura',
    preco: 45.5,
    imagem: './img/assets_task_01jxms2q6aegm8hd2xfzhm9x3r_1749822857_img_3.webp',
    editora: 'Paralela',
    ano: 1988,
    descricao: 'Uma jornada espiritual e pessoal em busca de um sonho e de si mesmo.',
    tag: 'Fábula espiritual'
  }
];

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
