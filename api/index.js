const express = require('express');

const app = express();

const router = require('../routes/index');

app.use(express.json());

router(app);

app.get('/', (req, res) => {
    res.send('API do LoreOwl funcionando!');
});

module.exports = app;
