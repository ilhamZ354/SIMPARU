import {React, Fragment, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import GeografisHeatmap from '../components/GeografisHeatmap';

const GeografisSiswaGuru = () => {

  const wilayah = [
    {lat: 2.9801779978758063, lng: 99.63782880793916},
    {lat: 2.9801779978758063, lng: 99.63782880793916},
    {lat: 2.9801779978758063, lng: 99.63782880793916},
    {lat: 2.9801779978758063, lng: 99.63782880793916},
    {lat: 2.9801779978758063, lng: 99.63782880793916},
    {lat: 2.9801779978758063, lng: 99.63782880793916},
    {lat: 2.9801779978758063, lng: 99.63782880793916},
    {lat: 2.9801779978758063, lng: 99.63782880793916},
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
          <GeografisHeatmap
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

export default GeografisSiswaGuru;
