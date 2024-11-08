"use client";
import React, { useEffect, useState } from 'react';
import ButtonCyan from '../ButtonCyan/ButtonCyan';
import Link from 'next/link';
import IconSelector from '../IconSelector/IconSelector';
import { useRouter } from 'next/navigation';
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack';
import { IsSelectedItem } from './types';

const Step3 = () => {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState<IsSelectedItem[]>([]);


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
        { icon: '/patio-interior.png', text: "Patio", id: "pyard" },
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
            if (isSelected.some((selected) => selected.id === service.id)) {
                selectedServices[service.id] = true;
            } else {
                selectedServices[service.id] = false;
            }
        });

        return selectedServices;
    };


    const saveDataPage = () => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
        // data.services = recorreServicios();
        sessionStorage.setItem('data', JSON.stringify({...data, ...recorreServicios()}));
        router.push('/sube-tu-propiedad/paso-4');
    };

    return (
        <div className="box-content relative w-full min-h-screen p-0 flex flex-col  text-black">
            <div>
                {/* <h3 className="ml-10 mt-1 text-black mb-2">Paso 3:</h3> */}
                <h2 className="mt-2 text-black text-center mb-5">Indicá qué servicios ofrecés</h2>
                <p className="mt-2 text-black text-center mb-8">Selecciona una opcion como mínimo</p>
            </div>
            <div className="-mt-4">
                <IconSelector
                    data={iconData}
                    isSelected={isSelected}
                    setIsSelected={selectServices}
                />
            </div>
            <div className="absolute bottom-1/2 right-6">
                <ButtonCyan
                    onClick={saveDataPage}
                    isDisabled={isSelected.length === 0}
                />
            </div>

            <div className="absolute bottom-1/2 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Step3;
