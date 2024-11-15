"use client";
import IProperty from "@/Interfaces/IProperties";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "./FavButton.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "@/Interfaces/IUser";
import { getUserData } from "@/services/dataUserService";

interface IButton {
  propertyId: string;
  propertiesInfo: IProperty;
  className?: string;
  onRemoveFavorite?: (propertyId: string) => void;
  userId?: string | null;
}

const FavButton: React.FC<IButton> = ({ propertyId, className = "", onRemoveFavorite }) => {
  const [properties, setProperties] = useState<IProperty>();
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addedTrue = () => toast.success("Propiedad añadida a favoritos", { autoClose: 3000 });
  const removeTrue = () => toast.success("Propiedad removida de favoritas", { autoClose: 3000 });

  useEffect(() => {
    const init = async () => {
      try {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setToken(parsedData.token);
          setUserData(await getUserData());
        }
      } catch (err) {
        setError("Error al cargar datos del usuario.");
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const handleFavProperty = async (e: React.MouseEvent, propertyId: string) => {
    e.preventDefault();
    if (!token || !userData) {
      toast.error("Por favor, inicia sesión para agregar favoritos.");
      return;
    }

    const isFavorite = userData.favoriteProperties.includes(propertyId);
    const url = isFavorite
      ? `${process.env.NEXT_PUBLIC_BACK_URL}/users/favourite/property/remove/${propertyId}`
      : `${process.env.NEXT_PUBLIC_BACK_URL}/users/favourite/property/add/${propertyId}`;

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Error al actualizar favoritos");
        return;
      }

      setUserData((prevUserData) => {
        if (!prevUserData) return prevUserData;
        const updatedFavorites = isFavorite
          ? prevUserData.favoriteProperties.filter((id) => id !== propertyId)
          : [...prevUserData.favoriteProperties, propertyId];

        return { ...prevUserData, favoriteProperties: updatedFavorites };
      });

      isFavorite ? removeTrue() : addedTrue();
    } catch {
      toast.error("Error de conexión al servidor.");
    }
  };

  if (isLoading) return null; // Evita renderizar mientras carga
  if (error) {
    toast.error(error);
    return null;
  }

  if (!userData) return null;

  return (
    <div>
      {userData.favoriteProperties.includes(propertyId) ? (
        <button
          onClick={(e) => handleFavProperty(e, propertyId)}
          className={`${className}`}
        >
          <FaHeart size={20} color="red" />
        </button>
      ) : (
        <button
          onClick={(e) => handleFavProperty(e, propertyId)}
          className={`${className}`}
        >
          <FaHeart size={20} color="white" />
        </button>
      )}
    </div>
  );
};

export default FavButton;
