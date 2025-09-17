class Endereco {
  constructor(
    rua, 
    numero, 
    complemento, 
    cidade, 
    estado, 
    cep, 
    pais,
    referencia) {
    this.rua = rua;
    this.numero = numero;
    this.complemento = complemento || "";
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.pais = pais || "Brasil";
    this.referencia = referencia || "";
  }

  
}
