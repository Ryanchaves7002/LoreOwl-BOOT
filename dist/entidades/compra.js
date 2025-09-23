class Compra{
    constructor(
        idcompra,
        usuarioid,
        valorcompra,
        valortotal,
        datacompra,
        formadepagamento,
        status,
        enderecoid
    ){
        this.idcompra = idcompra;
        this.usuarioid = usuarioid;
        this.valorcompra = valorcompra;
        this.valortotal = valortotal;
        this.datacompra = datacompra;
        this.formadepagamento = formadepagamento;
        this.status = status || "em processamento";
        this.enderecoid = enderecoid;
    }
}