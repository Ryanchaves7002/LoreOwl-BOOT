class Endereco {
  constructor(rua, numero, complemento, cidade, estado, cep, pais) {
    this.rua = rua;
    this.numero = numero;
    this.complemento = complemento || "";
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.pais = pais || "Brasil";
  }

  // Mostrar endereço completo
  mostrarEndereco() {
    return `${this.rua}, ${this.numero} ${this.complemento} - ${this.cidade}, ${this.estado}, ${this.cep} - ${this.pais}`;
  }
}
