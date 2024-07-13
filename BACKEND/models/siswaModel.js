const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siswaSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    nipd: {
        type: String,
        unique: true,
        required: true
    },
    nisn: {
        type: String,
        unique: true,
        required: true
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
        unique: true,
        required: true
    },
    agama: {
        type: String,
    },
    alamat_lengkap: {
        type: String,
        required: true
    },
    lokasi: {
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
    telepon: {
        type: String,
        unique: true,
        required: true
    },
    nilai: {
        type: Number,
        required: true
    },
    orangtua: {
        ayah: {
            nama: {
                type: String,
                required: true
            },
        },
        ibu: {
            nama: {
                type: String,
                required: true
            },
        }
    },
    rombel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rombel', // Changed to "Rombel"
      },
      sekolahAsal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SekolahAsal', // Changed to "SekolahAsal"
      },
}, {
    timestamps: true
});

module.exports = mongoose.model('Siswa', siswaSchema);
