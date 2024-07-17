const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saranSchema = new Schema({
    kategori: {
        type: String,
        required: true
    },
    saran: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    id_guru: {
        type: Schema.Types.ObjectId,
        ref: 'Pengguna',
    },
});

module.exports = mongoose.model('Saran', saranSchema);