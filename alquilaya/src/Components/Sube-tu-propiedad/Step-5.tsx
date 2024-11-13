"use client";
import React, { useEffect, useState } from "react";
import ButtonCyan from "../ButtonCyan/ButtonCyan";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonCyanBack from "../ButtonCyan/ButtonCyanBack";
import styles from "./Steps.module.css"
import { getPropertyById } from "@/services/dataUserService";
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Step5: React.FC = () => {
    const searchParams = useSearchParams();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedBill, setSelectedBill] = useState<File[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [billUpdated, setBillUpdated] = useState<string | undefined>(undefined)
    const [imagesUploaded, setImagesUploaded] = useState<string[]>([])
    const maxImages = 5;
    const maxSize = 2 * 1024 * 1024;
    const router = useRouter();
    const propertyId = searchParams ? searchParams.get('id') : null;
    const notifyUploadTrue = () => toast.success("Imagen cargada exitosamente", { autoClose: 3000 });
    const notifyUploadFalse = () => toast.error("Error al cargar las imágenes, revisa su formato o peso", { autoClose: 3000 });
    const notifyMaxImg = () => toast.error("Solo puedes subir un máximo de 5 imágenes.", { autoClose: 3000 });
    const notifyMaxImg2 = () => toast.error("Solo puedes subir una (1) imagen.", { autoClose: 3000 });
    const notifyErrorsolicitud = () => toast.error("Error en la solicitud", { autoClose: 3000 });
    const notifySuccess = () => toast.info('Tu propiedad se ha subido correctamente. Ahora, espera a que un administrador la evalúe.Te llegara una notifiacion por mail si te fue aprobada o denegada. Gracias por llenar el formulario correctamente.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });


    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserId(parsedData.user.id);
        }
        if (selectedBill.length > 0) {
            handleUploadBillImage(propertyId);
            setSelectedBill([])
        }
        if (selectedImages.length > 0) {
            handleUploadPropertyImages(propertyId)
            setSelectedImages([])
        }
    }, [selectedBill, propertyId, selectedImages]);

    const valid = async (propId: string | null, userId: string | null) => {
        const property = await getPropertyById(propId)
        if (property.user.id !== userId) {
            alert("Esta propiedad no te pertenece")
            router.push('/')
        }
    }
    if (userId !== null && userId !== undefined) {
        valid(propertyId, userId)
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const validFiles = files.filter(file => file.size <= maxSize);

        if (validFiles.length > maxImages) {
            notifyMaxImg();
            return;
        }
        setSelectedImages(validFiles);
    };

    const handleBillChange = (event: React.ChangeEvent<HTMLInputElement>, propertyId: string | null) => {
        const files = Array.from(event.target.files || []);
        const validFiles = files.filter(file => file.size <= maxSize);

        if (validFiles.length > maxImages) {
            notifyMaxImg2()
            return;
        }
        setSelectedBill(validFiles);
    };

    const handleUploadBillImage = async (id: string | null) => {

        const formData = new FormData();
        selectedBill.forEach(image => formData.append("file", image));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/files/bill/${id}`, {
                method: "POST",
                body: formData,
            });
            const res = await response.json();
            if (res.success) {
                setBillUpdated(res.property.bill)
                notifyUploadTrue()
            } else {
                notifyUploadFalse()
            }
        } catch (error) {
            notifyErrorsolicitud()
        }
    };

    const handleUploadPropertyImages = async (id: string | null) => {
        await Promise.all(
            selectedImages.map(async (image) => {
                const formData = new FormData();
                formData.append("file", image)
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/files/property/${id}`, {
                        method: "POST",
                        body: formData,
                    });
                    const res = await response.json();
                    if (res.success) {
                        setImagesUploaded(res.property.photos)
                        notifyUploadTrue()
                    } else {
                        notifyUploadFalse()
                    }
                } catch (error) {
                    notifyErrorsolicitud()
                }
            })
        )
    };

    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-4');
    };

    const handleBackHome = () => {
      notifySuccess()
        router.push("/")
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Subí una factura de la propiedad</h2>
            <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Selecciona un archivo de factura <strong>(obligatorio)</strong><br />Tamaño máximo 2mb</label>
                <input
                    type="file"
                    name="invoiceFile"
                    onChange={(e) => handleBillChange(e, propertyId)}
                    className={styles.fileInput}
                />
                {billUpdated === undefined ? (<p className={styles.instructions}>Por favor, sube una imagen de la factura.</p>) : (<div className={styles.divImagesUploaded}><a target="blank" href={billUpdated}> <img className={styles.imagesUploaded} src={billUpdated} alt="url" /></a> </div>)}
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
                {imagesUploaded.length > 0 ? (
                    <div>
                        <div className={styles.divImagesUploaded} >{imagesUploaded.map((image) => <a target="blank" href={image}> <img className={styles.imagesUploaded} src={image} alt="url" /></a>)}</div>
                    </div>
                ) : (<p className={styles.instructions}>Por favor, sube una foto de la propiedad</p>)}
            </div>

            <div className={styles.nextStep}>
                <ButtonCyan onClick={() => handleBackHome()} isDisabled={imagesUploaded.length === 0 || billUpdated === undefined} />
            </div>
            <div className={styles.backStep}>
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Step5;
