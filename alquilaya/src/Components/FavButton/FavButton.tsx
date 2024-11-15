"use client"
import IProperty from "@/Interfaces/IProperties";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "./FavButton.module.css"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IUser } from "@/Interfaces/IUser";
import { getUserData } from "@/services/dataUserService";

interface IButton {
  propertyId: string;
  propertiesInfo: IProperty; 
  className?: string;
  onRemoveFavorite?:(propertyId: string) => void;
  userId?:string | null
}

const FavButton: React.FC<IButton> = ({propertyId, propertiesInfo, className = "", onRemoveFavorite}) => {

    const [properties, setProperties] = useState<IProperty>();
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<IUser | null>(null);
    const addedTrue = () => toast.success("Propiedad añadida a favoritos", { autoClose: 3000 });
    const removeTrue = () => toast.success("Propiedad removida de favoritas", { autoClose: 3000 });
    const addedFalse = () => toast.error("Inicio de sesión fallido, revisá tus datos", { autoClose: 3000 });
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setToken(parsedData.token);
        } 
        const fetchUserData = async () => {
          const data = await getUserData();
          if (data) {
            setUserData(data);
          }
        }
        fetchUserData()
      }, []);

      useEffect(() => {    
        // Obtener el userId del usuario logueado si está presente en localStorage
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserId(parsedData.user.id);
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
        // Verifica si la propiedad ya está en favoritos
        const isFavorite = userData?.favoriteProperties.includes(propertyId);
    
        // Define la URL y el mensaje dependiendo de la acción (agregar o eliminar)
        const url = isFavorite 
          ? `${process.env.NEXT_PUBLIC_BACK_URL}/users/favourite/property/remove/${propertyId}`
          : `${process.env.NEXT_PUBLIC_BACK_URL}/users/favourite/property/add/${propertyId}`;
        
        const res = await fetch(url, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) {
          const err = await res.json();
          const errorMessage = err.message === "This property is not in your favorites"
            ? "Esta propiedad no está en tus favoritas"
            : err.message;
          return toast(errorMessage);
        }
    
        // Actualiza el estado de favoritos en tiempo real
        setUserData(prevUserData => {
          if (!prevUserData) return prevUserData;
          
          const updatedFavorites = isFavorite
            ? prevUserData.favoriteProperties.filter(id => id !== propertyId) // Remover si está en favoritos
            : [...prevUserData.favoriteProperties, propertyId]; // Agregar si no está
    
          return { ...prevUserData, favoriteProperties: updatedFavorites };
        });
    
        // Notificaciones en función de la acción
        isFavorite ? removeTrue() : addedTrue();
    
        // Refrescar propiedades
        if (isFavorite && onRemoveFavorite) {
          onRemoveFavorite(propertyId);
        }
        fetchProperties(propertyId);
      };

if(userId !== null){
  return (
  
    <div>
      {userData?.favoriteProperties.includes(propertyId) ? (
      <button onClick={(e: React.MouseEvent) => handleFavProperty(e, propertyId)}className={`${className}`}>
       <FaHeart size={20} color="red"/></button>
      ) :(
        <button onClick={(e: React.MouseEvent) => handleFavProperty(e, propertyId)}className={`${className}`}>
       <FaHeart size={20} color="white"/></button>
      )}

    </div>
  )
}else{
return (
  <></>
)
}
      

}

export default FavButton