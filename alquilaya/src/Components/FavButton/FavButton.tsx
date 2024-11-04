"use client"
import IProperty from "@/Interfaces/IProperties";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"

const url = "http://localhost:3001";

const FavButton = ({propertyId}:any) => {

    const [properties, setProperties] = useState<IProperty>();
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setToken(parsedData.token);
        } 
      }, []);

    const fetchProperties = async (propertyId: string) => {
        const res = await fetch(url + `/property/${propertyId}`, {
          method: "GET",
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('Error al obtener la propiedad');
        const data = await res.json();
        setProperties(data);
      };
    
      const handleFavProperty = async (e: React.MouseEvent, propertyId: string) => {
        e.preventDefault();


        const res = await fetch(`${url}/users/favourite/property/add/${propertyId}`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const err = await res.json();
          return alert(`${err.message === "This is your property, you can not do this with yours"? "No podes agregar a favoritos tu propia propiedad" : "Ya tenes esta propiedad en favoritos" }`)
        };
        alert("Propiedad agregada a favoritos");
        fetchProperties(propertyId);
      };

  return (
    <div><button onClick={(e: React.MouseEvent) => handleFavProperty(e, propertyId)}className='flex text-sm px-10 py-[7px] rounded-[20px]
    cursor-pointer transition-all duration-300 hover:scale-90 text-secondary font-semibold bg-primary mt-10'>
       <FaHeart/>Añadir a favoritos</button></div>
  )
}

export default FavButton