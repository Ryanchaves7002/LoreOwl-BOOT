import { Repository } from "./repositorio.js";

// Repositório específico de endereços
export const EnderecosRepo = new Repository("enderecos");

export class Endereco {
  constructor(
    idendereco,
    rua, 
    numero, 
    complemento, 
    cidade, 
    estado, 
    cep, 
    pais,
    referencia
  ) {
    this.idendereco = idendereco || Date.now(); // gera id se não passar
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
