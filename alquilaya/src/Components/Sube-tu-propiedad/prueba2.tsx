"use client";
import React, { useState } from "react";
import ButtonCyan from "../ButtonCyan/ButtonCyan";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonCyanBack from "../ButtonCyan/ButtonCyanBack";

const Prueba2: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<FileList | null>();
    const maxImages = 5; 
    const maxSize = 2 * 1024 * 1024;
    const router = useRouter();
    const searchParams= useSearchParams()

    const propertyId = searchParams.get('id'); // Reemplaza esto con el ID real o pásalo como prop si es necesario.

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const validFiles = files.filter(file => file.size <= maxSize);

        if (validFiles.length > maxImages) {
            alert(`Solo puedes subir un máximo de ${maxImages} imágenes.`);
            return;
        }

        setSelectedImages(event.target.files);
    };

    const handleUploadImages = async (id:string | null) => {

        if (!selectedImages || !id) {
            alert("No se ha seleccionado una imagen o falta el ID de la propiedad.");
            return;
        }
        const formData = new FormData();
        Array.from(selectedImages).forEach((image) => {
            formData.append("file", image); // Usar el campo 'file' que espera el backend
        });
        try {
            const response = await fetch(`http://localhost:3001/files/${id}`, {
                method: "POST",
                body: formData
                // No configures `Content-Type`, ya que `fetch` lo gestiona cuando envías `FormData`
            });

            if (response.ok) {
                console.log("Imágenes cargadas correctamente.");
                alert("imagen subida")
            } else {
                alert("error")
                console.error("Error al cargar las imágenes.");
            }
        } catch (error) {
            alert("hola soy el catch")
            console.error("Error en la solicitud:", error);
        }
    };

    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-1')
    };

    return (
        <div className="relative bg-gray-100 min-h-screen p-10">
            <h2 className="ml-10 mt-10 text-black mb-2">Paso 6:</h2>

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
                {selectedImages?.length && <p> {selectedImages.length} imagen(es) seleccionada(s)</p>}
            </div>

            <div className="absolute bottom-6 right-6">
                <ButtonCyan onClick={() => handleUploadImages(propertyId)}>Cargar</ButtonCyan>
            </div>
            <div className="absolute bottom-6 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Prueba2