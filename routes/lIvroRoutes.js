const express = require('express');
const { getDatabase } = require('../api/database');
const catalogData = require('../api/catalogData');

const router = express.Router();

async function seedCatalog(database) {
    await database.collection('books').bulkWrite(catalogData.map(book => ({
        updateOne: {
            filter: { id: book.id },
            update: { $setOnInsert: book },
            upsert: true
        }
    })), { ordered: false });
}

router.get('/', async (req, res) => {
    const database = await getDatabase();
    await seedCatalog(database);
    const books = await database.collection('books').find({}).toArray();
    books.sort((first, second) => Number(first.id) - Number(second.id));
    res.json({ books });
});

router.get('/:id', async (req, res) => {
    const database = await getDatabase();
    await seedCatalog(database);
    const book = await database.collection('books').findOne({ id: String(req.params.id) });
    if (!book) return res.status(404).json({ error: 'Livro não encontrado.' });
    return res.json({ book });
});

module.exports = router;