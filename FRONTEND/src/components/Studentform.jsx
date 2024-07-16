import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from 'primereact/button';

const StudentForm = ({ data }) => {
  const [dataAlamat, setDataAlamat] = useState({
    alamat: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: ''
  });

  const [dataAlamatSekolah, setDataAlamatSekolah] = useState({
    alamatSekolah: '',
    kecamatanSekolah: '',
    kabupatenSekolah: '',
    provinsiSekolah: ''
  });

  const [formData, setFormData] = useState({
    nama: '',
    nisn: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    nik: '',
    agama: '',
    alamat_lengkap: '',
    jurusan: '',
    nilai: '',
    telepon: '',
    orangtua: {
      ayah: {
        nama: ''
      },
      ibu: {
        nama: ''
      }
    },
    nama_sekolah: '',
    email: '',
    alamat_sekolah: ''
  });

  useEffect(() => {
    if (data) {
      console.log("Received data:", data);
      setFormData({
        nama: data.nama || '',
        nisn: data.nisn || '',
        jenis_kelamin: data.jenis_kelamin || '',
        tempat_lahir: data.tempat_lahir || '',
        tanggal_lahir: new Date(data.tanggal_lahir) || null,
        nik: data.nik || '',
        agama: data.agama || '',
        alamat_lengkap: data.alamat_lengkap || '',
        jurusan: data.rombel?.jurusan || '',
        nilai: data.nilai || '',
        telepon: data.telepon || '',
        orangtua: {
          ayah: {
            nama: data.orangtua?.ayah?.nama || ''
          },
          ibu: {
            nama: data.orangtua?.ibu?.nama || ''
          }
        },
        nama_sekolah: data.sekolahAsal?.nama_sekolah || '',
        email: data.sekolahAsal?.email || '',
        alamat_sekolah: data.sekolahAsal?.alamat_sekolah || ''
      });

      const alamatParts = (data.alamat_lengkap || '').split(', ');
      setDataAlamat({
        alamat: alamatParts[0] || '',
        kecamatan: alamatParts[1] || '',
        kabupaten: alamatParts[2] || '',
        provinsi: alamatParts[3] || ''
      });

      const alamatSekolahParts = (data.sekolahAsal?.alamat_sekolah || '').split(', ');
      setDataAlamatSekolah({
        alamatSekolah: alamatSekolahParts[0] || '',
        kecamatanSekolah: alamatSekolahParts[1] || '',
        kabupatenSekolah: alamatSekolahParts[2] || '',
        provinsiSekolah: alamatSekolahParts[3] || ''
      });
    }
  }, [data]);

  const genderOptions = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' }
  ];

  const agamaOptions = [
    { label: 'Islam', value: 'Islam' },
    { label: 'Kristen', value: 'Kristen' },
    { label: 'Budha', value: 'Budha' },
    { label: 'Hindu', value: 'Hindu' },
    { label: 'Protestan', value: 'Protestan' }
  ];

  const jurusanOption = [
    { label: "Teknik Komputer dan Jaringan", value: "Teknik Komputer dan Jaringan" },
    { label: "Teknik Audio Video", value: "Teknik Audio Video" },
    { label: "Teknik dan Bisnis Sepeda Motor", value: "Teknik dan Bisnis Sepeda Motor" },
    { label: "Teknik Bodi Otomotif", value: "Teknik Bodi Otomotif" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'namaAyah') {
      setFormData({ ...formData, orangtua: { ...formData.orangtua, ayah: { nama: value } } });
    } else if (name === 'namaIbu') {
      setFormData({ ...formData, orangtua: { ...formData.orangtua, ibu: { nama: value } } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAlamatChange = (e) => {
    const { name, value } = e.target;
    const newAddressData = { ...dataAlamat, [name]: value };
    setDataAlamat(newAddressData);
    const alamat_lengkap = `${newAddressData.alamat}, ${newAddressData.kecamatan}, ${newAddressData.kabupaten}, ${newAddressData.provinsi}`;
    setFormData({
      ...formData,
      alamat_lengkap
    });
  };

  const handleAlamatSekolahChange = (e) => {
    const { name, value } = e.target;
    const newAddressDataSekolah = { ...dataAlamatSekolah, [name]: value };
    setDataAlamatSekolah(newAddressDataSekolah);
    const alamat_sekolah = `${newAddressDataSekolah.alamatSekolah}, ${newAddressDataSekolah.kecamatanSekolah}, ${newAddressDataSekolah.kabupatenSekolah}, ${newAddressDataSekolah.provinsiSekolah}`;
    setFormData({
      ...formData,
      alamat_sekolah
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = Cookies.get('access_token');
    try {
      if(!data){
      const addFormData = { ...formData, lokasi: location };

      const response = await axios.post('http://localhost:5000/api/simparu/siswa/add', addFormData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      });
      console.log('Siswa added:', response.data);
      alert('Data siswa berhasil ditambahkan');
      window.location.reload();
      }else{
        const editFormData = { ...formData};
        // console.log('Siswa updated:', editFormData);
        const response = await axios.patch(`http://localhost:5000/api/simparu/siswa/edit/${data._id}`, editFormData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        });
        alert('Data siswa berhasil di update');
        window.location.reload();
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4">
        <h2 className="text-2xl mb-4">Form Input Data Siswa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="field">
            <label className="block text-sm font-medium mb-2">Nama</label>
            <InputText name="nama" value={formData.nama} onChange={handleChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">NISN</label>
            <InputText name="nisn" value={formData.nisn} onChange={handleChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Jenis Kelamin</label>
            <Dropdown name="jenis_kelamin" value={formData.jenis_kelamin} options={genderOptions} onChange={handleChange} className="w-full" placeholder="Pilih Jenis Kelamin" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 mt-6">
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Alamat</label>
            <InputText name="alamat" value={dataAlamat.alamat} onChange={handleAlamatChange} className="w-full" />
          </div>
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Kecamatan</label>
            <InputText name="kecamatan" value={dataAlamat.kecamatan} onChange={handleAlamatChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Kabupaten/Kota</label>
            <InputText name="kabupaten" value={dataAlamat.kabupaten} onChange={handleAlamatChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Provinsi</label>
            <InputText name="provinsi" value={dataAlamat.provinsi} onChange={handleAlamatChange} className="w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 mt-6">
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Tempat Lahir</label>
            <InputText name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className="w-full" />
          </div>
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Tanggal Lahir</label>
            <Calendar name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="w-full" placeholder="Pilih Tanggal" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">NIK</label>
            <InputText name="nik" value={formData.nik} onChange={handleChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Agama</label>
            <Dropdown name="agama" value={formData.agama} options={agamaOptions} onChange={handleChange} className="w-full" placeholder="Pilih Agama" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Telepon</label>
            <InputText name="telepon" value={formData.telepon} onChange={handleChange} className="w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 mt-6">
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Sekolah Asal</label>
            <InputText name="nama_sekolah" value={formData.nama_sekolah} onChange={handleChange} className="w-full" />
          </div>
          <div className="field  mt-3">
            <label className="block text-sm font-medium mb-2">Email Sekolah</label>
            <InputText name="email" value={formData.email} onChange={handleChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Alamat Sekolah Asal</label>
            <InputText name="alamatSekolah" value={dataAlamatSekolah.alamatSekolah} onChange={handleAlamatSekolahChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Kecamatan Sekolah Asal</label>
            <InputText name="kecamatanSekolah" value={dataAlamatSekolah.kecamatanSekolah} onChange={handleAlamatSekolahChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Kabupaten Sekolah Asal</label>
            <InputText name="kabupatenSekolah" value={dataAlamatSekolah.kabupatenSekolah} onChange={handleAlamatSekolahChange} className="w-full" />
          </div>
          <div className="field">
            <label className="block text-sm font-medium mb-2">Provinsi Sekolah Asal</label>
            <InputText name="provinsiSekolah" value={dataAlamatSekolah.provinsiSekolah} onChange={handleAlamatSekolahChange} className="w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 mt-6">
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Nama Ayah</label>
            <InputText name="namaAyah" value={formData.orangtua.ayah.nama} onChange={handleChange} className="w-full" />
          </div>
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Nama Ibu</label>
            <InputText name="namaIbu" value={formData.orangtua.ibu.nama} onChange={handleChange} className="w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 mt-6">
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Nilai Akhir</label>
            <InputText name="nilai" value={formData.nilai} onChange={handleChange} className="w-full" />
          </div>
          <div className="field mt-3">
            <label className="block text-sm font-medium mb-2">Jurusan yang dipilih</label>
            {/* <span>{formData.jurusan}</span> */}
            <Dropdown name="jurusan" value={formData.jurusan} options={jurusanOption} onChange={handleChange} className="w-full" placeholder="Pilih Jurusan" />
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-6'>
        <div className="w-full">
          <Button
            label='Simpan'
            className='p-button-info w-full h-10 shadow-xl drop-shadow-lg'
          />
        </div>
      </div>
    </form>
  );
};

export default StudentForm;
