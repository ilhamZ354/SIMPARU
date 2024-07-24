import {React, Fragment, useState } from 'react';
import GeografisHeatmap from '../components/GeografisHeatmap';

const GeografisSiswaGuru = ({ siswaData}) => {
  const { dataGrafikSiswa } = siswaData;

  if (!Array.isArray(dataGrafikSiswa)) {
    console.error('dataGrafikSiswa is not an array or is undefined');
    return null;
  }

  const coordinates = dataGrafikSiswa.map(siswa => siswa.lokasi.coordinates);

  console.log(coordinates)
  const wilayah = coordinates.map(coord => ({
    lat: coord[1], 
    lng: coord[0] 
  }));

  console.log(wilayah)
  const pointCenter = { lat: 2.993498258555439, lng: 99.63965980647505}

  return(
    <Fragment>
      <div className='flex w-full'>
        <div style={{width:'98%', height:'90vh', marginLeft:'4px'}}>
          <GeografisHeatmap
            center={pointCenter}
            zoom={12}
            style={{width:"100%",height:"90vh"}}
            data={wilayah}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default GeografisSiswaGuru;
