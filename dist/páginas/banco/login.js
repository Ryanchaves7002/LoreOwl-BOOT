import { initDB, verifyUser, setSession } from './db.js';
import { sha256, on } from './utils.js';

initDB();

const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

on(loginForm, 'submit', async (e) => {
  e.preventDefault();
  const em = email.value.trim().toLowerCase();
  const pwHash = await sha256(senha.value);

  const user = await verifyUser(em, pwHash);
  if (!user) return alert('E-mail ou senha inválidos.');

  setSession(user.id);
  alert(`Bem-vindo, ${user.name}!`);
  window.location.href = './carrinho.html';
});