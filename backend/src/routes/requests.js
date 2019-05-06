const express = require('express');
const router = express.Router();
const dateFormat = require('dateformat');
const Document = require('../models/model');

const isExistedDocument = async (id) => {
    if (!id) return false;
    return Boolean(await Document.findById(id));
};

const createDocument = async (req, res) => {
    const document = {
        name: req.body.name.trim() || 'Untitled Document',
        text: req.body.text,
        changeDate: dateFormat(new Date(), "dd.mm.yyyy hh:MM:ss"),
    };

    if (await isExistedDocument(req.params.id || req.body.id)) {
        const existedDocument = await Document.findOneAndUpdate({_id: req.body.id}, document);
        return res.send(forEditor(await Document.findById(existedDocument.id)));
    }

    const newDocument = new Document(document);

    await newDocument.save();
    return res.send(forEditor(newDocument));
};
router.post('/document', createDocument);
router.delete('/document/:id', async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.send(true);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/documents', async (req, res) => {
    const docs = (await Document.find({}, '_id name text changeDate').sort({'changeDate': 1})).map(forManaging);
    try {
        res.send(docs);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/document/:id', async (req, res) => {
    try {
        return res.send(forEditor(await Document.findById(req.params.id, '_id name text')));
    } catch (e) {
        return res.sendStatus(500);
    }
});

const forEditor = (doc) => {
    return {
        id: doc.id,
        text: doc.text,
        name: doc.name,
    }
};

const forManaging = (doc) => {
    return {
        id: doc.id,
        name: doc.name,
        changeDate: doc.changeDate,
    }
};

module.exports = router;
