"use client";
import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import ButtonCyan from '../ButtonCyan/ButtonCyan';
import { useRouter } from 'next/navigation';

interface PropertyData {
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
  mapLocation: { lat: number; lng: number };
  invoiceFile: File | null;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Step5: React.FC = () => {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    name: '',
    address: '',
    city: '',
    country: '',
    description: '',
    mapLocation: { lat: -34.6037, lng: -58.3816 },
    invoiceFile: null,
  });

  const router = useRouter();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDLjvqA9G0qab3gX3I6Fv-aUZ_R26WS-nA',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(propertyData.mapLocation);
    map.fitBounds(bounds);
    setMap(map);
  }, [propertyData.mapLocation]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;

    if (latLng) {
      setPropertyData((prevData) => ({
        ...prevData,
        mapLocation: {
          lat: latLng.lat(),
          lng: latLng.lng(),
        },
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setPropertyData((prevData) => ({
        ...prevData,
        invoiceFile: files[0],
      }));
    }
  };

  const searchAddress = async () => {
    const address = `${propertyData.address}, ${propertyData.city}, ${propertyData.country}`;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDLjvqA9G0qab3gX3I6Fv-aUZ_R26WS-nA`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      setPropertyData((prevData) => ({
        ...prevData,
        mapLocation: {
          lat: location.lat,
          lng: location.lng,
        },
      }));
      if (map) {
        map.panTo(location);
      }
    } else {
      alert("Dirección no encontrada. Por favor, verifica los datos.");
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', propertyData.name);
      formData.append('address', propertyData.address);
      formData.append('city', propertyData.city);
      formData.append('country', propertyData.country);
      formData.append('description', propertyData.description);
      formData.append('lat', String(propertyData.mapLocation.lat));
      formData.append('lng', String(propertyData.mapLocation.lng));
      if (propertyData.invoiceFile) {
        formData.append('invoiceFile', propertyData.invoiceFile);
      }

      const response = await fetch('http://3001/property/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/sube-tu-propiedad/paso-6');
      } else {
        alert("Error al enviar los datos. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Ocurrió un error al enviar los datos.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Complete la Información de la Propiedad</h2>
      <form className="flex flex-col gap-4 w-full">
        <input
          type="text"
          name="name"
          placeholder="Nombre del Propietario"
          value={propertyData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={propertyData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={propertyData.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="country"
          placeholder="País"
          value={propertyData.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Descripción de la Propiedad"
          value={propertyData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-y min-h-[100px]"
        />
        <label className="flex flex-col gap-2 text-gray-700">
          Subir Factura para Justificación de Dirección
          <input
            type="file"
            name="invoiceFile"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
          />
        </label>
      </form>

      {/* Botón de búsqueda de dirección */}
      <button
        onClick={searchAddress}
        className="mt-4 w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold"
      >
        Buscar dirección en el mapa
      </button>

      {/* Mapa de Google */}
      <div className="w-full h-64 my-6 rounded-lg overflow-hidden">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={propertyData.mapLocation}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
          >
            <Marker position={propertyData.mapLocation} />
          </GoogleMap>
        ) : (
          <p className="text-center text-gray-500">Cargando mapa...</p>
        )}
      </div>

      <ButtonCyan onClick={handleSubmit} className="w-full">
        Siguiente
      </ButtonCyan>
    </div>
  );
};

export default Step5;
