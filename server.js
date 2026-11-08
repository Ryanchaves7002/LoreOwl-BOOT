try {
  require('dotenv').config();
} catch {}

const path = require('node:path');
const express = require('express');
const api = require('./api');

const app = express();
const siteDirectory = path.join(__dirname, 'dist', 'páginas');

app.use('/api', api);
app.get('/', (request, response) => response.sendFile(path.join(__dirname, 'index.html')));
app.use(express.static(siteDirectory));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`LoreOwl disponível em http://localhost:${port}`));