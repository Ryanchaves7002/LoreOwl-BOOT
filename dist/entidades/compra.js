class Compra{
    constructor(
        id,
        usuario,
        valorcompra,
        valortotal,
        datacompra,
        formadepagamento,
        status,
        endereco
    ){
        this.id = id;
        this.usuario = usuario;
        this.valorcompra = valorcompra;
        this.valortotal = valortotal;
        this.datacompra = datacompra;
        this.formadepagamento = formadepagamento;
        this.status = status || "em processamento";
        this.endereco = endereco;
    }
}