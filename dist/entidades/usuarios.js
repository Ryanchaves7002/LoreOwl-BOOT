class Usuario {
  constructor( 
    usuarioId,
    senha,
    telefone,
    email,
    datadenascimento,
    fotodeperfil,
    datacadastro,
    documentodousuario,
    tipodeusuario
    ) {              
    this.usuarioId = usuarioId;  
    this.senha =senha;
    this.telefone = telefone;    
    this.email = email;
    this.datadenascimento = datadenascimento;
    this.fotodeperfil = fotodeperfil; 
    this.datacadastro = datacadastro; 
    this.documentodousuario = documentodousuario;
    this.tipodeusuario = tipodeusuario
    this.status = "pendente";
  }
}
