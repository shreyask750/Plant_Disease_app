// src/pages/NearbyShops.jsx
import React from 'react';
import MapBox from '@/components/MapBox';

const NearbyShops = () => {
  return (
    <div className="pt-24 min-h-screen bg-gray-900 text-white px-4">
      <MapBox />
    </div>
  );
};

export default NearbyShops;