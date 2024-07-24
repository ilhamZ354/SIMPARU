const Siswa = require('../models/siswaModel')
const Rombel = require('../models/rombelModel')

const getDataPerJurusan = async (req, res) => {
    try {
      const siswaData = await Siswa.aggregate([
        {
          $lookup: {
            from: 'rombels',
            localField: 'rombel',
            foreignField: '_id',
            as: 'rombelData'
          }
        },
        { $unwind: '$rombelData' },
        {
          $group: {
            _id: {
              jurusan: '$rombelData.jurusan',
              tahun: '$tahun'
            },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: '$_id.jurusan',
            data: {
              $push: {
                tahun: '$_id.tahun',
                count: '$count'
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            jurusan: '$_id',
            data: 1
          }
        }
      ]);
  
      res.status(200).json(siswaData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getDataPerJurusan
  };