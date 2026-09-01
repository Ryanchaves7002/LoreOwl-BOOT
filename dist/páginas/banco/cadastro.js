import { initDB, registerUser, setSession } from './db.js';
import { sha256, on } from './utils.js';

initDB();

const form = document.getElementById('registerForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmaSenhaInput = document.getElementById('confirmaSenha');
const termosInput = document.getElementById('termos');
const fotoInput = document.getElementById('fotoPerfil');
const fotoPreview = document.getElementById('fotoPreview');

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    reader.readAsDataURL(file);
  });
}

if (fotoInput && fotoPreview) {
  fotoInput.addEventListener('change', async () => {
    const file = fotoInput.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Selecione uma imagem válida para foto de perfil.');
      return;
    }

    try {
      const base64 = await readFileAsDataUrl(file);
      fotoPreview.src = base64;
      fotoPreview.dataset.avatar = base64;
    } catch (error) {
      alert(error.message);
    }
  });
}

if (form && nomeInput && emailInput && senhaInput && confirmaSenhaInput && termosInput) {
  on(form, 'submit', async (event) => {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmaSenha = confirmaSenhaInput.value;

    if (!nome || !email || !senha || !confirmaSenha) {
      return alert('Preencha todos os campos antes de continuar.');
    }

    if (senha.length < 6) {
      return alert('A senha deve ter pelo menos 6 caracteres.');
    }

    if (senha !== confirmaSenha) {
      return alert('As senhas não coincidem.');
    }

    if (!termosInput.checked) {
      return alert('Você precisa aceitar os termos de uso.');
    }

    try {
      const passHash = await sha256(senha);
      const foto = fotoPreview?.dataset.avatar || null;
      const user = registerUser({ nome, email, passHash, foto });
      setSession(user.id);
      alert(`Conta criada com sucesso, bem-vindo(a), ${user.nome}!`);
      window.location.href = './index.html';
    } catch (error) {
      alert(error.message || 'Não foi possível criar a conta.');
    }
  });
}
