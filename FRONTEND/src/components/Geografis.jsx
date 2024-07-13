import {React, Fragment, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const Geografis = (props) => {
    const data = props.data
    const center = props.center
    const zoom = props.zoom
    const style = props.style

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  });
  
  return(
        isLoaded ? (
          console.log('berhasil mencari'),
            <GoogleMap 
                center={center} 
                zoom={zoom} 
                mapContainerStyle={style}>
                {data.map(({ id, name, position}) => (
                  // eslint-disable-next-line react/jsx-key
                  <MarkerF
                    id={id}
                    name={name}
                    position={position}
                  ></MarkerF>
                ))}
              </GoogleMap>
        ): null
  )
};

export default Geografis;
