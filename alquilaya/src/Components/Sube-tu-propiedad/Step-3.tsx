"use client";
import React, { useEffect, useState } from "react";
import ButtonCyan from "../ButtonCyan/ButtonCyan";
import { useRouter } from "next/navigation";
import ButtonCyanBack from "../ButtonCyan/ButtonCyanBack";
import styles from "./Steps.module.css"


const Step3: React.FC = () => {
    const router = useRouter();
    const [limitCapacity, setLimitCapacity] = useState<number | "">("");
    const [bedrooms, setBedrooms] = useState<number | "">("");
    const [bathrooms, setBathrooms] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [petFriendly, setPetFriendly] = useState<boolean>(false);

    const checkInput = () => {

        return !!limitCapacity && !!bedrooms && !!bathrooms && !!price
    }

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


    const saveDataPage = () => {
        let data = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")!) : {};
        data.limitCapacity = limitCapacity;
        data.bedrooms = bedrooms;
        data.bathrooms = bathrooms;
        data.price = price;
        data.petFriendly = petFriendly;
        sessionStorage.setItem("data", JSON.stringify(data));
        router.push("/sube-tu-propiedad/paso-4");
    };


    const backPage = () => {
        router.push('/sube-tu-propiedad/paso-2')
    }

    const handleNumberInput = (setter: React.Dispatch<React.SetStateAction<number | "">>) => 
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); 
            setter(value === "" ? "" : Number(value));
        };

    return (
        <div className={styles.box}>

            <div className='py-10'>
                <div>
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
                                onChange={handleNumberInput(setLimitCapacity)}
                                className={styles.inputStyle}
                                required
                                style={{ MozAppearance: "textfield" }}
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
                                // onChange={(e) => setBedrooms(Number(e.target.value) || "")}
                                onChange={handleNumberInput(setBedrooms)}
                                className={styles.inputStyle}
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
                                // onChange={(e) => setBathrooms(Number(e.target.value) || "")}
                                onChange={handleNumberInput(setBathrooms)}
                                className={styles.inputStyle}
                                required
                                style={{ MozAppearance: "textfield" }}
                                
                            />
                        </div>

                        {/* Precio */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="price" className="mb-1 font-medium">Precio por día en PESOS ARGENTINOS, sin puntos ni comas</label>
                            <input
                                type="number"
                                id="price"
                                placeholder="Ingrese sólo números"
                                value={price}
                                // onChange={(e) => setPrice(Number(e.target.value) || "")}
                                onChange={handleNumberInput(setPrice)}
                                className={styles.inputStyle}
                                required
                                style={{ MozAppearance: "textfield" }}
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
                            <label htmlFor="petFriendly" className="font-medium pl-2">Acepta mascotas</label>
                        </div>


                    </form>
                </div>

            </div>

            <div className={styles.nextStep}>
                <ButtonCyan
                    onClick={saveDataPage}
                    isDisabled={!checkInput()}
                />
            </div>

            <div className={styles.backStep}>
                <ButtonCyanBack onClick={backPage} />
            </div>

        </div>

    );
};

export default Step3;
