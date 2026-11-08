export class Repository {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async request(path, options = {}) {
    const response = await fetch(`/api/data/${encodeURIComponent(this.collectionName)}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers
      },
      credentials: 'same-origin'
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'Não foi possível acessar os dados.');
    return payload;
  }

  async listar() {
    const result = await this.request('');
    return result.items;
  }

  async adicionar(item) {
    const result = await this.request('', { method: 'POST', body: JSON.stringify({ item }) });
    return result.item;
  }

  async remover(id) {
    await this.request(`/${encodeURIComponent(id)}`, { method: 'DELETE' });
  }

  async atualizar(id, novoItem) {
    const result = await this.request(`/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify({ item: novoItem })
    });
    return result.item;
  }
}
