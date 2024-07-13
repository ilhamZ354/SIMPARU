const Siswa = require('../models/siswaModel');
const Rombel = require('../models/rombelModel');
const SekolahAsal = require('../models/sekolahAsalModel');
const geocodeAddress = require('../helper/geocodeAddress');
const mongoose = require('mongoose')

const inputSiswa = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(400).send({ error: 'Kamu tidak bisa melakukan tambah data siswa' });
    }
    try {
        const { alamat_lengkap, jurusan, nama_sekolah, email, alamat_sekolah, ...rest } = req.body;
        let lokasi;

        console.log({ alamat_lengkap})
        // Cek apakah alamat sudah ada di database
        // let hasAlamat = await Siswa.findOne({ alamat_lengkap });
        
        // if (!hasAlamat) {
        //     console.log('alamat siswa belum ada, panggil API')
        //     lokasi = await geocodeAddress(alamat_lengkap);
        // } else {
        //     console.log('alamat siswa sudah ada, tidak perlu panggil API')
        //     lokasi = hasAlamat.lokasi;
        // }

        const siswa = new Siswa({
            ...rest,
            alamat_lengkap,
            lokasi
        });
        await siswa.save();

        //rombel
        const rombelSiswa = new Rombel({
            siswa_id: siswa._id,
            jurusan
        });
        await rombelSiswa.save();
        siswa.rombel = rombelSiswa._id; 

        //sekolah asal
        let lokasiSekolah;
        // let hasAlamatSekolah = await SekolahAsal.findOne({ alamat_sekolah });
        
        // if (!hasAlamatSekolah) {
        //     console.log('alamat sekolah belum ada, panggil API')
        //     lokasiSekolah = await geocodeAddress(alamat_sekolah);
        // } else {
        //     console.log('alamat sekolah sudah ada, tidak perlu panggil API')
        //     lokasiSekolah = hasAlamatSekolah.lokasi;
        // }

        const sekolahAsal = new SekolahAsal({
            siswa_id: siswa._id,
            nama_sekolah,
            email,
            alamat_sekolah,
            lokasi : lokasiSekolah
        });
        await sekolahAsal.save();
        siswa.sekolahAsal = sekolahAsal._id;

        await siswa.save();

        res.status(201).send(siswa);
    } catch (error) {
        res.status(400).send(error);
        console.log('error input siswa:', error);
    }    
};

//get siswa
const getSiswa = async (req, res) => {
    try {
        const siswa = await Siswa.find().sort({ createdAt: -1 })
            .populate({
                path: 'rombel',
                select: 'jurusan'
            })
            .populate({
                path: 'sekolahAsal',
                select: 'nama_sekolah email alamat_sekolah lokasi'
            });
        
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
    if (req.user.role !== 'admin')
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

    if (req.user.role !== 'admin')
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


//edit siswa
const editSiswaById = async (req, res) => {
    if (req.user.role !== 'admin')
        return res.status(400).send({
          error: 'Hanya admin yang dapat menghapus siswa',
    });

    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'Id tidak valid'})
        }
        
        const ubahSiswa = await Siswa.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        if (!ubahSiswa) {
            return res.status(400).json({error: 'Ubah data gagal'})
          }

        res.send({ message: 'Siswa berhasil update' });
    } catch (error) {
        res.sendStatus(400);
    }
}


module.exports = { inputSiswa, getSiswa, getSiswaById, deleteSiswaById, editSiswaById }
