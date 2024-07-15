const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Siswa = require('../models/siswaModel');
const Rombel = require('../models/rombelModel');
const SekolahAsal = require('../models/sekolahAsalModel');
const path = require('path');
const geocodeAddress = require('../helper/geocodeAddress');

const excelUpload = async (req, res) => {
  try {
    function convertExcelDate(excelDate) {
      const jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
      return jsDate.toLocaleDateString('id-ID');
    }

    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const newData = data.map(item => {
      const newItem = {};
      Object.keys(item).forEach(key => {
        let newKey = key.replace(/\s/g, '_');
        if (newKey === 'TANGGAL_LAHIR') {
          newItem[newKey] = convertExcelDate(item[key]);
        } else {
          newItem[newKey] = item[key];
        }
      });
      return newItem;
    });

    for (const item of newData) {
      const siswa = new Siswa({
        nama: item.NAMA,
        nipd: item.NIPD,
        nisn: item.NISN,
        jenis_kelamin: item.JK === 'L' ? 'Laki-laki' : item.JK === 'P' ? 'Perempuan' : '',
        tempat_lahir: item.TEMPAT_LAHIR,
        nik: item.NIK,
        telepon: item.TELEPON,
        tanggal_lahir: item.TANGGAL_LAHIR,
        agama: item.AGAMA,
        alamat_lengkap: item.ALAMAT,
        orangtua: {
          ayah: {
            nama: item.NAMA_AYAH,
          },
          ibu: {
            nama: item.NAMA_IBU,
          },
        },
        nilai: item.NILAI_AKHIR,
      });

      const alamat = siswa.alamat_lengkap;
      let hasAlamat = await Siswa.findOne({ alamat });

      if (!hasAlamat) {
        siswa.lokasi = await geocodeAddress(alamat);
      } else {
        siswa.lokasi = hasAlamat.lokasi;
      }

      // Save siswa first without sekolahAsal and rombel references
      await siswa.save();

      const rombel = new Rombel({
        siswa_id: siswa._id,
        jurusan: item.JURUSAN === 'TKJ' ? 'Teknik Komputer dan Jaringan' : item.JURUSAN === 'TAV' ? 'Teknik Audio Video' : item.JURUSAN === 'TBSM' ? 'Teknik dan Bisnis Sepeda Motor' : item.JURUSAN === 'TBO' ? 'Teknik Bodi Otomotif' : '',
      });
      await rombel.save();

      const alamat_sekolah = item.ALAMAT_SEKOLAH;
      let lokasiSekolah;
      let hasAlamatSekolah = await SekolahAsal.findOne({ alamat_sekolah });

      if (!hasAlamatSekolah) {
        lokasiSekolah = await geocodeAddress(alamat_sekolah);
      } else {
        lokasiSekolah = hasAlamatSekolah.lokasi;
      }

      const sekolahAsal = new SekolahAsal({
        siswa_id: siswa._id,
        nama_sekolah: item.SEKOLAH_ASAL,
        alamat_sekolah: item.ALAMAT_SEKOLAH,
        email: item.EMAIL_SEKOLAH,
        lokasi: lokasiSekolah,
      });
      await sekolahAsal.save();

      // Update siswa with references to rombel and sekolahAsal
      siswa.rombel = rombel._id;
      siswa.sekolahAsal = sekolahAsal._id;

      await siswa.save();

      console.log('Data saved:');
    }

    res.send('File uploaded successfully!');
  } catch (err) {
    console.log('Error uploading file:', err);
    res.status(500).send('Error uploading file!');
  }
};

module.exports = { excelUpload };
