"use client"
import React from 'react'
import ButtonCyan from '../ButtonCyan/ButtonCyan'
import Link from 'next/link'

const Step1 = () => {
    return (
        <div className="">
            <h1 className=" text-black  mb-4">Paso 1: Describir la propiedad</h1>
            <textarea
                placeholder="Máximo 500 caracteres"
                className="mt-20 w-full max-w-4xl h-44 p-4 bg-gray-50 border-2 border-[#aa31cf] focus:border-tertiary hover:border-tertiary focus:outline-none transition duration-200 rounded-lg resize-none"
                maxLength={500}
            />
            <div className="absolute  right-6">
                <Link href="/sube-tu-propiedad/step-2"><ButtonCyan  /></Link>
            </div>
        </div>

    )
}

export default Step1;