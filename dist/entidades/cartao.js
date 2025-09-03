class Cartao {
  constructor(id, numero, titular, validade, cvv, bandeira, usuarioId) {
    this.id = id;                // chave primária
    this.numero = numero;        // número do cartão
    this.titular = titular;      // nome do dono do cartão
    this.validade = validade;    // MM/AA
    this.cvv = cvv;              // código de segurança
    this.bandeira = bandeira;    // Visa, Mastercard etc.
    this.usuarioId = usuarioId;  // chave estrangeira -> Usuario.id
  }

  estaValido() {
    const [mes, ano] = this.validade.split("/").map(Number);
    const agora = new Date();
    const anoAtual = agora.getFullYear() % 100;
    const mesAtual = agora.getMonth() + 1;
    return ano > anoAtual || (ano === anoAtual && mes >= mesAtual);
  }

  resumo() {
    const ultimos4 = this.numero.slice(-4);
    return `${this.bandeira} - **** **** **** ${ultimos4} (Titular: ${this.titular})`;
  }
}
