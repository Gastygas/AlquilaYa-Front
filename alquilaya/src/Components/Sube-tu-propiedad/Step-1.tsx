"use client"
import React, { useEffect, useState } from 'react'
import ButtonCyan from '../ButtonCyan/ButtonCyan'
import IconSelector from '../IconSelector/IconSelector'
import { FcHome } from "react-icons/fc";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { useRouter } from 'next/navigation'
import { IsSelectedItem } from './types';
import styles from "./Steps.module.css"



const Step1 = () => {
    // const selected: null | any = null
    const router = useRouter()
    const [isSelected, setIsSelected] = useState<IsSelectedItem | null>(null);

    useEffect(() => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
        if (data.tipe) {
            setIsSelected({ icon: '', text: data.tipe, id: data.tipeId });
        }
    }, [])

    const iconData = [
        { icon: <FcHome size={72} />, text: "Casa", id: "casa" },
        { icon: '/cabana.png', text: "Cabaña", id: "cabaña" },
        { icon: <PiBuildingApartmentDuotone size={72} />, text: "Departamento", id: "departamento" },
        { icon: '/recurso.png', text: "Hotel", id: "hotel" },
        { icon: '/duplex.png', text: "Dúplex", id: "dúplex" },
        { icon: '/casa-movil.png', text: "Casa Rodante", id: "casa-rodante" },
        { icon: '/invernadero.png', text: "Domo", id: "domo" },
        { icon: '/balcon.png', text: "Loft", id: "loft" },
        { icon: '/camping.png', text: "Carpa", id: "carpa" },
        { icon: '/llave-de-la-habitacion.png', text: "Habitación Privada", id: "habitación-privada" },
        { icon: '/bano.png', text: "Habitación con Baño Privado", id: "habitacion-baño-privado" },
        { icon: '/compartir-el-hogar.png', text: "Habitación Compartida", id: "habitación-compartida" },
    ];

    const handleSelect = (item: IsSelectedItem) => {
        setIsSelected(prevState => {
            if (prevState?.id === item.id) {
                return null;  // Desmarcar si es el mismo icono
            }
            return item;  // Marcar el icono seleccionado
        });
    };

    const saveDataPage = () => {
        const data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
        data.tipe = isSelected?.text || '';
        data.tipeId = isSelected?.id || '';
        sessionStorage.setItem("data", JSON.stringify(data))
        router.push('/sube-tu-propiedad/paso-2')
    }


    return (
        <div className={styles.box}>
            <div className='padding-section'>
                <div>
                    {/* <h3 className="ml-10 mt-1 text-black mb-2">Paso 1:</h3> */}
                    <h1 className="mt-2 text-black text-center mb-8">Elige la opción que mejor describa tu espacio</h1>
                </div>
                <div className=' mb-1'>
                    <IconSelector
                        numCols={4}
                        data={iconData}
                        isSelected={isSelected}
                        setIsSelected={handleSelect}
                    />
                </div>
            </div>

            <div className="absolute bottom-1/2 right-6">
                <ButtonCyan
                    onClick={saveDataPage}
                    isDisabled={!isSelected}
                />
            </div>

        </div>
    )
}

export default Step1;