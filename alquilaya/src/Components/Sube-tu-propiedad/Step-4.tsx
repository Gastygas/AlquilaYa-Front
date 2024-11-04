"use client";
import React, { useState } from "react";
import ButtonCyan from "../ButtonCyan/ButtonCyan";

const Step5 = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const maxImages = 5; 
    const maxSize = 2 * 1024 * 1024; 
    const handleImageChange = (event:any) => {
        const files = Array.from(event.target.files);
        
        
        const validFiles:any = files.filter((file:any) => file.size <= maxSize); // Filtra el tamaño de las fotos

        if (validFiles.length > maxImages) {
            alert(`Solo puedes subir un máximo de ${maxImages} imágenes.`);
            return;
        }

        setSelectedImages(validFiles);
    };

    const handleUploadImages = () => {
        console.log("Imágenes listas para enviar:", selectedImages);
        // Falta la lógica de envío al backend
    };

    return (
        <div className="relative bg-gray-100 min-h-screen p-10">
            <h2 className="ml-10 mt-10 text-black mb-2">Paso 4:</h2>
            <h1 className="mt-20 text-black text-center mb-4">Subí las fotos de la propiedad</h1>

            <div className="w-full flex justify-center mt-10">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-gray-50 border-2 border-[#aa31cf] rounded-lg p-2"
                />
            </div>

            <div className="flex justify-center mt-4">
                {selectedImages.length > 0 && (
                    <p>{selectedImages.length} imagen(es) seleccionada(s)</p>
                )}
            </div>

            <div className="absolute bottom-6 right-6">
                <ButtonCyan onClick={handleUploadImages}>Cargar</ButtonCyan>
            </div>
        </div>
    );
};

export default Step5;
