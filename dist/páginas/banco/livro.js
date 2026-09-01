function openBookPage(titulo, preco, author, img, publisher, year, description) {
  const params = new URLSearchParams({
    title: titulo,
    price: preco,
    author: author,
    img: img,
    publisher: publisher || 'Editora desconhecida',
    year: year || 'Ano desconhecido',
    description: description || 'Descrição não disponível'
  });

  localStorage.setItem('livroSelecionado', JSON.stringify({
    titulo,
    author,
    preco,
    img,
    publisher: publisher || 'Editora desconhecida',
    year: year || 'Ano desconhecido',
    description: description || 'Descrição não disponível'
  }));

  window.location.href = `./livro.html?${params.toString()}`;
}

const livros = document.querySelectorAll('.livro, .card-lore');
livros.forEach(livro => {
  const trigger = livro.querySelector('img') || livro;

  trigger.addEventListener('click', () => {
    const titulo = livro.querySelector('.titulo, .card-title')?.textContent?.trim() || 'Livro sem título';
    const author = livro.querySelector('.author')?.textContent?.trim() || 'Autor desconhecido';
    const preco = livro.querySelector('.preco')?.textContent?.trim() || '0.00';
    const img = livro.querySelector('img')?.getAttribute('src') || '';
    const publisher = livro.querySelector('.publisher')?.textContent?.trim() || 'Editora desconhecida';
    const year = livro.querySelector('.year')?.textContent?.trim() || 'Ano desconhecido';
    const description = livro.querySelector('.description')?.textContent?.trim() || 'Descrição não disponível';

    openBookPage(titulo, preco, author, img, publisher, year, description);
  });
});
