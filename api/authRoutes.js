const { Router } = require('express');
const { getDatabase } = require('./database');
const { clearSessionCookie, hashPassword, verifyPassword } = require('./security');
const {
  getAuthenticatedUser,
  mergeGuestCart,
  removeSession,
  startSession
} = require('./session');

const router = Router();

function publicUser(user) {
  return {
    id: user._id.toString(),
    nome: user.nome,
    email: user.email,
    foto: user.foto || null
  };
}

router.post('/auth/register', async (request, response) => {
  const nome = String(request.body?.nome || '').trim();
  const email = String(request.body?.email || '').trim().toLowerCase();
  const senha = String(request.body?.senha || '');
  const foto = request.body?.foto || null;

  if (!nome || nome.length > 80 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return response.status(400).json({ error: 'Informe nome e e-mail válidos.' });
  }
  if (senha.length < 6 || senha.length > 128) {
    return response.status(400).json({ error: 'A senha deve ter entre 6 e 128 caracteres.' });
  }
  if (foto && (typeof foto !== 'string' || foto.length > 2_500_000 || !foto.startsWith('data:image/'))) {
    return response.status(400).json({ error: 'A imagem de perfil é inválida ou muito grande.' });
  }

  const database = await getDatabase();
  const user = {
    nome,
    email,
    passwordHash: await hashPassword(senha),
    foto,
    createdAt: new Date()
  };

  try {
    const result = await database.collection('users').insertOne(user);
    user._id = result.insertedId;
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json({ error: 'Este e-mail já está cadastrado.' });
    }
    throw error;
  }

  await startSession(response, database, user);
  await mergeGuestCart(request, database, user);
  return response.status(201).json({ user: publicUser(user) });
});

router.post('/auth/login', async (request, response) => {
  const email = String(request.body?.email || '').trim().toLowerCase();
  const senha = String(request.body?.senha || '');
  const database = await getDatabase();
  const user = await database.collection('users').findOne({ email });

  if (!user || !(await verifyPassword(senha, user.passwordHash))) {
    return response.status(401).json({ error: 'E-mail ou senha inválidos.' });
  }

  await startSession(response, database, user);
  await mergeGuestCart(request, database, user);
  return response.json({ user: publicUser(user) });
});

router.get('/auth/me', async (request, response) => {
  const database = await getDatabase();
  const user = await getAuthenticatedUser(request, database);
  return response.json({ user: user ? publicUser(user) : null });
});

router.post('/auth/logout', async (request, response) => {
  const database = await getDatabase();
  await removeSession(request, database);
  clearSessionCookie(response);
  return response.json({ ok: true });
});

module.exports = router;