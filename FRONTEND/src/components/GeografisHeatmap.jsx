import React, { useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const GeografisHeatmap = ({ data, center, zoom, style }) => {
  const mapRef = useRef(null);

  const libraries = ['visualization', 'maps']
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const google = window.google;

      const heatmapData = data.map(({ lat, lng }) => new google.maps.LatLng(lat, lng));
      
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
      });

      heatmap.setMap(mapRef.current);
    }
  }, [isLoaded, data]);

  return (
    isLoaded ? (
      <GoogleMap
        onLoad={map => (mapRef.current = map)}
        center={center}
        zoom={zoom}
        mapContainerStyle={style}
      />
    ) : null
  );
};

export default GeografisHeatmap;
