import { Repository } from "./repositorio.js";

// Repositório específico de vendedores
export const VendedoresRepo = new Repository("vendedores");

export class Vendedor {
  constructor(
    idvendedor,
    usuarioId,
    cnpj,
    inscricaoestadual,
    nomedaloja,
    descricao,
    telefone,
    email,
    enderecoid,
    valordoproduto,
    fretegratis,
    formadepagamento,   
    tipoDeLoja,
    status
  ) {
    this.idvendedor = idvendedor || Date.now(); // gera id automático
    this.usuarioId = usuarioId;
    this.cnpj = cnpj;
    this.inscricaoestadual = inscricaoestadual;
    this.nomedaloja = nomedaloja;
    this.descricao = descricao;
    this.telefone = telefone;
    this.email = email;
    this.enderecoid = enderecoid;
    this.valordoproduto = valordoproduto || 0;
    this.fretegratis = fretegratis || false;
    this.formadepagamento = formadepagamento || [];
    this.tipoDeLoja = tipoDeLoja || "física";
    this.status = status || "pendente";
  }
}
