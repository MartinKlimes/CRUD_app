const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    }
    catch (err) {
        res.send('Error ' + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json(item);
    }

    catch (err) {
        res.send('Error ' + err);
    }
});

router.post('/', async (req, res) => {
    const item = new Item({
        title: req.body.title,
        body: req.body.body,
        important: req.body.important
    });

    try {
        const i1 = await item.save();
        res.json(i1);
    }
    catch (err) {
        res.send('Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    }
    catch (err) {
        res.send('Error' + err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        item.title = req.body.title;
        item.body = req.body.body;
        item.important = req.body.important;
        const i1 = await item.save();
        res.json(i1);
    }
    catch (err) {
        res.send('Error');
    }
});


module.exports = router;
