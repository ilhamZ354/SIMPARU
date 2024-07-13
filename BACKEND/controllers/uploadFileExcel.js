const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Siswa = require('../models/siswaModel');
const Rombel = require('../models/rombelModel');
const SekolahAsal = require('../models/sekolahAsalModel');
const path = require('path');

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
          if (newKey === 'Tanggal_lahir') {
            console.log(newKey)
            newItem[newKey] = convertExcelDate(item[key]);
          } else {
            newItem[newKey] = item[key];
          }
      });
      return newItem;
    });

    console.log(newData)

    for (const item of newData) {

      //siswa model
      const siswa = new Siswa(item);
      siswa.nama = item.Nama;
      siswa.nipd = item.NIPD;
      siswa.nisn = item.NISN;
      siswa.jenis_kelamin = item.Jenis_kelamin;
      siswa.tempat_lahir = item.Tempat_lahir;
      siswa.nik = item.NIK;
      siswa.telepon = item.Telepon;
      siswa.tanggal_lahir = item.Tanggal_lahir;
      siswa.agama = item.Agama;
      siswa.alamat_lengkap = item.Alamat;
      siswa.orangtua.ayah.nama = item.Nama_Ayah;
      siswa.orangtua.ibu.nama = item.Nama_Ibu;
      siswa.nilai = item.Nilai_akhir;
      siswa.lokasi.type = 'Point';
      // siswa.lokasi.coordinates = item.Koordinat_alamat_siswa;
    
      if (item.Koordinat_alamat_siswa) {
        const [lat, long] = item.Koordinat_alamat_siswa.replace(/[\[\]]/g, '').split(',').map(parseFloat);
        siswa.lokasi.coordinates = [lat, long];
      } 
      else {
        siswa.lokasi.type = 'Point';
        siswa.lokasi.coordinates = null;
      }

      ///simpan data
      try {
        await siswa.save();

        const rombel = new Rombel({
          siswa_id: siswa._id,
          jurusan: item.Jurusan
        });
        await rombel.save();

        const [latSekolah, longSekolah] = item.Koordinat_alamat_sekolah.replace(/[\[\]]/g, '').split(',').map(parseFloat);

        const sekolahAsal = new SekolahAsal({
          siswa_id: siswa._id,
          nama_sekolah: item.Sekolah_asal,
          alamat_sekolah: item.Alamat_sekolah,
          email: item.Email_sekolah,
          lokasi : { type: 'Point', coordinates: [latSekolah, longSekolah] }
        });

        await sekolahAsal.save();

        console.log('Data saved:');
      } catch (err) {
        console.log('Error saving data:', err);
      }
    
    }

    res.send('File uploaded successfully!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error uploading file!');
  }
};

module.exports = { excelUpload };
