"use client";
import React from 'react';
import ButtonCyan from '../ButtonCyan/ButtonCyan';

const Step4 = () => {
    const handleFinalize = async () => {
        const data = sessionStorage.getItem("data");  // Con esto se recupera los datos almacenados en sessionStorage
        
        if (data) {
            try {
                const response = await fetch('http://localhost:3001/property/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.parse(data),
                });

                if (response.ok) {
                    console.log("Datos enviados correctamente");
                } else {
                    console.error("Error al enviar los datos:", response.statusText);
                }
            } catch (error) {
                console.error("Error al enviar los datos:", error);
            }
        } else {
            console.error("No hay datos para enviar");
        }
    };

    return (
        <div className="relative bg-gray-100 min-h-screen p-10">
            <h2 className="ml-10 mt-10 text-black mb-2">Paso 6:</h2>
            <h1 className="mt-20 text-black text-center mb-4">Describir la propiedad</h1>
            <div className="w-full flex justify-center">
                <textarea
                    placeholder="Máximo 500 caracteres"
                    className="mt-20 flex items-center justify-center w-full max-w-4xl h-44 p-4 bg-gray-50 border-2 border-[#aa31cf] focus:border-[#2CFFDE] hover:border-[#2CFFDE] focus:outline-none transition duration-200 rounded-lg resize-none"
                    maxLength={500}
                />
            </div>

            <div className="absolute bottom-20 right-6">
                <ButtonCyan onClick={handleFinalize} />
            </div>
        </div>
    );
};

export default Step4; 

