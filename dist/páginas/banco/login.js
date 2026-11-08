import { loginUser } from './db.js';
import { on } from './utils.js';

const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

if (loginForm && email && senha) {
  on(loginForm, 'submit', async (e) => {
    e.preventDefault();

    const em = email.value.trim().toLowerCase();
    const senhaDigitada = senha.value;

    if (!em || !senhaDigitada) {
      return alert('Preencha e-mail e senha para continuar.');
    }

    try {
      const user = await loginUser({ email: em, senha: senhaDigitada });
      alert(`Bem-vindo, ${user.nome}!`);
      window.location.href = './index.html';
    } catch (error) {
      alert(error.message || 'Não foi possível entrar. Verifique a conexão e tente novamente.');
    }
  });
}