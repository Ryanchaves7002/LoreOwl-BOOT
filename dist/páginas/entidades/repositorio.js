// repository.js
export class Repository {
  constructor(chave) {
    this.chave = chave;
    this.dados = JSON.parse(localStorage.getItem(chave)) || [];
  }

  salvar() {
    localStorage.setItem(this.chave, JSON.stringify(this.dados));
  }

  listar() {
    return this.dados;
  }

  adicionar(item) {
    this.dados.push(item);
    this.salvar();
  }

  remover(id) {
    this.dados = this.dados.filter(el => el.id !== id);
    this.salvar();
  }

  atualizar(id, novoItem) {
    this.dados = this.dados.map(el => (el.id === id ? novoItem : el));
    this.salvar();
  }
}
