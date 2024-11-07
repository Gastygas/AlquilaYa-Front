"use client"
import React, { useEffect, useState } from 'react'
import ButtonCyan from '../ButtonCyan/ButtonCyan'
import Link from 'next/link'
import IconSelector from '../IconSelector/IconSelector'
import { useRouter } from 'next/navigation'
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack'
import { IsSelectedItem } from './types'


const Step3 = () => {
    const router = useRouter(); // Instanciamos el enrutador para poder navegar entre pasos
    const [isSelected, setIsSelected] = useState<IsSelectedItem[]>([]);


    useEffect(() => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
        if (data.services) {
            setIsSelected(data.services)
        }
    }, [])

    const iconData = [
        { icon: '/wifi.png', text: "Wi-Fi" },
        { icon: '/transmision-en-vivo.png', text: "Streaming" },
        { icon: '/parrilla.png', text: "Parrilla" },
        { icon: '/cochera.png', text: "Cochera" },
        { icon: '/patio-interior.png', text: "Patio" },
        { icon: '/piscina.png', text: "Piscina" },
        { icon: '/gimnasio.png', text: "Gimnasio" },
        { icon: '/aire-acondicionado.png', text: "Aire Acondicionado" },
        // { icon: '/estufa.png', text: "estufa" },
        { icon: '/electrodomestico.png', text: "Electro-domésticos" },
        // { icon: '/lavadora.png', text: "Lavadora" },
        { icon: '/obrero.png', text: "Limpieza" },
        { icon: '/porcion-de-comida.png', text: "Catering" },
    ];
    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-2')
    }

    const saveDataPage = () => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
        data.services = isSelected
        sessionStorage.setItem("data", JSON.stringify(data))
        router.push('/sube-tu-propiedad/paso-4')
    }

    const selectServices = (s: IsSelectedItem) => {
        setIsSelected([...isSelected, s])
    }

    console.log(isSelected)
    return (
        <div className="box-content relative w-full min-h-screen p-10 flex flex-col justify-between text-black">
            <div>
                <div>
                    <h2 className="ml-10 mt-1 text-black mb-2">Paso 3:</h2>
                    <h1 className="mt-8 text-black text-center mb-4">Indicá qué servicios ofrecés</h1>
                </div>
                <IconSelector data={iconData} isSelected={isSelected} setIsSelected={selectServices} />
            </div>

            <div className="absolute bottom-6 right-6">
                <ButtonCyan
                    onClick={saveDataPage}
                    isDisabled={!isSelected}
                />
            </div>

            <div className="absolute bottom-6 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>

        </div>
    )
}

export default Step3;