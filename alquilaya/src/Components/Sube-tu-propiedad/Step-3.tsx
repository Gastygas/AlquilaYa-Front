"use client";
import React, { useEffect, useState } from 'react';
import ButtonCyan from '../ButtonCyan/ButtonCyan';
import Link from 'next/link';
import IconSelector from '../IconSelector/IconSelector';
import { useRouter } from 'next/navigation';
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack';
import { IsSelectedItem } from './types';

const Step3 = () => {
    const router = useRouter(); // Instanciamos el enrutador para poder navegar entre pasos
    const [isSelected, setIsSelected] = useState<IsSelectedItem[]>([]);
    
    // Cargar los datos del sessionStorage si existen
    useEffect(() => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
        if (data.services) {
            setIsSelected(data.services);
        }
    }, []);

    // Estado inicial de los servicios (ServicesVoF)
    const ServicesVoF = {
        wifi: false,
        streaming: false,
        parrilla: false,
        cochera: false,
        patio: false,
        piscina: false,
        gimnasio: false,
        aireAcondicionado: false,
        electrodomesticos: false,
        estufa: false,
        limpieza: false,
        catering: false,
    };

    // Los iconos y los servicios que se pueden seleccionar
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

    // Función para navegar a la página anterior
    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-2');
    };

    // Función para manejar la selección y deselección de servicios
   const selectServices = (services: IsSelectedItem[]) => {
        setIsSelected(services);
    };
    // Función para recorrer los servicios y guardar el estado final
    const recorreServicios = () => {
        const selectedServices: { [key: string]: boolean } = { ...ServicesVoF };

        iconData.forEach((service) => {
            selectedServices[service.id] = isSelected.some((selected) => selected.id === service.id);
        });

        return selectedServices;
    };

    // Función para guardar los datos seleccionados en sessionStorage
    const saveDataPage = () => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {};
        data.services = recorreServicios(); // Guardar los servicios seleccionados
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
                    isDisabled={isSelected.length === 0} // Habilitar el botón solo si hay servicios seleccionados
                />
            </div>

            <div className="absolute bottom-6 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>
        </div>
    );
};

export default Step3;
