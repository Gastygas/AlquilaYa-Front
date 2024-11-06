"use client"
import React, { useEffect, useState } from 'react'
import ButtonCyan from '../ButtonCyan/ButtonCyan'
import IconSelector from '../IconSelector/IconSelector'
import { FcHome } from "react-icons/fc";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { useRouter } from 'next/navigation'


const Step1 = () => {
    const selected: null | any = null
    const router = useRouter()
    const [isSelected, setIsSelected] = useState(selected)

    useEffect(() => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
        if (data.tipe) {
            setIsSelected({text: data.tipe})
        }
    }, [])

    const iconData = [
        { icon: <FcHome size={72} />, text: "Casa" },
        { icon: '/cabana.png', text: "Cabaña" },
        { icon: <PiBuildingApartmentDuotone size={72} />, text: "Departamento" },
        { icon: '/recurso.png', text: "Hotel" },
        { icon: '/duplex.png', text: "Dúplex" },
        { icon: '/casa-movil.png', text: "Casa Rodante" },
        { icon: '/invernadero.png', text: "Domo" },
        { icon: '/balcon.png', text: "Loft" },
        { icon: '/casa-ecologica.png', text: "Casa Ecológica" },
        { icon: '/casa-de-huespedes.png', text: "Casa de Húespedes" },
        { icon: '/camping.png', text: "Carpa" },
        { icon: '/carga.png', text: "Contenedor" },
    ];

    const saveDataPage = () => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
        data.tipe = isSelected?.text
        sessionStorage.setItem("data", JSON.stringify(data))
        router.push('/sube-tu-propiedad/paso-2')
    }

    return (
        <div className="box-content relative w-full bg-gray-100 min-h-screen p-10 flex flex-col justify-between text-black">
            <div>
                <div>
                    <h2 className="ml-10 mt-1 text-black mb-2">Paso 1:</h2>
                    <h1 className="mt-2 text-black text-center">Elige la opción que mejor describa tu espacio</h1>
                </div>
                <div className=' mb-1'>
                    <IconSelector numCols={4} data={iconData} isSelected={isSelected} setIsSelected={setIsSelected} />
                </div>
            </div>

            <div className="absolute bottom-6 right-6">
                <ButtonCyan
                    onClick={saveDataPage}
                    isDisabled={!isSelected}
                />
            </div>

        </div>
    )
}

export default Step1;