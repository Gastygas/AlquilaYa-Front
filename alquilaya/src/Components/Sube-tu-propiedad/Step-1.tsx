"use client"
import React from 'react'
import ButtonCyan from '../ButtonCyan/ButtonCyan'

const Step1 = () => {
    return (

        <div className="relative bg-gray-100 min-h-screen p-10">
            <h1 className="mt-20 text-black  mb-4">Paso 1: Describir la propiedad</h1>
            <textarea
                placeholder="Máximo 500 caracteres"
                className="mt-20 ml-60 w-full max-w-4xl h-44 p-4 bg-gray-50 border-2 border-[#aa31cf] focus:border-[#2CFFDE] hover:border-[#2CFFDE] focus:outline-none transition duration-200 rounded-lg resize-none"
                maxLength={500}
            />



            <div className="absolute bottom-6 right-6">
                <ButtonCyan />
            </div>
        </div>
    )
}

export default Step1;