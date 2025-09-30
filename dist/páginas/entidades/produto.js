import { Repository } from "./repositorio.js";

// Repositório específico de produtos
export const ProdutoRepo = new Repository("produtos");

export class Produto {
  constructor(
    tituloid,
    author,
    preco,
    desconto,
    imagemprincipal,
    imagemsecundaria,
    anopublicacao,
    editora,
    idioma,
    numeropaginas,
    genero,
    isbn,
    formato,
    peso,
    dimensoes,
    descricao,
    sinopse,
    estoque,
    edicao,
    banner1,
    banner2,
    destaque,
    avaliacao
  ) {
    this.tituloid = tituloid || Date.now();  // gera id automático
    this.author = author;
    this.preco = preco;
    this.desconto = desconto || 0;
    this.imagemprincipal = imagemprincipal;
    this.imagemsecundaria = imagemsecundaria || "";
    this.anopublicacao = anopublicacao;
    this.editora = editora;
    this.idioma = idioma;
    this.numeropaginas = numeropaginas;
    this.genero = genero;
    this.isbn = isbn;
    this.formato = formato || "";
    this.peso = peso || "";
    this.dimensoes = dimensoes || "";
    this.descricao = descricao || "";
    this.sinopse = sinopse || "";
    this.estoque = estoque || 0;
    this.edicao = edicao || "";
    this.banner1 = banner1 || "";
    this.banner2 = banner2 || "";
    this.destaque = destaque || false;
    this.avaliacao = avaliacao || 0;  // nota padrão
  }
}
