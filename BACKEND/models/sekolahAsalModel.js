const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sekolahAsalSchema = new Schema({
    siswa_id: {
        type: Schema.Types.ObjectId,
        ref: 'Siswa',
        required: true
    },
    nama_sekolah: {
        type: String,
        required: true
    },
    alamat_sekolah: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lokasi:{
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
          },
          coordinates: {
            type: [Number],
            default: [99.65919389999990,3.0464583]
          },
    },

})

module.exports = mongoose.model('SekolahAsal', sekolahAsalSchema);