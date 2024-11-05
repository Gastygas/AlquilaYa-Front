"use client";
import React, { useState } from "react";
import ButtonCyan from "../ButtonCyan/ButtonCyan";
import { useRouter } from "next/navigation";
import ButtonCyanBack from "../ButtonCyan/ButtonCyanBack";

const Step4: React.FC = () => {
    const router = useRouter();
    const [limitCapacity, setLimitCapacity] = useState<number | "">("");
    const [bedrooms, setBedrooms] = useState<number | "">("");
    const [bathrooms, setBathrooms] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [petFriendly, setPetFriendly] = useState<boolean>(false);

    const saveDataPage = () => {
        let data = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")!) : {};
        data.limitCapacity = limitCapacity;
        data.bedrooms = bedrooms;
        data.bathrooms = bathrooms;
        data.price = price;
        data.petFriendly = petFriendly;
        sessionStorage.setItem("data", JSON.stringify(data));
        router.push("/sube-tu-propiedad/paso-5");
    };
    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-3')
    };

    return (
        <div className="relative bg-gray-100 min-h-screen p-10 flex flex-col justify-between text-black">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">Paso 4: Detalles de la Propiedad</h1>
                <form className="space-y-6">
                    
                    {/* Límite de Capacidad */}
                    <div className="flex flex-col">
                        <label htmlFor="limitCapacity" className="mb-1 font-medium">Límite de Capacidad de personas</label>
                        <input
                            type="number"
                            id="limitCapacity"
                            placeholder="Ingrese límite de capacidad"
                            value={limitCapacity}
                            onChange={(e) => setLimitCapacity(Number(e.target.value) || "")}
                            className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa31cf]"
                            required
                        />
                    </div>

                    {/* Dormitorios */}
                    <div className="flex flex-col">
                        <label htmlFor="bedrooms" className="mb-1 font-medium">Dormitorios</label>
                        <input
                            type="number"
                            id="bedrooms"
                            placeholder="Ingrese cantidad de dormitorios"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(Number(e.target.value) || "")}
                            className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa31cf]"
                            required
                        />
                    </div>

                    {/* Baños */}
                    <div className="flex flex-col">
                        <label htmlFor="bathrooms" className="mb-1 font-medium">Baños</label>
                        <input
                            type="number"
                            id="bathrooms"
                            placeholder="Ingrese cantidad de baños"
                            value={bathrooms}
                            onChange={(e) => setBathrooms(Number(e.target.value) || "")}
                            className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa31cf]"
                            required
                        />
                    </div>

                    {/* Precio */}
                    <div className="flex flex-col">
                        <label htmlFor="price" className="mb-1 font-medium">Precio</label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Ingrese el precio"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value) || "")}
                            className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa31cf]"
                            required
                        />
                    </div>

                    {/* Acepta Mascotas */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="petFriendly"
                            checked={petFriendly}
                            onChange={(e) => setPetFriendly(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="petFriendly" className="font-medium">Acepta Mascotas</label>
                    </div>

                    <div className="absolute bottom-6 right-6">
                        <ButtonCyan onClick={saveDataPage}>Guardar y Continuar</ButtonCyan>
                    </div>
                    <div className="absolute bottom-6 left-6">
                        <ButtonCyanBack onClick={backPage} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Step4;
