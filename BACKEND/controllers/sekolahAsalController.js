const SekolahAsal = require('../models/sekolahAsalModel');
const Siswa = require('../models/siswaModel');

// get sekolah
const getSekolahAsalData = async (req, res) => {
  try {
    const sekolahData = await SekolahAsal.aggregate([
      {
        $lookup: {
          from: 'siswas',
          localField: 'siswa_id',
          foreignField: '_id',
          as: 'siswas'
        }
      },
      {
        $group: {
          _id: '$nama_sekolah',
          alamat_sekolah: { $first: '$alamat_sekolah' },
          email: { $first: '$email' },
          total_siswa: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          nama_sekolah: '$_id',
          alamat_sekolah: 1,
          email: 1,
          total_siswa: 1
        }
      }
    ]);

    res.json(sekolahData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = {
  getSekolahAsalData,
};
