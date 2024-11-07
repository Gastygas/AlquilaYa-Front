"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonCyan from '../ButtonCyan/ButtonCyanBack';
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack';

interface PropertyData {
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
  mapLocation?: { lat: number; lng: number };
  invoiceFile?: File | null;
}

const Step5: React.FC = () => {
  const router = useRouter();
  const [propertyData, setPropertyData] = useState<PropertyData>({
    name: '',
    address: '',
    city: '',
    country: '',
    description: '',
  });

  // Cargar datos de sessionStorage usando la misma lógica que en Step1
  useEffect(() => {
    const data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
    setPropertyData((prevData) => ({
      ...prevData,
      ...data, // Mezcla los datos previos con los datos actuales
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para enviar todos los datos al backend
  const handleSubmit = async () => {
    try {
      // Obtener el token de autenticación desde localStorage
      const storedUserData = localStorage.getItem("user");
      let token = "";
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        token = parsedData.token;
      }

      // Guardar datos en sessionStorage antes de enviarlos
      let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
      data = { ...data, ...propertyData }; // Combinar todos los datos
      sessionStorage.setItem("data", JSON.stringify(data));

      // Enviar datos al backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
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
    router.push('/sube-tu-propiedad/paso-4');
  };

  return (
    <div className="box-content relative w-full bg-gray-100 min-h-screen p-10 flex flex-col justify-between text-black">
      <div>
        <h2 className="ml-10 mt-10 text-black mb-2">Paso 5:</h2>
        <h1 className="mt-8 text-black text-center mb-4">Complete la Información de la propiedad</h1>
        <div className="flex justify-center w-full">
          <form className="space-y-6 w-[400px]">
            {/* Inputs para nombre, dirección, ciudad, país, descripción */}
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

            {/* Otros campos de input para address, city, country, description */}
            {/* ...similar structure... */}

          </form>
        </div>
      </div>
      <div className="absolute bottom-6 right-6">
        <ButtonCyan onClick={handleSubmit} isDisabled={false} />
      </div>
      <div className="absolute bottom-6 left-6">
        <ButtonCyanBack onClick={backPage} />
      </div>
    </div>
  );
};

export default Step5;
