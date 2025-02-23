const express = require('express');
const router = express.Router();
const container = require('../db');

router.post('/', async (req, res) => {
    try {
        const { patientId, vitals } = req.body;
        if (!patientId || !vitals) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        await container.items.create({ id: patientId, vitals });
        res.status(201).json({ message: "Data stored" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const querySpec = { query: "SELECT * FROM c" };
        const { resources } = await container.items.query(querySpec).fetchAll();
        res.status(200).json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
