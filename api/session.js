const crypto = require('node:crypto');
const { ObjectId } = require('mongodb');
const {
  SESSION_MAX_AGE,
  createSessionCookie,
  getOrCreateCartCookie,
  hashToken,
  readSessionCookie
} = require('./security');

async function getAuthenticatedUser(request, database) {
  const token = readSessionCookie(request);
  if (!token) return null;

  const session = await database.collection('sessions').findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() }
  });
  if (!session || !ObjectId.isValid(session.userId)) return null;

  return database.collection('users').findOne({ _id: new ObjectId(session.userId) });
}

async function startSession(response, database, user) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
  await database.collection('sessions').insertOne({
    tokenHash: hashToken(token),
    userId: user._id.toString(),
    expiresAt
  });
  createSessionCookie(response, token);
}

async function removeSession(request, database) {
  const token = readSessionCookie(request);
  if (token) {
    await database.collection('sessions').deleteOne({ tokenHash: hashToken(token) });
  }
}

function getCartOwner(request, response, user) {
  if (user) return `user:${user._id.toString()}`;
  return `guest:${getOrCreateCartCookie(request, response)}`;
}

async function mergeGuestCart(request, database, user) {
  const guestId = getOrCreateCartCookie(request, { append() {} });
  const guestOwner = `guest:${guestId}`;
  const userOwner = `user:${user._id.toString()}`;
  const carts = database.collection('carts');
  const guestCart = await carts.findOne({ ownerId: guestOwner });

  if (!guestCart) return;

  const userCart = await carts.findOne({ ownerId: userOwner });
  const mergedItems = [...(userCart?.items || [])];
  for (const guestItem of guestCart.items || []) {
    const existing = mergedItems.find(item => item.id === guestItem.id);
    if (existing) existing.quantidade += guestItem.quantidade;
    else mergedItems.push(guestItem);
  }

  await carts.updateOne(
    { ownerId: userOwner },
    { $set: { items: mergedItems, updatedAt: new Date() } },
    { upsert: true }
  );
  await carts.deleteOne({ ownerId: guestOwner });
}

module.exports = {
  getAuthenticatedUser,
  getCartOwner,
  mergeGuestCart,
  removeSession,
  startSession
};