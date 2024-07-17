const Siswa = require('../models/siswaModel');
const Rombel = require('../models/rombelModel');
const SekolahAsal = require('../models/sekolahAsalModel');
const mongoose = require('mongoose')

const getDataSiswa = async (req, res) => {
    try {
        const year = req.params.tahun;
      const currentYear = parseInt(year, 10);
      const previousYear = currentYear - 1;

      const siswaData = await Siswa.find({ tahun: currentYear })
      .populate('rombel')
      .populate('sekolahAsal');
  
      const previousSiswaData = await Siswa.find({ tahun: previousYear });

      const totalSiswa = siswaData.length+previousSiswaData.length;
      const totalSiswaPreviousYear = previousSiswaData.length;

      let totalKenaikan = 0;
      let totalPenurunan = 0;
      if (totalSiswaPreviousYear > 0) {
        if (siswaData.length > previousSiswaData.length) {
            const kenaikan = siswaData.length - previousSiswaData.length;
            totalPenurunan = 0;
            totalKenaikan = Math.round((kenaikan / previousSiswaData.length) * 100);
        } else if (siswaData.length < previousSiswaData.length) {
            const penurunan = previousSiswaData.length - siswaData.length;
            totalKenaikan = 0;
            totalPenurunan = Math.round((penurunan / previousSiswaData.length) * 100);
        } else{
            totalPenurunan = 0;
            totalKenaikan = 0;
        }
    }

      const totalLakiLaki = siswaData.filter(siswa => siswa.jenis_kelamin === 'Laki-laki').length;
      const totalPerempuan = siswaData.filter(siswa => siswa.jenis_kelamin === 'Perempuan').length;
  
      const totalNilai = siswaData.reduce((sum, siswa) => sum + siswa.nilai, 0);
      const rataRataNilai = siswaData.length > 0 ? totalNilai / siswaData.length : 0;
  
      const jurusanCount = siswaData.reduce((count, siswa) => {
        let jurusan = siswa.rombel.jurusan;
        
        if (jurusan === 'Teknik Komputer dan Jaringan') {
          jurusan = 'TKJ';
        }else if(jurusan === 'Teknik dan Bisnis Sepeda Motor') {
            jurusan = 'TBSM';
        }else if(jurusan === 'Teknik Audio Video') {
            jurusan = 'TAV';
        }else if(jurusan === 'Teknik Bodi Otomotif') {
            jurusan = 'TBO';
        }
        
        count[jurusan] = (count[jurusan] || 0) + 1;
        return count;
      }, {});

      const startYear = 2021; // Atur tahun awal sesuai dengan kebutuhan
      const dataSiswaBaru = {};
      for (let i = startYear; i <= currentYear; i++) {
          const siswaTahun = await Siswa.countDocuments({ tahun: i });
          dataSiswaBaru[i] = siswaTahun;
      }
      
      res.json({
        status: true,
        totalSiswa,
        totalSiswaBaru: siswaData.length,
        totalKenaikan: `${totalKenaikan}%`,
        totalPenurunan: `${totalPenurunan}%`,
        totalLakiLaki,
        totalPerempuan,
        rata_rata_nilai: Math.round(rataRataNilai),
        jurusanCount,
        dataSiswaBaru
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Error fetching dashboard data' });
    }
  };
  
  module.exports = { getDataSiswa };