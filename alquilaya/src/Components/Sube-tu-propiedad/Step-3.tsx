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
        if (data.services) {
            setIsSelected(data.services);
        }
    }, []);


    const ServicesVoF = {
        wifi: false,
        streaming: false,
        grill: false,
        parking: false,
        yard: false,
        pool: false,
        gym: false,
        airConditioning: false,
        appliance: false,
        heating: false,
        cleaningService: false,
        catering: false,
    };

    const iconData = [
        { icon: '/wifi.png', text: "Wi-Fi", id: "wifi" },
        { icon: '/transmision-en-vivo.png', text: "Streaming", id: "streaming" },
        { icon: '/parrilla.png', text: "Parrilla", id: "parrilla" },
        { icon: '/cochera.png', text: "Cochera", id: "cochera" },
        { icon: '/patio-interior.png', text: "Patio", id: "patio" },
        { icon: '/piscina.png', text: "Piscina", id: "piscina" },
        { icon: '/gimnasio.png', text: "Gimnasio", id: "gimnasio" },
        { icon: '/aire-acondicionado.png', text: "Aire Acondicionado", id: "aireAcondicionado" },
        { icon: '/electrodomestico.png', text: "Electro-domésticos", id: "electrodomesticos" },
        { icon: '/lavadora.png', text: "Estufa", id: "estufa" },
        { icon: '/obrero.png', text: "Limpieza", id: "limpieza" },
        { icon: '/porcion-de-comida.png', text: "Catering", id: "catering" },
    ];

    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-2');
    };


    const selectServices = (services: IsSelectedItem[]) => {
        setIsSelected(services);
    };

    const recorreServicios = () => {
        const selectedServices: { [key: string]: boolean } = {};

        iconData.forEach((service) => {
            if (isSelected.some((selected) => selected.id === service.id)) {
                selectedServices[service.id] = true;
            }
        });

        return selectedServices;
    };


    const saveDataPage = () => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
        data.services = recorreServicios();
        sessionStorage.setItem('data', JSON.stringify(data));
        router.push('/sube-tu-propiedad/paso-4');
    };

    return (
        <div className="box-content relative w-full bg-gray-100 min-h-screen p-10 flex flex-col justify-between text-black">
            <div>
                <h3 className="ml-10 mt-1 text-black mb-2">Paso 3:</h3>
                <h1 className="mt-8 text-black text-center mb-4">Indicá qué servicios ofrecés</h1>
            </div>

            <IconSelector
                data={iconData}
                isSelected={isSelected}
                setIsSelected={selectServices}
            />

            <div className="absolute bottom-6 right-6">
                <ButtonCyan
                    onClick={saveDataPage}
                    isDisabled={isSelected.length === 0}
                />
            </div>

            <div className="absolute bottom-6 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Step3;
