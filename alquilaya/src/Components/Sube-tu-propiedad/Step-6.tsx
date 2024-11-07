"use client";
import React, { useState } from "react";
import ButtonCyan from "../ButtonCyan/ButtonCyan";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonCyanBack from "../ButtonCyan/ButtonCyanBack";

const Step6: React.FC = () => {
    const searchParams = useSearchParams()
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedBill, setSelectedBill] = useState<FileList| null>();
    const maxImages = 5;
    const maxSize = 2 * 1024 * 1024;
    const router = useRouter();
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

    const handleBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const validFiles = files.filter(file => file.size <= maxSize);

        if (validFiles.length > maxImages) {
            alert(`Solo puedes subir un máximo de ${maxImages} imágenes.`);
            return;
        }

        setSelectedBill(event.target.files);
    };

    const handleUploadBillImage = async (id:string | null) => {

        if (!selectedBill || !id) {
            alert("No se ha seleccionado una imagen o falta el ID de la propiedad.");
            return;
        }

        const formData = new FormData();
        Array.from(selectedBill).forEach((image) => {
            formData.append("file", image); // Usar el campo 'file' que espera el backend
        });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/files/bill/${id}`, {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                alert("Tu factura se subio correctamente!")
                
            } else {
                alert("Error al cargar las imágenes.");
            }
        } catch (error) {
            alert("Error en la solicitud");
        }
    };
    const handleUploadPropertyImages = async (id:string | null) => {
        if (!selectedBill || !id) {
            alert("No se ha seleccionado una imagen o falta el ID de la propiedad.");
            return;
        }
        const formData = new FormData();
        Array.from(selectedImages).forEach((image) => {
            formData.append("file", image); // Usar el campo 'file' que espera el backend
        });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/files/property/${id}`, {
                method: "POST",
                body: formData,
            });

            const res = await response.json()

            if (res.photos) {
                alert("Tu propiedad se subio correctamente, ahora espera hasta que un administrador la evalue. Te llegara un mail si fue aprobada o denegada tu propiedad. Muchas gracias, exitos!");
                router.push("/");
            } else {
                alert("Error al cargar las imágenes.");
            }
        } catch (error) {
            alert("Error en la solicitud:");
        }
    };

    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-5')
    };

    return (
        <div className="box-content relative w-full min-h-screen p-10 flex flex-col justify-between text-black">
            <div>
                <div>
                    <h2 className="ml-10 mt-10 text-black mb-2">Paso 6:</h2>
                    <h3 className="mt-8 text-black text-center mb-4">Subí una factura de la propiedad</h3>
                </div>
                <div className="w-full flex justify-center mt-10">
                    <input
                        type="file"
                        name="invoiceFile"
                        onChange={handleBillChange}
                        className="bg-gray-50 border-2 border-[#aa31cf] rounded-lg p-2"
                    />
                </div>

                <button className="" disabled={selectedBill === undefined} onClick={(e:any) => handleUploadBillImage(propertyId)}>Subir tu factura</button>

                <h3 className="mt-8 text-black text-center mb-4">Subi una foto de la propiedad</h3>

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
            </div>

            <div className="absolute bottom-6 right-6">
                <ButtonCyan onClick={(e:any)=> handleUploadPropertyImages(propertyId)}></ButtonCyan>
            </div>
            <div className="absolute bottom-6 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Step6;
