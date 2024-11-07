"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import ButtonCyan from '../ButtonCyan/ButtonCyan';
import { useRouter } from 'next/navigation';
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack';

interface IPropertyData {
  mapLocation?: { lat: number; lng: number };
  invoiceFile?: File | null;
  propertyName: string;
  address: string;
  addressUrl: string;
  bill: string;
  country: string;
  city: string;
  price: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  wifi?: boolean;
  petFriendly?: boolean;
  airConditioning?: boolean;
  heating?: boolean;
  pool?: boolean;
  parking?: boolean;
  description:string;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Step5: React.FC = () => {
  const propertyToSend:any={}
  
  const router = useRouter();
  const [propertyData, setPropertyData] = useState(propertyToSend);
  const [tokenUser, setTokenUser] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTokenUser(parsedData.token);
    } 
    else{
      alert('algo fallo')
    }
  }, []);


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
      setPropertyData((prevData:any) => ({
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
    setPropertyData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setPropertyData((prevData:any) => ({
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
      setPropertyData((prevData:any) => ({
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
    console.log("propertydata",propertyData.address);
    
   

    // formData.append('lat', String(propertyData.mapLocation.lat));
    // formData.append('lng', String(propertyData.mapLocation.lng));
    let data = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")!) : {};
    data.services.filter((a:string) => {return a }) 
    const formularioGasty = {
      propertyName: propertyData.name,
      address:propertyData.address,
      city:propertyData.city,
      country: propertyData.country,
      description: propertyData.description
      
    }

    console.log("hola soy la data",{...data,...formularioGasty});


    const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenUser}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formularioGasty,...data}),
      });
      const newProperty = await response.json()
      console.log(newProperty);
      
      if (newProperty.name) {

        alert("se creo")
        // router.push('/sube-tu-propiedad/paso-6');
      } 
      if (newProperty.message === 'Invalid Token'){
        return alert("Logeate de nuevo porfavor")
      }
      else {
        return alert(`Revista estos datos: ${newProperty.error.map((err:any) => err.property)}`);
      }

  };

  const backPage = () => {
    router.push('/sube-tu-propiedad/paso-4')
  }

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
        {/* <label className="flex flex-col gap-2 text-gray-700">
          Subir Factura para Justificación de Dirección
          <input
            type="file"
            name="invoiceFile"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
          />
        </label> */}
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
      <div className="absolute bottom-6 left-6">
          <ButtonCyanBack onClick={backPage} />
      </div>
    </div>
    
  );
};

export default Step5;
