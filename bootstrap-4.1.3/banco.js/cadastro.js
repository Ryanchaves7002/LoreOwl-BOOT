import { initDB, createUser } from './db.js';
import { sha256, on } from './utils.js';

initDB();

const registerForm = document.getElementById('registerForm');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirmaSenha');
const termos = document.getElementById('termos');

on(registerForm, 'submit', async (e) => {
  e.preventDefault();

  const nomeValue = nome.value.trim();
  const emailValue = email.value.trim().toLowerCase();
  const senhaValue = senha.value;
  const confirmaSenhaValue = confirmaSenha.value;

  if (!nomeValue) return alert('Nome vazio, né campeão?');
  if (senhaValue !== confirmaSenhaValue) return alert('As senhas não batem.');
  if (senhaValue.length < 6) return alert('Bota uma senha com pelo menos 6 caracteres.');
  if (!termos.checked) return alert('Você precisa aceitar os termos!');

  const passHash = await sha256(senhaValue);

  try {
    createUser({ nome: nomeValue, email: emailValue, passHash });
    alert('Cadastrado com sucesso! Agora é só logar.');
    window.location.href = 'login.html';
  } catch (err) {
    alert(err.message || 'Erro ao cadastrar.');
  }
});
