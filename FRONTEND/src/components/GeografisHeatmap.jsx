import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

const HeatmapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(
      data.map(({ lat, lng }) => [lat, lng]),
      {
        radius: 100,
        blur: 20,
        maxOpacity: 0.8,
        minOpacity: 0.2,
        gradient: {
          0.1: 'blue',
          0.2: 'lime',
          0.3: 'yellow',
          0.4: 'orange',
          0.5: 'red'
        }
      }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

const GeografisHeatmap = ({ data, center, zoom, style }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={style}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer data={data} />
    </MapContainer>
  );
};

export default GeografisHeatmap;
