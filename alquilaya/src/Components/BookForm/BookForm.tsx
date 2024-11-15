"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import styles from "./BookForm.module.css";
import { IUser } from "@/Interfaces/IUser";
import IProperty from "@/Interfaces/IProperties";
import { toast } from "react-toastify";

interface BookFormProps {
  propertyId: string;
  propertyName: string;
  unitPrice: number;
}

const BookForm: React.FC<BookFormProps> = ({
  propertyId,
  propertyName,
  unitPrice,
}) => {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [property,setProperty] = useState<IProperty | undefined>(undefined)
  const [userId, setUserId] = useState<string | null>(null);
  const [isMercadoPagoScriptLoaded, setMercadoPagoScriptLoaded] = useState(false);
  // const router = useRouter();
  const notifyNoUserLogin = () => toast.error("Para reservar tenes que loguearte primero", {autoClose: 3000 });
  const notifyNoSameId = () => toast.error("No podes reservar tu propia propiedad", {autoClose: 3000 });
  const notifyDatabaseError = () => toast.error("Error en la base de datos, intenta nuevamente refrescando la pagina", {autoClose: 3000 });
  const notifyNoPreferenceId = () => toast.error("No se pudo obtener el ID de preferencia, intenta nuevamente luego", {autoClose: 3000 });

  const fetchProperty = async (id:string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/${id}`, {
        method: "GET",
        cache: "no-store"
      });
      if (!res.ok) throw new Error("Can not get all properties");

      const property = await res.json();
      setProperty(property);
    } catch (err: any) {
      notifyDatabaseError();
      return;
    }
  };

  useEffect(() => {
    fetchProperty(propertyId)
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(storedUser.user?.id || null);
    
  }, []);

  const handleGoToLogin = async(e:any) =>{
    e.preventDefault()
    notifyNoUserLogin()
  }

  const handleCannotReserve = (e:any) =>{
    e.preventDefault()
    notifyNoSameId()
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    const orderData = {
      items: [
        {
          id: "1234",
          title: propertyName,
          quantity: daysDifference,
          unit_price: unitPrice,
        },
      ],

      newBooking: {
        booking: {
          propertyId: propertyId,
          dateStart: checkInDate,
          dateEnd: checkOutDate,
        },
        userId: userId,
      },
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/mercadopago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.preferenceId) {
        setPreferenceId(data.preferenceId);
      } else {
        notifyNoPreferenceId()
      }
    } catch (error) {
      notifyNoPreferenceId()
    }
  };

  // Función para cargar el script solo cuando sea necesario
  const loadMercadoPagoScript = () => {
    if (!isMercadoPagoScriptLoaded) {
      setMercadoPagoScriptLoaded(true);
    }
  };

  useEffect(() => {
    if (preferenceId && isMercadoPagoScriptLoaded && typeof window !== "undefined" && window.MercadoPago) {
      const mp = new window.MercadoPago("TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc", {
        locale: "es-AR",
      });

      mp.checkout({
        preference: {
          id: preferenceId,
        },
        autoOpen: true,
      });
    }
  }, [preferenceId, isMercadoPagoScriptLoaded]);
  

  return (
    <>
      {/* Carga dinámica del script solo cuando se hace clic en el botón de pago */}
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="lazyOnload"
        onLoad={() => console.log("Mercado Pago SDK cargado")}
      />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.boxGrid}>
          <div>
            <label htmlFor="checkInDate" className={styles.label}>
              Fecha de Entrada
            </label>
            <input
              type="date"
              id="checkInDate"
              name="CheckIn"
              placeholder="Fecha de Ingreso"
              className={styles.input}
              onChange={(e) => setCheckInDate(e.target.value)}
              value={checkInDate}
            />
          </div>
          <div>
            <label htmlFor="checkOutDate" className={styles.label}>
              Fecha de Salida
            </label>
            <input
              type="date"
              id="checkOutDate"
              name="CheckOut"
              placeholder="Fecha de Salida"
              className={styles.input}
              onChange={(e) => setCheckOutDate(e.target.value)}
              value={checkOutDate}
            />
          </div>
        </div>
        {userId === null? (
          <div className={styles.centerButton}>
          <button type="submit" className={styles.button} onClick={handleGoToLogin}>
            Reservar
          </button>
        </div>
        ):(
          userId === property?.user.id ? (
            <div className={styles.centerButton}>
          <button type="submit" className={styles.button} onClick={handleCannotReserve}>
            No podes reservar tu propia propiedad
          </button>
        </div>
          ) : (
            <div className={styles.centerButton}>
          <button type="submit" className={styles.button} onClick={loadMercadoPagoScript}>
            Reservar
          </button>
        </div>
          )
        )}
        
      </form>
    </>
  );
};

export default BookForm;