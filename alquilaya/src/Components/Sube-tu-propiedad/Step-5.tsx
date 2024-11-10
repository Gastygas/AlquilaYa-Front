"use client";
import React, { useEffect, useState } from "react";
import ButtonCyan from "../ButtonCyan/ButtonCyan";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonCyanBack from "../ButtonCyan/ButtonCyanBack";
import styles from "./Step-5.module.css"
import { getPropertyById} from "@/services/dataUserService";

const Step5: React.FC = () => {
    const searchParams = useSearchParams();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedBill, setSelectedBill] = useState<FileList | null>();
    const [userId, setUserId] = useState<string | null>(null);
    const maxImages = 5;
    const maxSize = 2 * 1024 * 1024;
    const router = useRouter();
    const propertyId = searchParams.get('id');

    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserId(parsedData.user.id);
        } 
      }, []);

     const valid = async(propId:string | null,userId:string| null) => {
        const property = await getPropertyById(propId)        
        if(property.user.id !== userId){
            alert("Esta propiedad no te pertenece")
            router.push('/')
        }
    }
    if(userId !== null && userId !== undefined){
        valid(propertyId,userId)
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const validFiles = files.filter(file => file.size <= maxSize);

        if (validFiles.length > maxImages) {
            alert(`Solo puedes subir un máximo de ${maxImages} imágenes.`);
            return;
        }
        setSelectedImages(validFiles);
    };

    const handleBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBill(event.target.files);
    };

    const handleUploadBillImage = async (id: string | null) => {
        if (!selectedBill || !id) {
            alert("No se ha seleccionado una imagen o falta el ID de la propiedad.");
            return;
        }

        const formData = new FormData();
        Array.from(selectedBill).forEach(image => formData.append("file", image));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/files/bill/${id}`, {
                method: "POST",
                body: formData,
            });
            const res = await response.json();
            if (res.success) {
                alert("Tu factura se subió correctamente!");
            } else {
                alert("Error al cargar las imágenes.");
            }
        } catch (error) {
            alert("Error en la solicitud");
        }
    };

    const handleUploadPropertyImages = async (id: string | null) => {
        const formData = new FormData();
        Array.from(selectedImages).forEach(image => formData.append("file", image));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/files/property/${id}`, {
                method: "POST",
                body: formData,
            });
            const res = await response.json();
            if (res.success) {
                alert("Imagen subida correctamente");
            } else {
                alert("Error al cargar las imágenes.");
            }
        } catch (error) {
            alert("Error en la solicitud:");
        }
    };

    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-4');
    };

    const handleBackHome= () => {
        alert("Tu propiedad se ha subido correctamente. Ahora, espera a que un administrador la evalúe.Te llegara una notifiacion por mail si te fue aprobada o denegada. Gracias por llenar el formulario correctamente. Te enviaremos al home")
        router.push("/")
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Subí una factura de la propiedad</h2>
            <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Selecciona un archivo de factura (obligatorio)</label>
                <input
                    type="file"
                    name="invoiceFile"
                    onChange={handleBillChange}
                    className={styles.fileInput}
                />
                <button
                    className={styles.button}
                    disabled={!selectedBill}
                    onClick={() => handleUploadBillImage(propertyId)}
                >
                    Enviar Factura
                </button>
                {selectedBill === undefined && <p className={styles.instructions}>Por favor, sube una imagen de la factura.</p>}
            </div>

            <h2 className={styles.heading}>Subí una foto de la propiedad</h2>
            <div className={styles.container}>
                <label className={styles.inputLabel}>Solo puedes subir una foto a la vez. La primera sera la foto de portada asi que elige bien</label>
                <label className={styles.inputLabel}>Recuerda que puedes subir hasta 5 fotos</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                />
                 {selectedImages.length > 0 ? (
                    <p className={styles.previewCount}>{selectedImages.length} imágenes seleccionadas</p>
                ) : (<p className={styles.instructions}>Por favor, sube una foto de la propiedad</p>)}
                
                <button
                    className={styles.button}
                    onClick={() => handleUploadPropertyImages(propertyId)}
                >
                    Enviar Foto
                </button>
               
            </div>

            <div className="absolute bottom-1/2 right-6">
                <ButtonCyan onClick={() => handleBackHome()} isDisabled={selectedImages.length === 0} />
            </div>
            <div className="absolute bottom-1/2 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Step5;
