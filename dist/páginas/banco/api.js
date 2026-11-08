async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
    credentials: 'same-origin'
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Não foi possível concluir a operação.');
  }
  return payload;
}

export async function registerUser(data) {
  const result = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return result.user;
}

export async function loginUser(data) {
  const result = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return result.user;
}

export async function getCurrentUser() {
  const result = await request('/auth/me');
  return result.user;
}

export async function logoutUser() {
  await request('/auth/logout', { method: 'POST' });
}

export async function getCart() {
  const result = await request('/cart');
  return result.items;
}

export async function addToCart(bookId, quantidade = 1) {
  const result = await request('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ bookId: String(bookId), quantidade })
  });
  return result.items;
}

export async function updateCartItem(bookId, quantidade) {
  const result = await request(`/cart/items/${encodeURIComponent(bookId)}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantidade })
  });
  return result.items;
}

export async function removeFromCart(bookId) {
  const result = await request(`/cart/items/${encodeURIComponent(bookId)}`, { method: 'DELETE' });
  return result.items;
}

export async function clearCart() {
  const result = await request('/cart', { method: 'DELETE' });
  return result.items;
}