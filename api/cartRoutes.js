const { Router } = require('express');
const { getDatabase } = require('./database');
const { getAuthenticatedUser, getCartOwner } = require('./session');

const router = Router();

function formatCartItem(book, quantidade) {
  return {
    id: book.id,
    titulo: book.titulo,
    preco: book.preco,
    quantidade,
    img: book.imagem,
    author: book.autor,
    publisher: book.editora,
    year: book.ano,
    description: book.descricao
  };
}

async function getOwner(request, response, database) {
  const user = await getAuthenticatedUser(request, database);
  return getCartOwner(request, response, user);
}

router.get('/cart', async (request, response) => {
  const database = await getDatabase();
  const ownerId = await getOwner(request, response, database);
  const cart = await database.collection('carts').findOne({ ownerId });
  return response.json({ items: cart?.items || [] });
});

router.post('/cart/items', async (request, response) => {
  const bookId = String(request.body?.bookId || request.body?.id || '');
  const quantidade = Number(request.body?.quantidade || 1);
  if (!bookId || !Number.isInteger(quantidade) || quantidade < 1 || quantidade > 99) {
    return response.status(400).json({ error: 'Livro ou quantidade inválida.' });
  }

  const database = await getDatabase();
  const book = await database.collection('books').findOne({ id: bookId });
  if (!book) return response.status(404).json({ error: 'Livro não encontrado.' });

  const ownerId = await getOwner(request, response, database);
  const carts = database.collection('carts');
  const cart = await carts.findOne({ ownerId });
  const items = cart?.items || [];
  const existing = items.find(item => item.id === bookId);
  if (existing) existing.quantidade = Math.min(99, existing.quantidade + quantidade);
  else items.push(formatCartItem(book, quantidade));

  await carts.updateOne(
    { ownerId },
    { $set: { items, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
  return response.json({ items });
});

router.patch('/cart/items/:id', async (request, response) => {
  const quantidade = Number(request.body?.quantidade);
  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 99) {
    return response.status(400).json({ error: 'Quantidade inválida.' });
  }

  const database = await getDatabase();
  const ownerId = await getOwner(request, response, database);
  const cart = await database.collection('carts').findOne({ ownerId });
  const items = cart?.items || [];
  const item = items.find(entry => entry.id === request.params.id);
  if (!item) return response.status(404).json({ error: 'Item não encontrado no carrinho.' });
  item.quantidade = quantidade;
  await database.collection('carts').updateOne(
    { ownerId },
    { $set: { items, updatedAt: new Date() } }
  );
  return response.json({ items });
});

router.delete('/cart/items/:id', async (request, response) => {
  const database = await getDatabase();
  const ownerId = await getOwner(request, response, database);
  const cart = await database.collection('carts').findOne({ ownerId });
  const items = (cart?.items || []).filter(item => item.id !== request.params.id);
  await database.collection('carts').updateOne(
    { ownerId },
    { $set: { items, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
  return response.json({ items });
});

router.delete('/cart', async (request, response) => {
  const database = await getDatabase();
  const ownerId = await getOwner(request, response, database);
  await database.collection('carts').updateOne(
    { ownerId },
    { $set: { items: [], updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
  return response.json({ items: [] });
});

module.exports = router;