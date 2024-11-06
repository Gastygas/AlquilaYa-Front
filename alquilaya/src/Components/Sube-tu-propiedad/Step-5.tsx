"use client";
import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import ButtonCyan from '../ButtonCyan/ButtonCyan';
import { useRouter } from 'next/navigation';
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack';

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/create`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/sube-tu-propiedad/paso-6');
      } else {
        alert("Error al enviar los datos. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Ocurrió un error al enviar los datos.");
    }
  };

  const backPage = () => {
    router.push('/sube-tu-propiedad/paso-4')
  }

  return (
    <div className="box-content relative w-full bg-gray-100 min-h-screen p-10 flex flex-col justify-between text-black">
      <div>
        <div>
          <h2 className="ml-10 mt-10 text-black mb-2">Paso 5:</h2>
          <h1 className="mt-8 text-black text-center mb-4">Complete la Información de la propiedad</h1>
        </div>
        <div className="flex justify-center w-full">
  <form className="space-y-6 w-[400px]">

    {/* Nombre del Propietario */}
    <div className="flex flex-col">
      <label htmlFor="name" className="mb-1 font-medium">Nombre</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Nombre del Propietario"
        value={propertyData.name}
        onChange={handleChange}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
        required
      />
    </div>

    {/* Dirección */}
    <div className="flex flex-col">
      <label htmlFor="address" className="mb-1 font-medium">Dirección</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Dirección"
        value={propertyData.address}
        onChange={handleChange}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
        required
      />
    </div>

    {/* Ciudad */}
    <div className="flex flex-col">
      <label htmlFor="city" className="mb-1 font-medium">Ciudad</label>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Ciudad"
        value={propertyData.city}
        onChange={handleChange}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
        required
      />
    </div>

    {/* País */}
    <div className="flex flex-col">
      <label htmlFor="country" className="mb-1 font-medium">País</label>
      <input
        type="text"
        id="country"
        name="country"
        placeholder="País"
        value={propertyData.country}
        onChange={handleChange}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
        required
      />
    </div>

    {/* Descripción de la Propiedad */}
    <div className="flex flex-col">
      <label htmlFor="description" className="mb-1 font-medium">Descripción de la Propiedad</label>
      <textarea
        id="description"
        name="description"
        placeholder="Descripción de la Propiedad"
        value={propertyData.description}
        onChange={handleChange}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF] resize-y min-h-[100px]"
        required
      />
    </div>

    {/* Subir Factura para Justificación de Dirección */}
    <div className="flex flex-col">
      <label htmlFor="invoiceFile" className="mb-1 font-medium">Subir factura que coincida con la dirección</label>
      <input
        type="file"
        id="invoiceFile"
        name="invoiceFile"
        onChange={handleFileChange}
        className="bg-white border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] cursor-pointer hover:border-[#4DBDFF]"
        required
      />
    </div>

  </form>
</div>


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
      </div>
      <div className="absolute bottom-6 right-6">
        <ButtonCyan onClick={handleSubmit} />
      </div>

      <div className="absolute bottom-6 left-6">
        <ButtonCyanBack onClick={backPage} />
      </div>

    </div>

  );
};

export default Step5;
