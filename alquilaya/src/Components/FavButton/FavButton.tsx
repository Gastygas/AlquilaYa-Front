"use client"
import IProperty from "@/Interfaces/IProperties";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "./FavButton.module.css"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface IButton {
  propertyId: string;
  propertiesInfo: IProperty; 
  className?: string;
}

const FavButton: React.FC<IButton> = ({propertyId, propertiesInfo, className = "",}) => {

    const [properties, setProperties] = useState<IProperty>();
    const [token, setToken] = useState<string | null>(null);
    const addedTrue = () => toast.success("Propiedad añadida a favoritos", { autoClose: 3000 });
  const addedFalse = () => toast.error("Inicio de sesión fallido, revisá tus datos", { autoClose: 3000 });


    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setToken(parsedData.token);
        } 
      }, []);

    const fetchProperties = async (propertyId: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/${propertyId}`, {
          method: "GET",
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('Error al obtener la propiedad');
        const data = await res.json();
        setProperties(data);
      };
    
      const handleFavProperty = async (e: React.MouseEvent, propertyId: string) => {
        e.preventDefault();


        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/favourite/property/add/${propertyId}`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const err = await res.json();
          return toast(`${err.message === "This is your property, you can not do this with yours"? "No podes agregar a favoritos tu propia propiedad" : "Ya tenes esta propiedad en favoritos" }`)
        };
        addedTrue()
        fetchProperties(propertyId);
      };

  return (
    <div><button onClick={(e: React.MouseEvent) => handleFavProperty(e, propertyId)}className={`${className}`}>
       <FaHeart size={20} color="white"/></button></div>
  )
}

export default FavButton