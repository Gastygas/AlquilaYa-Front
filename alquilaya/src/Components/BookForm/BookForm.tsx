"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookForm.module.css";

interface BookFormProps {
  propertyId: string;
  propertyName: string;
  unitPrice: number;
}

const BookForm: React.FC<BookFormProps> = ({ propertyId, propertyName, unitPrice }) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);
  const [isMercadoPagoScriptLoaded, setMercadoPagoScriptLoaded] = useState(false);

  // Cargar userId del localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(storedUser.user?.id || null);
  }, []);

  // Obtener propiedad y fechas reservadas desde el backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/${propertyId}`);
        const data = await response.json();

        if (data && data.reservedDays) {
          // Convertir las fechas ISO en objetos Date
          const formattedDates = data.reservedDays.map((dateString: string) => new Date(dateString));
          setExcludedDates(formattedDates);
        }
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!checkInDate) {
      console.error("Por favor, selecciona la fecha de entrada.");
      return;
    }
  
    // Asegurar que checkOutDate sea al menos un día después de checkInDate
    const adjustedCheckOutDate = new Date(checkInDate);
    adjustedCheckOutDate.setDate(checkInDate.getDate() + 1); // Sumamos 1 día
  
    const daysDifference = Math.ceil(
      (adjustedCheckOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
    );
  
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
          dateStart: checkInDate.toISOString(),
          dateEnd: adjustedCheckOutDate.toISOString(), // Usamos la fecha ajustada
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
        console.error("No se pudo obtener el ID de la preferencia");
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };
  

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

  const formattedDates = excludedDates.map(date => {
    return date.toLocaleDateString('en-GB'); // Formato DD/MM/YYYY
  });
  
  console.log(formattedDates);

  return (
    <>
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
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              dayClassName={(date) => (excludedDates.some((d) => d.getTime() === date.getTime()) ? styles.reservedDate : "")}
              excludeDates={excludedDates}
              dateFormat="yyyy-MM-dd"
              className={styles.input}
              placeholderText="Selecciona la fecha de entrada"
            />
          </div>
          <div>
            <label htmlFor="checkOutDate" className={styles.label}>
              Fecha de Salida
            </label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              minDate={checkInDate || new Date()}
              dayClassName={(date) => (excludedDates.some((d) => d.getTime() === date.getTime()) ? styles.reservedDate : "")}
              excludeDates={excludedDates}
              dateFormat="yyyy-MM-dd"
              className={styles.input}
              placeholderText="Selecciona la fecha de salida"
            />
          </div>
        </div>
        <div className={styles.centerButton}>
          <button type="submit" className={styles.button} onClick={loadMercadoPagoScript}>
            Reservar2
          </button>
        </div>
      </form>
    </>
  );
};

export default BookForm;
