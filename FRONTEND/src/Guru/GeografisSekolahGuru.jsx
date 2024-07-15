import {React, Fragment, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import Geografis from '../components/Geografis';

const GeografisSekolahGuru = () => {

  const sekolahs = [
    {
      "id": 1,
      "name": "SMP Negeri 1 Kisaran",
      "position": {lat: 2.979910555575583, lng: 99.6404969386219},
    },
    {
      "id": 2,
      "name": "SMP Negeri 3 Kisaran",
      "position": {lat: 2.9801779978758063, lng: 99.63782880793916},
    }
  ];

  const mapSekolah = [
    { label:"Data sekolah tertinggi", value: "tertinggi"},
    { label:"Data sekolah terendah", value: "terendah"},
    { label:"Semua data", value: "semua data"}
  ]

  const [selectedMapSekolah, setSelectedMapSekolah] = useState('semua data');

  const pointCenter = { lat: 2.993498258555439, lng: 99.63965980647505}

  return(
    <Fragment>
      <div className='flex w-full'>
        <div className='w-96 absolute z-50' style={{zIndex:'100', marginLeft:'16%', marginTop:"5px"}}>
          <Dropdown 
            value={selectedMapSekolah}
            options={mapSekolah}
            onChange={(e)=> setSelectedMapSekolah(e.value)}
            placeholder='Semua data'
            className='w-64 h-12 shadow-md'
          />
        </div>
        <div style={{width:'98%', height:'90vh', marginLeft:'4px'}}>
          <Geografis
            center={pointCenter}
            zoom={13}
            style={{width:"100%",height:"90vh"}}
            data={sekolahs}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default GeografisSekolahGuru;
