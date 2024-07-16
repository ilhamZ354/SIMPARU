const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Siswa = require('../models/siswaModel');
const Rombel = require('../models/rombelModel');
const SekolahAsal = require('../models/sekolahAsalModel');
const path = require('path');
const geocodeAddress = require('../helper/geocodeAddress');

const excelUpload = async (req, res) => {
  try {
    function convertExcelDate(dateString) {
      const [day, month, year] = dateString.split('/');
      const jsDate = new Date(`${year}-${month}-${day}`);
      return jsDate; // Return the JavaScript Date object directly
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
      const alamat = item.ALAMAT+', '+item.KECAMATAN+', '+item.KABUPATEN+', '+item.PROVINSI;

      const siswa = new Siswa({
        nama: item.NAMA,
        nisn: item.NISN,
        jenis_kelamin: item.JK === 'L' ? 'Laki-laki' : item.JK === 'P' ? 'Perempuan' : '',
        tempat_lahir: item.TEMPAT_LAHIR,
        nik: item.NIK,
        telepon: item.TELEPON,
        tanggal_lahir: item.TANGGAL_LAHIR,
        agama: item.AGAMA,
        tahun: item.ANGKATAN,
        alamat_lengkap: alamat,
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

      await siswa.save();

      const rombel = new Rombel({
        siswa_id: siswa._id,
        jurusan: item.JURUSAN === 'TKJ' ? 'Teknik Komputer dan Jaringan' : item.JURUSAN === 'TAV' ? 'Teknik Audio Video' : item.JURUSAN === 'TBSM' ? 'Teknik dan Bisnis Sepeda Motor' : item.JURUSAN === 'TBO' ? 'Teknik Bodi Otomotif' : '',
      });
      await rombel.save();

      const alamat_sekolah = item.ALAMAT_SEKOLAH;
      const namaSekolah = item.SEKOLAH_ASAL;

      const param = namaSekolah+', '+alamat_sekolah;

      let lokasiSekolah;
      let hasAlamatSekolah = await SekolahAsal.findOne({ namaSekolah });

      if (!hasAlamatSekolah) {
        lokasiSekolah = await geocodeAddress(param);
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
