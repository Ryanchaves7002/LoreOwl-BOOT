import { clearSession, getCurrentUser } from './db.js';

function buildDefaultAvatar(name = 'Usuário') {
  const initials = (name || 'U').trim().charAt(0).toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="32" fill="#7c3aed"/>
      <circle cx="32" cy="24" r="13" fill="#ffffff" opacity="0.9"/>
      <path d="M18 52c3-9 12-14 14-14s11 5 14 14" fill="#ffffff" opacity="0.9"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function renderUserHeader() {
  const user = getCurrentUser();
  const guestLinks = document.getElementById('guest-links');
  const userProfile = document.getElementById('user-profile');
  const profileName = document.getElementById('profile-name');
  const profileAvatar = document.getElementById('profile-avatar');
  const logoutButton = document.getElementById('logout-button');

  if (!guestLinks || !userProfile) return;

  if (!user) {
    guestLinks.classList.remove('d-none');
    guestLinks.classList.add('d-flex');
    userProfile.classList.add('d-none');
    userProfile.classList.remove('d-flex');
    return;
  }

  guestLinks.classList.add('d-none');
  guestLinks.classList.remove('d-flex');
  userProfile.classList.remove('d-none');
  userProfile.classList.add('d-flex');

  if (profileAvatar) {
    profileAvatar.src = user.foto || buildDefaultAvatar(user.nome);
    profileAvatar.alt = `Foto de ${user.nome}`;
  }

  if (profileName) {
    profileName.textContent = user.nome || 'Usuário';
  }

  if (logoutButton) {
    logoutButton.onclick = () => {
      clearSession();
      window.location.href = './index.html';
    };
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderUserHeader);
} else {
  renderUserHeader();
}
