const Keputusan = require('../models/keputusanModel')
const mongoose = require('mongoose')

// Buat keputusan
const createKeputusan = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (req.user.level !== 'kepala-sekolah') {
            return res.status(400).send({ error: 'Kamu tidak dapat memberikan keputusan' });
        }

        const { kategori, target, keputusan } = req.body;
        console.log('Request Body:', req.body);

        const newKeputusan = new Keputusan({
            kategori,
            target,
            keputusan
        });

        const savedKeputusan = await newKeputusan.save();
        if (!savedKeputusan) {
            console.log('Keputusan tidak berhasil disimpan!');
            return res.status(500).json({ error: 'Keputusan tidak berhasil disimpan!' });
        }

        await newKeputusan.save();
        res.status(201).json(savedKeputusan);

    } catch (error) {
        console.error('Error creating keputusan:', error);
        res.status(500).json({ error: 'Error creating keputusan' });
    }
};


// get semua keputusan
const getAllKeputusan = async (req, res) => {
    try {
        const keputusan = await Keputusan.find();
        res.status(200).json(keputusan);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching keputusans' });
    }
};

// Get keputusan by ID
const getKeputusanById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ID' });
        }

        const keputusan = await Keputusan.findById(id);

        if (!keputusan) {
            return res.status(404).json({ error: 'Saran not found' });
        }

        res.status(200).json(keputusan);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching saran' });
    }
};

// Update keputusan by ID
const updateKeputusanById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true };

        console.log(`data`, updates, id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ID' });
        }

        const keputusan = await Keputusan.findByIdAndUpdate(id, updates, options);

        if (!keputusan) {
            return res.status(404).json({ error: 'keputusan not found' });
        }

        await keputusan.save()
        res.status(200).json(saran);
    } catch (error) {
        res.status(500).json({ error: 'Error updating keputusan' });
    }
};

// Delete keputusan by ID
const deleteKeputusanById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ID' });
        }

        const keputusan = await Keputusan.findByIdAndDelete(id);

        if (!keputusan) {
            return res.status(404).json({ error: 'keputusan not found' });
        }

        res.status(200).json({ message: 'keputusan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting keputusan' });
    }
};

module.exports = {
    createKeputusan,
    getAllKeputusan,
    getKeputusanById,
    updateKeputusanById,
    deleteKeputusanById
};
