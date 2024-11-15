"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookForm.module.css";
import { toast } from "react-toastify";
import IProperty from "@/Interfaces/IProperties";

interface BookFormProps {
  propertyId: string;
  propertyName: string;
  unitPrice: number;
}

const BookForm: React.FC<BookFormProps> = ({ propertyId, propertyName, unitPrice }) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [property,setProperty] = useState<IProperty | undefined>(undefined)
  const [userId, setUserId] = useState<string | null>(null);
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);
  const [isMercadoPagoScriptLoaded, setMercadoPagoScriptLoaded] = useState(false);
  const notifyNoUserLogin = () => toast.error("Para reservar tenes que loguearte primero", { autoClose: 3000 });
  const notifyNoSameId = () => toast.error("No podes reservar tu propia propiedad", { autoClose: 3000 });
  const notifyDatabaseError = () => toast.error("Error en la base de datos, intenta nuevamente refrescando la pagina", { autoClose: 3000 });
  const notifyNoPreferenceId = () => toast.error("No se pudo obtener el ID de preferencia, intenta nuevamente luego", { autoClose: 3000 });

  const fetchProperty = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Can not get the property");

      const property = await res.json();
      setProperty(property);
    } catch (err: any) {
      notifyDatabaseError();
    }
  };

  // Cargar userId del localStorage
  useEffect(() => {
    fetchProperty(propertyId);
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(storedUser.user?.id || null);
  }, []);

  // Obtener propiedad y fechas reservadas desde el backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log(propertyId);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/${propertyId}`);
        const data = await response.json();
        console.log(data);
        
        if (data && data.reservedDays) {
          // Convertir las fechas reservadas en el formato requerido para DatePicker
          const formattedDates = data.reservedDays.map((dateString: string) => new Date(dateString));
          setExcludedDates(formattedDates);
        }
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
      }
    };

    fetchProperty();
  }, [propertyId]);

    
  }, []);

  const handleGoToLogin = async (e: any) => {
    e.preventDefault();
    notifyNoUserLogin();
  };

  const handleCannotReserve = (e:any) =>{
    e.preventDefault()
    notifyNoSameId()
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (!checkInDate || !checkOutDate) {
      console.error("Por favor, selecciona ambas fechas.");
      return;
    }


    onst startDate = new Date(checkInDate);
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
          dateStart: checkInDate.toISOString(),
          dateEnd: checkOutDate.toISOString(),
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
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="lazyOnload"
        onLoad={() => setMercadoPagoScriptLoaded(true)}
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
              dayClassName={(date) => (excludedDates.some(d => d.getTime() === date.getTime()) ? styles.reservedDate : "")}
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
              dayClassName={(date) => (excludedDates.some(d => d.getTime() === date.getTime()) ? styles.reservedDate : "")}
              excludeDates={excludedDates}
              dateFormat="yyyy-MM-dd"
              className={styles.input}
              placeholderText="Selecciona la fecha de salida"
            />
          </div>
        </div>
        {userId === null ? (
          <div className={styles.centerButton}>
            <button type="submit" className={styles.button} onClick={handleGoToLogin}>
              Reservar
            </button>
          </div>
        ) : userId === property?.user.id ? (
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
        )}
      </form>
    </>
  );
};

export default BookForm;
