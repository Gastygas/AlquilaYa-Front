"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import styles from "./BookForm.module.css";

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

  // const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [isMercadoPagoScriptLoaded, setMercadoPagoScriptLoaded] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(storedUser.user.id || null);
    
  }, []);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    console.log(userId);
    
    
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
      const response = await fetch(`http://localhost:3001/mercadopago`, {
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
        console.error("No se pudo obtener el ID de la preferencia");
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
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
        <div className={styles.centerButton}>
          <button type="submit" className={styles.button} onClick={loadMercadoPagoScript}>
            Reservar
          </button>
        </div>
      </form>
    </>
  );
};

export default BookForm;