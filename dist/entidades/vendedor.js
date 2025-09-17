class Vendedor{
    constructor(
        id,
        usuarioId,
        cnpj,
        inscricaoestadual,
        nomedaloja,
        descricao,
        telefone,
        email,
        endereco,
        valordoproduto,
        fretegratis,
        formadepagamento,
        tipoDeLoja,
        status
    ){
        this.id = id;
        this.usuarioId = usuarioId;
        this.cnpj = cnpj;
        this.inscricaoestadual = inscricaoestadual;
        this.nomedaloja = nomedaloja;
        this.descricao = descricao;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
        this.valordoproduto = valordoproduto || 0;
        this.fretegratis = fretegratis || false;
        this.formadepagamento = formadepagamento || [];
        this.tipoDeLoja = tipoDeLoja || "física";
        this.status = status || "pendente";
    }
}