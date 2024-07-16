const Siswa = require('../models/siswaModel');
const Rombel = require('../models/rombelModel');
const SekolahAsal = require('../models/sekolahAsalModel');
const geocodeAddress = require('../helper/geocodeAddress');
const mongoose = require('mongoose')

const inputSiswa = async (req, res) => {
    if (req.user.level !== 'admin') {
        return res.status(400).send({ error: 'Kamu tidak bisa melakukan tambah data siswa' });
    }
    try {
        const { jurusan, nama_sekolah, email, alamat_sekolah, ...rest } = req.body;

        // const bagiAlamat = alamat_lengkap.split(', ')
        // const updateAlamat = bagiAlamat.slice(1).join(', ');

        const siswa = new Siswa({
            ...rest,
        });
        await siswa.save();

        //rombel
        const rombelSiswa = new Rombel({
            siswa_id: siswa._id,
            jurusan
        });
        await rombelSiswa.save();

        //sekolah asal
        let lokasiSekolah;
        let hasAlamatSekolah = await SekolahAsal.findOne({ nama_sekolah });
        
        const param = nama_sekolah+alamat_sekolah
        if (!hasAlamatSekolah) {
            console.log('lokasi sekolah belum ada, panggil API')
            lokasiSekolah = await geocodeAddress(param);
        } else {
            console.log('lokasi sekolah sudah ada, tidak perlu panggil API')
            lokasiSekolah = hasAlamatSekolah.lokasi;
        }

        const sekolahAsal = new SekolahAsal({
            siswa_id: siswa._id,
            nama_sekolah,
            email,
            alamat_sekolah,
            lokasi : lokasiSekolah
        });

        await sekolahAsal.save();

        siswa.rombel = rombelSiswa._id; 
        siswa.sekolahAsal = sekolahAsal._id;

        await siswa.save();

        res.status(201).send(siswa);
    } catch (error) {
        res.status(400).send(error);
        console.log('error input siswa:', error);
    }    
};

// get siswa
const getSiswa = async (req, res) => {
    try {
        // Log to check database connection
        console.log("Fetching siswa data...");

        const siswa = await Siswa.find()
            .populate('rombel', 'jurusan') 
            .populate('sekolahAsal', 'nama_sekolah email alamat_sekolah lokasi'); 

        if (!siswa) {
            return res.status(404).json({ msg: 'Data siswa tidak ditemukan' });
        }

        res.status(200).json({ status: true, siswa });
    } catch (error) {
        console.error("Error fetching siswa:", error);
        res.status(500).json({ msg: "Gagal mengambil data siswa", error });
    }
};


//get siswa by id for admin
const getSiswaById = async (req, res) => {
    if (req.user.level !== 'admin')
        return res.status(400).send({
          error: 'Data tidak diperbolehkan',
        });
      const _id = req.params.id;
      try {
        const siswa = await Siswa.findById(_id);
        if (!siswa) return res.sendStatus(404);
        res.send(siswa);
      } catch (e) {
        res.sendStatus(400);
      }
}


//delete  user by id for admin
const deleteSiswaById = async(req, res) => {

    if (req.user.level !== 'admin')
        return res.status(400).send({
          error: 'Hanya admin yang dapat menghapus siswa',
        });
      const _id = req.params.id;
    
      try {
        const siswa = await Siswa.findByIdAndDelete(_id);
        if (!siswa) console.log('data siswa berhasil dihapus');

        const sekolahAsal = await SekolahAsal.findOneAndDelete({ siswa_id: _id });
        if (!sekolahAsal) console.log('data sekolah asal siswa berhasil dihapus');

        const rombel = await Rombel.findOneAndDelete({ siswa_id: _id });
        if (!rombel) console.log('data rombel siswa berhasil dihapus');

        res.send({ message: 'Siswa Deleted' });
      } catch (e) {
        res.sendStatus(400);
      }
}


//edit siswa by id
const editSiswaById = async (req, res) => {
    if (req.user.level !== 'admin') {
        return res.status(403).send({
            error: 'Hanya admin yang dapat mengedit siswa',
        });
    }

    try {
        const { id } = req.params;
        const { jurusan, nama_sekolah, email, alamat_sekolah, ...rest } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'ID tidak valid' });
        }

        const ubahSiswa = await Siswa.findOneAndUpdate(
            { _id: id },
            {
                ...rest,
            },
            { new: true }
        );

        if (!ubahSiswa) {
            return res.status(404).json({ error: 'Siswa tidak ditemukan' });
        }

        await Rombel.findOneAndUpdate(
            { siswa_id: id },
            { jurusan },
            { new: true }
        );

        let lokasiSekolah;
        let hasAlamatSekolah = await SekolahAsal.findOne({ nama_sekolah });

        const param = nama_sekolah+alamat_sekolah

        if (!hasAlamatSekolah) {
            console.log('Alamat sekolah belum ada, panggil API');
            lokasiSekolah = await geocodeAddress(param);
        } else {
            console.log('Alamat sekolah sudah ada, tidak perlu panggil API');
            lokasiSekolah = hasAlamatSekolah.lokasi;
        }

        const ubahSekolahAsal = await SekolahAsal.findOneAndUpdate(
            { siswa_id: id },
            {
                nama_sekolah,
                email,
                alamat_sekolah,
                lokasi: lokasiSekolah,
            },
            { new: true }
        );

        if (!ubahSekolahAsal) {
            return res.status(404).json({ error: 'Sekolah asal tidak ditemukan' });
        }

        res.send({ message: 'Siswa berhasil diperbarui' });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send({ error: 'Terjadi kesalahan pada server' });
    }
};



module.exports = { inputSiswa, getSiswa, getSiswaById, deleteSiswaById, editSiswaById }
