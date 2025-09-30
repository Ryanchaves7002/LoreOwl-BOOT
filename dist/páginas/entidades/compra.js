import { Repository } from "./repositorio.js";
export const ComprasRepo = new Repository("compras");

export class Compra {
  constructor(
    idcompra,
    usuarioid,
    valorcompra,
    valortotal,
    formadepagamento,
    enderecoid,
    status
  ) {
    this.idcompra = idcompra || Date.now(); 
    this.usuarioid = usuarioid;
    this.valorcompra = valorcompra;
    this.valortotal = valortotal;
    this.datacompra = new Date().toISOString(); 
    this.formadepagamento = formadepagamento;
    this.status = status || "em processamento";
    this.enderecoid = enderecoid;
  }
}
