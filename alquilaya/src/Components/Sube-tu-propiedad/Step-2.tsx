"use client";
import React, { useEffect, useState } from 'react';
import ButtonCyan from '../ButtonCyan/ButtonCyan';
import styles from "./Steps.module.css"
import IconSelector from '../IconSelector/IconSelector';
import { useRouter } from 'next/navigation';
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack';
import { IsSelectedItem } from './types';

const Step2 = () => {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState<IsSelectedItem[]>([]);
    // const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
        if (Array.isArray(data.services)) {
            setIsSelected(data.services);
        }
    }, []);

    const iconData = [
        { icon: '/wifi.png', text: "Wi-Fi", id: "wifi" },
        { icon: '/transmision-en-vivo.png', text: "Streaming", id: "streaming" },
        { icon: '/parrilla.png', text: "Parrilla", id: "grill" },
        { icon: '/cochera.png', text: "Cochera", id: "parking" },
        { icon: '/patio-interior.png', text: "Patio", id: "yard" },
        { icon: '/piscina.png', text: "Piscina", id: "pool" },
        { icon: '/gimnasio.png', text: "Gimnasio", id: "gym" },
        { icon: '/aire-acondicionado.png', text: "Aire Acondicionado", id: "airConditioning" },
        { icon: '/electrodomestico.png', text: "Electro-domésticos", id: "appliance" },
        { icon: '/estufa-electrica.png', text: "Estufa", id: "heating" },
        { icon: '/obrero.png', text: "Limpieza", id: "cleaningService" },
        { icon: '/porcion-de-comida.png', text: "Catering", id: "catering" },
    ];

    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-1');
    };


    const selectServices = (services: IsSelectedItem) => {
       const exist = isSelected.some (s => s.id === services.id)
       const newArr = exist ? isSelected.filter (s => s.id !== services.id): [...isSelected, services]
        setIsSelected(newArr);

    };

    const recorreServicios = () => {
        const selectedServices: { [key: string]: boolean } = {};

        iconData.forEach((service) => {
            // if (isSelected.some((selected) => selected.id === service.id)) {
            //     selectedServices[service.id] = true;
            // } else {
            //     selectedServices[service.id] = false;
            // }
            selectedServices[service.id] = isSelected.some((selected) => selected.id === service.id);
        });

        return selectedServices;
    };


    const saveDataPage = () => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
        // data.services = recorreServicios();
        // sessionStorage.setItem('data', JSON.stringify({...data, ...recorreServicios()}));
        sessionStorage.setItem('data', JSON.stringify({ ...data, services: isSelected }));
        router.push('/sube-tu-propiedad/paso-3');
    };

    // setIsLoading(true); // Activar estado de carga
    // try {
    //     let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
    //     sessionStorage.setItem('data', JSON.stringify({ ...data, services: isSelected }));

    //     setTimeout(() => {
    //         router.push('/sube-tu-propiedad/paso-3'); // Redirige después de guardar
    //     }, 500); // Agrega un pequeño retraso para mejorar la UX
    // } catch (error) {
    //     alert("Hubo un error al guardar los datos. Intenta nuevamente.");
    //     setIsLoading(false); // Desactivar el estado de carga en caso de error
    // }


    return (
        <div className={styles.box}>
            <div className='py-10'>
                <h2 className="mt-2 text-black text-center mb-5">Indicá qué servicios ofrecés</h2>
                <p className="mt-2 text-black text-center mb-8">Selecciona una opción como mínimo</p>
            </div>
            <div className="-mt-4">
                <IconSelector
                    data={iconData}
                    isSelected={isSelected}
                    setIsSelected={selectServices}
                />
            </div>
            <div className={styles.nextStep}>
                <ButtonCyan
                    onClick={saveDataPage}
                    isDisabled={isSelected.length === 0}
                />
            </div>

            <div className={styles.backStep}>
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Step2;
