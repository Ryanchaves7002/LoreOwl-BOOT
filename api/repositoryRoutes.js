const crypto = require('node:crypto');
const { Router } = require('express');
const { getDatabase } = require('./database');
const { getAuthenticatedUser } = require('./session');

const router = Router();
const allowedCollections = new Set([
  'carrinho', 'cartoes', 'compras', 'documentosUsuario', 'enderecos', 'itensCompra',
  'itens', 'livros', 'opinioes', 'produtos', 'transacoes', 'usuarios', 'vendedores'
]);

async function getOwner(request, response) {
  const database = await getDatabase();
  const user = await getAuthenticatedUser(request, database);
  if (!user) {
    response.status(401).json({ error: 'Entre na sua conta para acessar estes dados.' });
    return null;
  }
  return { database, ownerId: user._id.toString() };
}

function validCollection(request, response) {
  if (allowedCollections.has(request.params.collection)) return true;
  response.status(404).json({ error: 'Coleção não encontrada.' });
  return false;
}

router.get('/data/:collection', async (request, response) => {
  if (!validCollection(request, response)) return;
  const owner = await getOwner(request, response);
  if (!owner) return;

  const records = await owner.database.collection('repositoryData')
    .find({ ownerId: owner.ownerId, collectionName: request.params.collection })
    .sort({ createdAt: 1 })
    .toArray();
  return response.json({ items: records.map(record => record.value) });
});

router.post('/data/:collection', async (request, response) => {
  if (!validCollection(request, response)) return;
  const owner = await getOwner(request, response);
  if (!owner) return;

  const item = request.body?.item;
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return response.status(400).json({ error: 'O item enviado é inválido.' });
  }
  const itemId = String(item.id || crypto.randomUUID());
  const value = { ...item, id: itemId };
  await owner.database.collection('repositoryData').updateOne(
    { ownerId: owner.ownerId, collectionName: request.params.collection, itemId },
    { $set: { value, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
  return response.status(201).json({ item: value });
});

router.put('/data/:collection/:id', async (request, response) => {
  if (!validCollection(request, response)) return;
  const owner = await getOwner(request, response);
  if (!owner) return;

  const item = request.body?.item;
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return response.status(400).json({ error: 'O item enviado é inválido.' });
  }
  const value = { ...item, id: request.params.id };
  const result = await owner.database.collection('repositoryData').updateOne(
    { ownerId: owner.ownerId, collectionName: request.params.collection, itemId: request.params.id },
    { $set: { value, updatedAt: new Date() } }
  );
  if (!result.matchedCount) return response.status(404).json({ error: 'Item não encontrado.' });
  return response.json({ item: value });
});

router.delete('/data/:collection/:id', async (request, response) => {
  if (!validCollection(request, response)) return;
  const owner = await getOwner(request, response);
  if (!owner) return;

  await owner.database.collection('repositoryData').deleteOne({
    ownerId: owner.ownerId,
    collectionName: request.params.collection,
    itemId: request.params.id
  });
  return response.json({ ok: true });
});

module.exports = router;