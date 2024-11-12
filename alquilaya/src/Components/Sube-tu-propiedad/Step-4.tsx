"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader'
import ButtonCyan from '../ButtonCyan/ButtonCyan';
import { useRouter } from 'next/navigation';
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack';

interface IPropertyData {
  propertyName: string;
  address: string;
  city: string;
  country: string;
  description: string;
  province: string;
  floor?:string;
  room?:string;
  mapLocation: { lat: number; lng: number };
  addressMaps:string;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Step4: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const router = useRouter();

    useEffect(() => {
      const loader = new Loader({
        apiKey: `${process.env.NEXT_PUBLIC_MAPS_KEY}`,
        version: 'weekly',
        libraries: ['places'],
      });
  
      loader.load().then(() => {
        initMap();
      });
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setToken(parsedData.token);
        } 
      }, []);
  
  const [propertyData, setPropertyData] = useState<IPropertyData>({
    propertyName: '',
    address: '',
    city: '',
    country: '',
    description: '',
    province: '',
    room:'',
    floor:'',
    mapLocation: { lat: -34.6037, lng: -58.3816 },
    addressMaps: ''
  });

  const initMap = () => {
    const mapOptions = {
      center: { lat: -38.005965, lng: -57.544678 },
      zoom: 15,
    };
    const mapDiv = document.getElementById('map') as HTMLElement;
    const newMap = new google.maps.Map(mapDiv, mapOptions);
    setMap(newMap);

    const input = document.getElementById('addressMaps') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ['address_components', 'geometry'],
      types: ['address'],
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        const newCoordinates = { lat: location.lat(), lng: location.lng() };
        newMap.setCenter(location);
        if(marker){
          marker.setPosition(newCoordinates)
        } else {
          const newMarker = new google.maps.Marker({
            position: newCoordinates,
            map: newMap,
          });
          setMarker(newMarker);
        }
        const streetNumber = getAddressComponent(place, 'street_number') || '';
        const route = getAddressComponent(place, 'route') || '';
        const fullAddress = `${route} ${streetNumber} `.trim();
        setPropertyData(prevData => ({
          ...prevData,
          address: fullAddress,
          city: getAddressComponent(place, 'locality') || '',
          country: getAddressComponent(place, 'country') || '',
          province: getAddressComponent(place, 'administrative_area_level_1') || '',
          mapLocation: newCoordinates,
          addressUrl: fullAddress,
        }));
      }
    });
  };
  const getAddressComponent = (place: google.maps.places.PlaceResult, type: string) => {
    const component = place.address_components?.find((comp) => comp.types.includes(type));
    return component ? component.long_name : '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
    try {
  
      let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
      console.log('lng',propertyData.mapLocation.lng,"lat",propertyData.mapLocation.lat);
      
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
        lat: String(propertyData.mapLocation.lat),
        lng: String(propertyData.mapLocation.lng),
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
        alert("Ya existe una propiedad con la misma dirección y/o misma habitacion ")
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
          <h2 className="mt-2 text-black text-center mb-8">Complete la Información de la propiedad</h2>
        </div>
        <div className="flex justify-center w-full">
  <form className="space-y-6 w-[400px]">
    <div className="grid grid-cols-2">
      <div>
      <label htmlFor="addresMaps">Busca tu direccion aquí</label>
        <input
         type="text"
         id="addressMaps" 
         name="addressMaps" 
         onChange={ handleChange} 
         value={propertyData.addressMaps}
          placeholder="Dirección"
          className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]" />
      <div id="map" style={{ height: '350px', width: '400px' }}></div>
      </div>
      </div>
    {/* Nombre de la propiedad */}
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

<label htmlFor="address" className="mb-1 font-medium">Dirección</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Dirección"
        value={propertyData.address}
        onChange={handleChange}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf]"
        disabled={true}
        required
      />

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

<label htmlFor="city" className="mb-1 font-medium">Ciudad</label>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Ciudad"
        value={propertyData.city}
        onChange={handleChange}
        disabled={true}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf]"
        required
      />

<label htmlFor="province" className="mb-1 font-medium">Provincia</label>
      <input
        type="text"
        id="province"
        name="province"
        placeholder="Provincia"
        value={propertyData.province}
        onChange={handleChange}
        disabled={true}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf]"
        required
      />

<label htmlFor="country" className="mb-1 font-medium">País</label>
      <input
        type="text"
        id="country"
        name="country"
        placeholder="País"
        value={propertyData.country}
        onChange={handleChange}
        disabled={true}
        className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf]"
        required
      />

<label htmlFor="description" className="mb-1 font-medium">Descripción de la propiedad</label>
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
  </form>
</div>
      </div>
      <div className="absolute bottom-1/2 right-6">
        <ButtonCyan 
        onClick={handleSubmit}
        isDisabled={propertyData.address === "" || propertyData.description === "" || propertyData.propertyName === ""}
         />
      </div>

      <div className="absolute bottom-1/2 left-6">
        <ButtonCyanBack onClick={backPage} />
      </div>

    </div>

  );
};

export default Step4;
