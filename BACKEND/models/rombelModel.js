const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rombelSchema = new Schema({
    siswa_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Siswa',
        required: true
    },
    jurusan: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Rombel', rombelSchema);