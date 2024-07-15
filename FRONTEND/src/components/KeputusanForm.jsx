import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'tailwindcss/tailwind.css';

const FormKeputusan = () => {
  const [formData, setFormData] = useState({
    kategori: '',
    target: '',
    keputusan: ''
  });

  const kategoriOptions = [
    { label: 'Promosi', value: 'Promosi' },
    { label: 'Fasilitas', value: 'Fasilitas' },
    { label: 'Kurikulum', value: 'Kurikulum' },
    { label: 'Biaya', value: 'Biaya' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, kategori: e.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Kategori</label>
        <Dropdown name="kategori" value={formData.kategori} options={kategoriOptions} onChange={handleDropdownChange} className="w-full" placeholder="Pilih Kategori" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Ditujukan kepada</label>
        <InputText name="target" value={formData.target} onChange={handleChange} className="w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Keputusan</label>
        <InputTextarea name="keputusan" value={formData.keputusan} onChange={handleChange} className="w-full h-32"/>
      </div>
      <div className="flex justify-center mt-6">
        <Button label="Simpan" className="p-button-info w-full h-10 shadow-xl drop-shadow-lg" />
      </div>
    </form>
  );
};

export default FormKeputusan;
