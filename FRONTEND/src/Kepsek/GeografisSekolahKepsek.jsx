import React, { Fragment, useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import Geografis from '../components/Geografis';

const GeografisSekolahOwner = ({ siswaData }) => {
  const [selectedMapSekolah, setSelectedMapSekolah] = useState('semua data');
  const [sekolahs, setSekolahs] = useState([]);

  useEffect(() => {
    const processSekolahData = () => {
      const processedData = [];
      for (const [key, value] of Object.entries(siswaData.dataGeoSekolah || {})) {
        const coordinates = JSON.parse(key); // Parse string to array
        processedData.push({
          id: processedData.length + 1,
          name: value.nama,
          position: { lat: coordinates[1], lng: coordinates[0] },
          count: value.count,
        });
      }
      setSekolahs(processedData);
    };

    if (siswaData && siswaData.dataGeoSekolah) {
      processSekolahData();
    }
  }, [siswaData]);

  const mapSekolah = [
    { label: "Data sekolah tertinggi", value: "tertinggi" },
    { label: "Data sekolah terendah", value: "terendah" },
    { label: "Semua data", value: "semua data" }
  ];

  const pointCenter = { lat: 2.993498258555439, lng: 99.63965980647505 };

  const filterSekolahs = () => {
    switch (selectedMapSekolah) {
      case 'tertinggi':
        return sekolahs.sort((a, b) => b.count - a.count).slice(0, 5);
      case 'terendah':
        return sekolahs.sort((a, b) => a.count - b.count).slice(0, 5);
      case 'semua data':
      default:
        return sekolahs;
    }
  };

  return (
    <Fragment>
      <div className='flex w-full'>
        <div className='w-96 absolute z-50' style={{ zIndex: '100', marginLeft: '16%', marginTop: "5px" }}>
          <Dropdown
            value={selectedMapSekolah}
            options={mapSekolah}
            onChange={(e) => setSelectedMapSekolah(e.value)}
            placeholder='Semua data'
            className='w-64 h-12 shadow-md'
          />
        </div>
        <div style={{ width: '98%', height: '90vh', marginLeft: '4px' }}>
          <Geografis
            center={pointCenter}
            zoom={13}
            style={{ width: "100%", height: "90vh" }}
            data={filterSekolahs()}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default GeografisSekolahOwner;
