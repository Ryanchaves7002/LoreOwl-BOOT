const express = require('express');

const app = express();

const router = require('../routes/index');

app.use(express.json({ limit: '3mb' }));

router(app);

app.get(['/api', '/'], (req, res) => {
    res.json({ status: 'ok', service: 'LoreOwl API' });
});

app.use((error, req, res, next) => {
    console.error('Erro na API LoreOwl:', error);
    if (res.headersSent) return next(error);
    const status = Number(error.statusCode) || 500;
    res.status(status).json({
        error: status === 500 ? 'Erro interno do servidor.' : error.message
    });
});

module.exports = app;
