"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import ButtonCyan from '../ButtonCyan/ButtonCyan';
import { useRouter } from 'next/navigation';
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack';

interface PropertyData {
  propertyName: string;
  address: string;
  city: string;
  country: string;
  description: string;
  province: string;
  floor?:string;
  room?:string;
  mapLocation?: { lat: number; lng: number };
  invoiceFile?: File | null;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};



const Step4: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setToken(parsedData.token);
        } 
      }, []);
  const [propertyData, setPropertyData] = useState<PropertyData>({
    propertyName: '',
    address: '',
    city: '',
    country: '',
    description: '',
    province: '',
    room:'',
    floor:''
    // mapLocation: { lat: -34.6037, lng: -58.3816 },
    // invoiceFile: null,
  });

  const router = useRouter();

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: 'AIzaSyDLjvqA9G0qab3gX3I6Fv-aUZ_R26WS-nA',
  // });

  // const [map, setMap] = useState<google.maps.Map | null>(null);

  // const onLoad = useCallback((map: google.maps.Map) => {
  //   const bounds = new window.google.maps.LatLngBounds(propertyData.mapLocation);
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, [propertyData.mapLocation]);

  // const onUnmount = useCallback(() => {
  //   setMap(null);
  // }, []);

  // const handleMapClick = (event: google.maps.MapMouseEvent) => {
  //   const latLng = event.latLng;

  //   if (latLng) {
  //     setPropertyData((prevData) => ({
  //       ...prevData,
  //       mapLocation: {
  //         lat: latLng.lat(),
  //         lng: latLng.lng(),
  //       },
  //     }));
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;

  //   if (files && files.length > 0) {
  //     setPropertyData((prevData) => ({
  //       ...prevData,
  //       invoiceFile: files[0],
  //     }));
  //   }
  // };

  // const searchAddress = async () => {
  //   const address = `${propertyData.address}, ${propertyData.city}, ${propertyData.country}`;
  //   const response = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDLjvqA9G0qab3gX3I6Fv-aUZ_R26WS-nA`
  //   );
  //   const data = await response.json();

  //   if (data.results.length > 0) {
  //     const location = data.results[0].geometry.location;
  //     setPropertyData((prevData) => ({
  //       ...prevData,
  //       mapLocation: {
  //         lat: location.lat,
  //         lng: location.lng,
  //       },
  //     }));
  //     if (map) {
  //       map.panTo(location);
  //     }
  //   } else {
  //     alert("Dirección no encontrada. Por favor, verifica los datos.");
  //   }
  // };

  const handleSubmit = async () => {
    try {
  
      let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}

      const formData = {
        type: data.tipe.toLowerCase(),
        propertyName: propertyData.propertyName.toLowerCase(),
        description: propertyData.description.toLowerCase(),
        address: propertyData.address.toLowerCase(),
        city: propertyData.city.toLowerCase(),
        country: propertyData.country.toLowerCase(),
        province: propertyData.province.toLowerCase(),
        floor: propertyData.floor ? propertyData.floor.toLowerCase() : "",
        room: propertyData.room? propertyData.room.toLowerCase() : "",
        price: data.price,
        capacity: data.limitCapacity,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        petFriendly: data.petFriendly,
        airConditioning: data.airConditioning,
        heating: data.heating,
        pool: data.pool,
        parking: data.parking,
        streaming: data.streaming,
        yard: data.yard,
        grill:data.grill,
        gym: data.gym,
        appliance: data.appliance,
        cleaningService: data.cleaningService,
        catering: data.catering,
        wifi: data.wifi,
      }      

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/create`, {
        method: "post",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const res = await response.json()
      if (res.success) {
        alert("Ahora busca una foto de tu propiedad y otra como una factura de luz o agua para que sepamos que te pertenece");
        router.push(`/sube-tu-propiedad/paso-5?id=${res.property.property.id}`);
        return

      } if(res.message === "Invalid Token"){
        alert("Logueate nuevamente porfavor")
        router.push("/login")
        return
      }
      if(res.message === "Address already used"){
        alert("Ya existe una propiedad con la misma dirección")
        return
      }
      else {
        alert(`Faltan estos datos completos: ${res.error.map((err:any) => err.property)}`);
      }
    } catch (error:any) {
      console.log(error);
      alert("Ocurrió un error al enviar los datos.");
    }
  };

  const backPage = () => {
    router.push('/sube-tu-propiedad/paso-3')
  }

  return (
    <div className="box-content relative w-full min-h-screen p-10 flex flex-col justify-between text-black">
      <div>
        <div>
          {/* <h3 className="ml-10 mt-10 text-black mb-2">Paso 5:</h3> */}
          <h2 className="mt-2 text-black text-center mb-8">Complete la Información de la propiedad</h2>
        </div>
        <div className="flex justify-center w-full">
  <form className="space-y-6 w-[400px]">

    {/* Nombre del Propietario */}
    <div className="flex flex-col">
      <label htmlFor="propertyName" className="mb-1 font-medium">Titulo de la propiedad</label>
      <input
        type="text"
        id="propertyName"
        name="propertyName"
        placeholder="Hermoso departamento en ..."
        value={propertyData.propertyName}
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

    <div className="flex flex-col">
      <label htmlFor="floor" className="mb-1 font-medium">Piso (opcional)</label>
      <input
        type="text"
        id="floor"
        name="floor"
        placeholder="3"
        value={propertyData.floor}
        onChange={handleChange}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
        required
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="room" className="mb-1 font-medium">Habitación (opcional)</label>
      <input
        type="text"
        id="room"
        name="room"
        placeholder="A"
        value={propertyData.room}
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
      <label htmlFor="province" className="mb-1 font-medium">Provincia</label>
      <input
        type="text"
        id="province"
        name="province"
        placeholder="Provincia"
        value={propertyData.province}
        onChange={handleChange}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
        required
      />
    </div>

                    <div className="absolute bottom-6 right-6">
                        <ButtonCyan onClick={saveDataPage}>Guardar y Continuar</ButtonCyan>
                    </div>
                    <div className="absolute bottom-6 left-6">
                        <ButtonCyanBack onClick={backPage} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Step4;
