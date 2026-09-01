import { LivroService } from '../../application/LivroService.js';

export const LivroController = {
  async listar(req, res) {
    const livros = await LivroService.listar();
    res.json(livros);
  },

  async criar(req, res) {
    const novo = await LivroService.criar(req.body);
    res.status(201).json(novo);
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const atualizado = await LivroService.atualizar(id, req.body);
    res.json(atualizado);
  },

  async deletar(req, res) {
    const { id } = req.params;
    await LivroService.deletar(id);
    res.status(204).send();
  }
};
    