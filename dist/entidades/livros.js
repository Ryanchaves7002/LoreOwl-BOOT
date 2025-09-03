// Classe Livro
class Livro {
  constructor(id, titulo, autor, sinopse, preco, genero, anoPublicacao, editora, idioma, isbn, estoque, imagemCapa, linkPDF, destaque) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.sinopse = sinopse;
    this.preco = preco;
    this.genero = genero;
    this.anoPublicacao = anoPublicacao;
    this.editora = editora;
    this.idioma = idioma;
    this.isbn = isbn;
    this.estoque = estoque;
    this.imagemCapa = imagemCapa;
    this.linkPDF = linkPDF;
    this.destaque = destaque;
    this.avaliacoes = []; // inicializa vazio, depois você pode adicionar avaliações
  }


}


