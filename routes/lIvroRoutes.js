const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Lista de livros');
});

router.post('/', (req, res) => {
    res.send('Criando livro');
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Atualizando livro ${id}`);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Deletando livro ${id}`);
});

module.exports = router;