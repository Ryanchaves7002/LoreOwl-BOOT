import express from 'express';
import { LivroController } from '../adapters/controllers/LivroController.js';
const router = express.Router();

router.get('/', LivroController.listar);
router.post('/', LivroController.criar);
router.put('/:id', LivroController.atualizar);
router.delete('/:id', LivroController.deletar);

export default router;
