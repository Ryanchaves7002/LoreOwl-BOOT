import { connection } from '../database/connection.js';

export const LivroRepository = {
  async listar() {
    const [rows] = await connection.query('SELECT * FROM livros');
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await connection.query('SELECT * FROM livros WHERE id = ?', [id]);
    return rows[0];
  },

  async criar({ titulo, preco }) {
    const [result] = await connection.query(
      'INSERT INTO livros (titulo, preco) VALUES (?, ?)',
      [titulo, preco]
    );
    return { id: result.insertId, titulo, preco };
  },

  async atualizar(id, { titulo, preco }) {
    await connection.query(
      'UPDATE livros SET titulo = ?, preco = ? WHERE id = ?',
      [titulo, preco, id]
    );
    return { id, titulo, preco };
  },

  async deletar(id) {
    await connection.query('DELETE FROM livros WHERE id = ?', [id]);
    return true;
  }
};
