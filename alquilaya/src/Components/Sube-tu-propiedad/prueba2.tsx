"use client";
import React, { useState } from "react";
import ButtonCyan from "../ButtonCyan/ButtonCyan";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonCyanBack from "../ButtonCyan/ButtonCyanBack";

const Prueba2: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const maxImages = 5; 
    const maxSize = 2 * 1024 * 1024;
    const router = useRouter();
    const searchParams= useSearchParams()

    const propertyId = searchParams.get('id'); // Reemplaza esto con el ID real o pásalo como prop si es necesario.

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const validFiles: File[] = files.filter(file => file.size <= maxSize);

        if (validFiles.length > maxImages) {
            alert(`Solo puedes subir un máximo de ${maxImages} imágenes.`);
            return;
        }

        setSelectedImages(validFiles);
    };

    const handleUploadImages = async (id:string | null) => {
        const formData = new FormData();
        selectedImages.forEach((image, index) => {
        formData.append(`file`, image); // o puedes usar `images[]` para un array de imágenes
        formData.append('name',"123")
    }
    );
        console.log("hola",selectedImages);
        console.log("aaa",formData);
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });
        try {
            const response = await fetch(`http://localhost:3001/files/${id}`, {
                method: "POST",
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                body: JSON.stringify({}),
                // No configures `Content-Type`, ya que `fetch` lo gestiona cuando envías `FormData`
            });

            if (response.ok) {
                console.log("Imágenes cargadas correctamente.");
                router.push('/propiedades/page.tsx');
            } else {
                console.error("Error al cargar las imágenes.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-1')
    };

    return (
        <div className="relative bg-gray-100 min-h-screen p-10">
            <h2 className="ml-10 mt-10 text-black mb-2">Paso 6:</h2>
            {/* <h1 className="mt-20 text-black text-center mb-4">Subí una factura de la propiedad</h1>
        <div className="flex flex-col gap-2 text-gray-700"> 
          <input
            type="file"
            name="invoiceFile"
            onChange={handleUploadImages}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div> */}

            {/* <h1 className="mt-20 text-black text-center mb-4">Subí las fotos de la propiedad</h1> */}

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
                <ButtonCyan onClick={() => handleUploadImages(propertyId)}>Cargar</ButtonCyan>
            </div>
            <div className="absolute bottom-6 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Prueba2