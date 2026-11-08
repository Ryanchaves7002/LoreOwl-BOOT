const { MongoClient } = require('mongodb');

const clientKey = Symbol.for('loreowl.mongoClientPromise');
const indexesKey = Symbol.for('loreowl.mongoIndexesPromise');

async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    const error = new Error('A variável MONGODB_URI não está configurada.');
    error.statusCode = 503;
    throw error;
  }

  if (!globalThis[clientKey]) {
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    globalThis[clientKey] = client.connect();
  }

  const client = await globalThis[clientKey];
  const database = client.db(process.env.MONGODB_DB || 'loreowl');

  if (!globalThis[indexesKey]) {
    globalThis[indexesKey] = Promise.all([
      database.collection('users').createIndex({ email: 1 }, { unique: true }),
      database.collection('sessions').createIndex({ tokenHash: 1 }, { unique: true }),
      database.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      database.collection('carts').createIndex({ ownerId: 1 }, { unique: true }),
      database.collection('books').createIndex({ id: 1 }, { unique: true }),
      database.collection('repositoryData').createIndex(
        { ownerId: 1, collectionName: 1, itemId: 1 },
        { unique: true }
      )
    ]);
  }

  await globalThis[indexesKey];
  return database;
}

module.exports = { getDatabase };