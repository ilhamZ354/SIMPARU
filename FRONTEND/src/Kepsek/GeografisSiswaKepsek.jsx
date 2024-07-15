import {React, Fragment, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import Geografis from '../components/Geografis';

const GeografisSiswaKepsek = () => {

  const wilayah = [
    {
      "id": 1,
      "name": "Kisaran Timur",
      "position": {lat: 2.990639468544672, lng: 99.63609799297191},
    },
    {
      "id": 2,
      "name": "Rawang Panca Arga",
      "position": {lat: 3.053888381252676, lng: 99.64377014515391},
    },
    {
        "id": 3,
        "name": "Kisaran Barat",
        "position": {lat: 3.0011081260222237, lng: 99.59511192244923},
      },
      {
        "id": 2,
        "name": "Pulo Bandring",
        "position": {lat: 3.00319258878201, lng: 99.55302577636752},
      },
  ];

  const mapWilayah = [
    { label:"Wilayah siswa tertinggi", value: "tertinggi"},
    { label:"Wilayah siswa terendah", value: "terendah"},
    { label:"Persebaran wilayah siswa", value: "semua data"}
  ]

  const [selectedMapWilayah, setSelectedMapWilayah] = useState(mapWilayah[0]);

  const pointCenter = { lat: 2.993498258555439, lng: 99.63965980647505}

  return(
    <Fragment>
      <div className='flex w-full'>
        <div className='w-96 absolute z-50' style={{zIndex:'100', marginLeft:'16%', marginTop:"5px"}}>
          <Dropdown 
            value={selectedMapWilayah}
            options={mapWilayah}
            onChange={(e)=> setSelectedMapWilayah(e.value)}
            placeholder='Semua data'
            className='w-64 h-12 shadow-md'
          />
        </div>
        <div style={{width:'98%', height:'90vh', marginLeft:'4px'}}>
          <Geografis
            center={pointCenter}
            zoom={13}
            style={{width:"100%",height:"90vh"}}
            data={wilayah}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default GeografisSiswaKepsek;
