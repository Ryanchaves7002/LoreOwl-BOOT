const crypto = require('node:crypto');
const { promisify } = require('node:util');

const scrypt = promisify(crypto.scrypt);
const SESSION_COOKIE = 'loreowl_session';
const CART_COOKIE = 'loreowl_cart';
const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
}

async function verifyPassword(password, storedHash) {
  const [saltHex, keyHex] = String(storedHash || '').split(':');
  if (!saltHex || !keyHex) return false;

  try {
    const expected = Buffer.from(keyHex, 'hex');
    const actual = await scrypt(password, Buffer.from(saltHex, 'hex'), expected.length);
    return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function readCookie(request, name) {
  const cookieHeader = request.headers.cookie || '';
  for (const part of cookieHeader.split(';')) {
    const separator = part.indexOf('=');
    if (separator < 0 || part.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return '';
    }
  }
  return '';
}

function writeCookie(response, name, value, maxAge) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`
  ];
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
    parts.push('Secure');
  }
  response.append('Set-Cookie', parts.join('; '));
}

function createSessionCookie(response, token) {
  writeCookie(response, SESSION_COOKIE, token, SESSION_MAX_AGE);
}

function clearSessionCookie(response) {
  writeCookie(response, SESSION_COOKIE, '', 0);
}

function readSessionCookie(request) {
  return readCookie(request, SESSION_COOKIE);
}

function getOrCreateCartCookie(request, response) {
  let token = readCookie(request, CART_COOKIE);
  if (!/^[a-f0-9]{64}$/.test(token)) {
    token = crypto.randomBytes(32).toString('hex');
    writeCookie(response, CART_COOKIE, token, 365 * 24 * 60 * 60);
  }
  return token;
}

module.exports = {
  CART_COOKIE,
  SESSION_MAX_AGE,
  clearSessionCookie,
  createSessionCookie,
  getOrCreateCartCookie,
  hashPassword,
  hashToken,
  readSessionCookie,
  verifyPassword
};