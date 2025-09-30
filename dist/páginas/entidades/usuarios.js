import { Repository } from "./repositorio.js";
export const UsuariosRepo = new Repository("usuarios");



 export class Usuario {
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
//exemplo de uso
const novoUsuario = new Usuario(
  1,
  "12345678",
  "88999999999",
  "ryan@teste.com",
  "2005-05-10",
  "foto.jpg",
  new Date().toISOString(),
  "123.456.789-00",
  "leitor"
);
UsuariosRepo.adicionar(novoUsuario);
console.log(UsuariosRepo.listar());
