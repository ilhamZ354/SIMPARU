const Guru = require('../models/penggunaModel');
const Saran = require('../models/saranModel')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

// Buat saran
const createSaran = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

        if (req.user.level !== 'guru') {
            return res.status(400).send({ error: 'Kamu tidak dapat memberikan saran' });
        }

        const { kategori, saran } = req.body;
        console.log('Request Body:', req.body);
        console.log('Decoded User ID:', decoded._id);

        const newSaran = new Saran({
            kategori,
            saran,
            status: '',
        });

        const savedSaran = await newSaran.save();
        if (!savedSaran) {
            console.log('Saran tidak berhasil disimpan!');
            return res.status(500).json({ error: 'Saran tidak berhasil disimpan!' });
        }

        const updatedGuru = await Guru.findByIdAndUpdate(
            decoded._id,
            { $set: { saran: savedSaran._id } }
        );

        if (!updatedGuru) {
            console.log('Guru tidak berhasil diperbarui!');
            return res.status(500).json({ error: 'Guru tidak berhasil diperbarui!' });
        }

        newSaran.id_guru = decoded._id;
        await newSaran.save();
        res.status(201).json(savedSaran);
    } catch (error) {
        console.error('Error creating saran:', error);
        res.status(500).json({ error: 'Error creating saran' });
    }
};


// get semua saran
const getAllSarans = async (req, res) => {
    try {
        const sarans = await Saran.find().populate('id_guru', 'nama username email');
        res.status(200).json(sarans);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sarans' });
    }
};

// get semua saran khusus guru
const getSaranMe = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    try {
        const sarans = await Saran.find({ id_guru: decoded._id, });
        res.status(200).json(sarans);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sarans' });
    }
};

// Get saran by ID
const getSaranById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ID' });
        }

        const saran = await Saran.findById(id).populate('id_guru', 'nama username email');

        if (!saran) {
            return res.status(404).json({ error: 'Saran not found' });
        }

        res.status(200).json(saran);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching saran' });
    }
};

// Update saran by ID
const updateSaranById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true };

        console.log(`data`, updates, id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ID' });
        }

        const saran = await Saran.findByIdAndUpdate(id, updates, options);

        if (!saran) {
            return res.status(404).json({ error: 'Saran not found' });
        }

        await saran.save()
        res.status(200).json(saran);
    } catch (error) {
        res.status(500).json({ error: 'Error updating saran' });
    }
};

// Delete saran by ID
const deleteSaranById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ID' });
        }

        const saran = await Saran.findByIdAndDelete(id);

        if (!saran) {
            return res.status(404).json({ error: 'Saran not found' });
        }

        res.status(200).json({ message: 'Saran deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting saran' });
    }
};

module.exports = {
    createSaran,
    getAllSarans,
    getSaranById,
    updateSaranById,
    getSaranMe,
    deleteSaranById
};
