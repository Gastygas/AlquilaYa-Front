"use client";
import React, { useEffect, useState } from "react";
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

    const checkInput = () => {

        return !!limitCapacity && !!bedrooms && !!bathrooms && !!price
    }
    console.log(checkInput())

    useEffect(() => {
        let data = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')!) : {}
        if (data.limitCapacity) {
            setLimitCapacity(data.limitCapacity)
        }

        if (data.bedrooms) {
            setBedrooms(data.bedrooms)
        }

        if (data.bathrooms) {
            setBathrooms(data.bathrooms)
        }

        if (data.price) {
            setPrice(data.price)
        }

        if (data.petFriendly) {
            setPetFriendly(data.petFriendly)
        }
    }, [])
    console.log(limitCapacity, bedrooms, bathrooms, price, petFriendly)


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
    }

    return (
        <div className="relative w-full min-h-screen p-10 flex flex-col justify-between text-black box-content">

            <div>
                <div>
                    {/* <h3 className="ml-10 mt-1 text-black mb-2">Paso 4:</h3> */}
                    <h2 className="mt-2 text-black text-center mb-8">Detalles de la Propiedad</h2>
                </div>

                <div className="flex justify-center w-full">
                    <form className="space-y-6 w-[400px]">

                        <div className="flex flex-col">
                            <label htmlFor="limitCapacity" className="mb-1 font-medium">Límite de capacidad de personas
                            </label>
                            <input
                                type="number"
                                id="limitCapacity"
                                placeholder="Ingrese límite de capacidad"
                                value={limitCapacity}
                                onChange={(e) => setLimitCapacity(Number(e.target.value) || "")}
                                className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="bedrooms" className="mb-1 font-medium">Cantidad de dormitorios
                            </label>
                            <input
                                type="number"
                                id="bedrooms"
                                placeholder="Ingrese cantidad de dormitorios"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(Number(e.target.value) || "")}
                                className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="bathrooms" className="mb-1 font-medium">Cantidad de baños</label>
                            <input
                                type="number"
                                id="bathrooms"
                                placeholder="Ingrese cantidad de baños"
                                value={bathrooms}
                                onChange={(e) => setBathrooms(Number(e.target.value) || "")}
                                className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
                                required
                            />
                        </div>

                        {/* Precio */}
                        <div className="flex flex-col">
                            <label htmlFor="price" className="mb-1 font-medium">Precio por día en PESOS ARGENTINOS, sin puntos ni comas</label>
                            <input
                                type="number"
                                id="price"
                                placeholder="Ingrese sólo números"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value) || "")}
                                className="border border-[#aa31cf] p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#aa31cf] hover:border-[#4DBDFF]"
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
                            <label htmlFor="petFriendly" className="font-medium">Acepta mascotas</label>
                        </div>


                    </form>
                </div>

            </div>

            <div className="absolute bottom-1/2 right-6">
                <ButtonCyan
                    onClick={saveDataPage}
                    isDisabled={!checkInput()}
                />
            </div>

            <div className="absolute bottom-1/2 left-6">
                <ButtonCyanBack onClick={backPage} />
            </div>

        </div>

    );
};

export default Step4;
