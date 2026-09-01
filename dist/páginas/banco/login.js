import { initDB, verifyUser, setSession } from './db.js';
import { sha256, on } from './utils.js';

initDB();

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

    const pwHash = await sha256(senhaDigitada);
    const user = verifyUser(em, pwHash);

    if (!user) {
      return alert('E-mail ou senha inválidos.');
    }

    setSession(user.id);
    alert(`Bem-vindo, ${user.nome}!`);
    window.location.href = './index.html';
  });
}