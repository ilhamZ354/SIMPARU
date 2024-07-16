const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siswaSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    nisn: {
        type: String,
    },
    jenis_kelamin: {
        type: String,
        required: true
    },
    tempat_lahir: {
        type: String,
        required: true
    },
    tanggal_lahir: {
        type: Date,
        required: true
    },
    nik: {
        type: String,
    },
    agama: {
        type: String,
    },
    alamat_lengkap: {
        type: String,
        required: true
    },
    telepon: {
        type: String,
    },
    nilai: {
        type: Number,
        required: true
    },
    tahun: {
        type: Number,
        required: true
    },
    orangtua: {
        ayah: {
            nama: {
                type: String,
            },
        },
        ibu: {
            nama: {
                type: String,
            },
        }
    },
    rombel: {
        type: Schema.Types.ObjectId,
        ref: 'Rombel',
      },
      sekolahAsal: {
        type: Schema.Types.ObjectId,
        ref: 'SekolahAsal',
      },
}, {
    timestamps: true
});

module.exports = mongoose.model('Siswa', siswaSchema);
