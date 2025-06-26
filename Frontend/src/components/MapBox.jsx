import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';

const MapBox = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      setUserLocation({ lat: 12.9716, lng: 77.5946 }); // Default: Bangalore
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError("Location access denied. Showing default location.");
        setUserLocation({ lat: 12.9716, lng: 77.5946 });
      }
    );
  }, []);

  useEffect(() => {
    if (!isLoaded || !userLocation) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    const keywords = [
      'nursery', 'plant nursery', 'garden center', 'fertilizer shop',
      'bonsai', 'sapling', 'horticulture', 'agriculture shop', 'greenhouse',
      'bio fertilizer', 'seeds shop', 'indoor plants', 'outdoor plants',
      'compost shop', 'organic shop', 'krishi kendra', 'kisan store',
      'plant wala shop', 'phool shop', 'bagwani shop'
    ];

    const allResults = new Map();
    let completed = 0;

    keywords.forEach((query) => {
      const request = {
        location: userLocation,
        radius: 7000,
        query,
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            if (!allResults.has(place.place_id)) {
              allResults.set(place.place_id, place);
            }
          });
        }

        completed++;
        if (completed === keywords.length) {
          const uniquePlaces = Array.from(allResults.values());
          if (uniquePlaces.length === 0) {
            setError("No nearby plant-related shops found.");
          }
          setPlaces(uniquePlaces);
        }
      });
    });
  }, [isLoaded, userLocation]);

  if (!isLoaded) return <div className="text-center text-white">Loading map script...</div>;
  if (!userLocation) return <div className="text-center text-white">Fetching your location...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-green-300 text-center mb-4">
        Nearby Plant Nurseries
      </h2>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '500px',
          borderRadius: '12px',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.15)'
        }}
        center={userLocation}
        zoom={14}
      >
        <Marker position={userLocation} label="You" />

        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={place.geometry.location}
            onClick={() => setSelectedPlace(place)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.geometry.location}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="text-sm max-w-xs">
              <p className="font-semibold text-green-700">{selectedPlace.name || "Unnamed Place"}</p>
              <p className="text-xs text-gray-700">
                {selectedPlace.formatted_address || selectedPlace.vicinity || "Address not available"}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapBox;