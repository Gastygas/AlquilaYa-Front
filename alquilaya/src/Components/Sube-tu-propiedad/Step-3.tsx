"use client"
import React, { useState } from 'react'
import ButtonCyan from '../ButtonCyan/ButtonCyan'
import Link from 'next/link'
import IconSelector from '../IconSelector/IconSelector'
import { useRouter } from 'next/navigation'
import ButtonCyanBack from '../ButtonCyan/ButtonCyanBack'


const Step3 = () => {
    const selected: null|any = null
    const router = useRouter(); // Instanciamos el enrutador para poder navegar entre pasos
    const [isSelected, setIsSelected] = useState(selected);

    const iconData = [
        { icon: '/wifi.png', text: "Wi-Fi" },
        { icon: '/transmision-en-vivo.png', text: "Streaming" },
        { icon: '/parrilla.png', text: "Parrilla" },
        { icon: '/cochera.png', text: "Cochera" },
        { icon: '/patio-interior.png', text: "Patio" },
        { icon: '/piscina.png', text: "Piscina" },
        { icon: '/gimnasio.png', text: "Gimnasio" },
        { icon: '/aire-acondicionado.png', text: "Aire Acondicionado" },
        { icon: '/electrodomestico.png', text: "Electro-domésticos" },
        { icon: '/lavadora.png', text: "Lavadora" },
        { icon: '/obrero.png', text: "Limpieza" },
        { icon: '/porcion-de-comida.png', text: "Catering" },
    ];

    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-2')
    }

    const saveDataPage = () => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
        data.tipe = isSelected?.text
        sessionStorage.setItem("data", JSON.stringify(data))
        router.push('/sube-tu-propiedad/paso-4')
    }

    return (
        <div className="relative bg-gray-100 min-h-screen p-10 flex flex-col justify-between text-black">
            <div>
                <h2 className="ml-10 mt-10 text-black mb-2">Paso 3:</h2>
                <h1 className="mt-20 text-black text-center mb-4">Indicá qué servicios ofrecés</h1>
                <IconSelector data={iconData} isSelected={isSelected} setIsSelected={setIsSelected} />
            </div>

            <div className="absolute bottom-6 right-6">
                <ButtonCyan onClick={saveDataPage} />
            </div>
            
            <div className="absolute bottom-6 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>

        </div>
    )
}

export default Step3;