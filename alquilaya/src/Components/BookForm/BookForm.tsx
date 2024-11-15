"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookForm.module.css";
import { set } from "react-datepicker/dist/date_utils";
import { toast } from "react-toastify";
import IProperty from "@/Interfaces/IProperties";

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
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userIdValidate, setUserIdValidate] = useState<string | null>(null);
  const [property,setProperty] = useState<IProperty | undefined>(undefined)
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);
  const [isMercadoPagoScriptLoaded, setMercadoPagoScriptLoaded] =
    useState(false);

    const notifyNoUserLogin = () => toast.error("Para reservar tenes que loguearte primero", {autoClose: 3000 });
  const notifyNoSameId = () => toast.error("No podes reservar tu propia propiedad", {autoClose: 3000 });
  const notifyDatabaseError = () => toast.error("Error en la base de datos, intenta nuevamente refrescando la pagina", {autoClose: 3000 });
  const notifyNoPreferenceId = () => toast.error("No se pudo obtener el ID de preferencia, intenta nuevamente luego", {autoClose: 3000 });
  // Cargar userId del localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(storedUser.user?.id || null);
  }, []);


  const fetchValidateProperty = async (id:string) => {
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
    fetchValidateProperty(propertyId)
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUserIdValidate(storedUser.user?.id || null);
    
  }, []);

  const handleGoToLogin = async(e:any) =>{
    e.preventDefault()
    notifyNoUserLogin()
  }

  const handleCannotReserve = (e:any) =>{
    e.preventDefault()
    notifyNoSameId()
  }

  // Obtener propiedad y fechas reservadas desde el backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/property/${propertyId}`
        );
        const data = await response.json();

        if (data && data.reservedDays) {
          // Convertir las fechas ISO en objetos Date
          const formattedDates = data.reservedDays.map(
            (dateString: string) => new Date(dateString)
          );

          const excluir = formattedDates.map(
            (date: any) => date.toISOString().split("T")[0]
          ); // Solo toma la fecha (YYYY-MM-DD)

          // Convierte las fechas formateadas de vuelta a objetos Date
          const excluirformateado = excluir.map((isoDate: any) => {
            const [year, month, day] = isoDate.split("-"); // Divide la fecha ISO en partes
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Devuelve un objeto Date
          });

          // Asigna las fechas a excludedDates
          setExcludedDates(excluirformateado);

          // Loguear las fechas en diferentes formatos
          console.log(
            "Fechas crudas del backend (reservedDays):",
            data.reservedDays
          );
          console.log(
            "Fechas reservadas (ISO):",
            formattedDates.map((date: any) => date.toISOString())
          );

          console.log(
            "Fechas reservadas (DD/MM/YYYY):",
            formattedDates.map((date: any) => date.toLocaleDateString("en-GB"))
          );
        }
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
      }
    };

    fetchProperty();
  }, [propertyId]);

  // Loguear cambios en las fechas excluidas
  useEffect(() => {
    console.log(
      "Fechas excluidas actualizadas (ISO):",
      excludedDates.map((date) => date.toISOString())
    );
    console.log(
      "Fechas excluidas actualizadas (DD/MM/YYYY):",
      excludedDates.map((date) => date.toLocaleDateString("es-AR"))
    );
  }, [excludedDates]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkInDate || !checkOutDate) {
      console.error("Por favor, selecciona las fechas de entrada y salida.");
      return;
    }

    const daysDifference = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
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
          dateEnd: checkOutDate.toISOString(),
        },
        userId: userId,
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/mercadopago`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

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
    if (
      preferenceId &&
      isMercadoPagoScriptLoaded &&
      typeof window !== "undefined" &&
      window.MercadoPago
    ) {
      const mp = new window.MercadoPago(
        "TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc",
        {
          locale: "es-AR",
        }
      );

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
        onLoad={() => console.log("Mercado Pago SDK cargado")}
      />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.boxGrid}>
          <div className={styles.boxInput}>
            <label htmlFor="checkInDate" className={styles.label}>
              Fecha de Entrada
            </label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              dayClassName={(date) =>
                excludedDates.some((d) => d.getTime() === date.getTime())
                  ? styles.reservedDate
                  : ""
              }
              excludeDates={excludedDates}
              dateFormat="yyyy-MM-dd"
              className={styles.input}
              placeholderText="Fecha de entrada"
            />
          </div>
          <div className={styles.boxInput}>
            <label htmlFor="checkOutDate" className={styles.label}>
              Fecha de Salida
            </label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              minDate={checkInDate || new Date()}
              dayClassName={(date) =>
                excludedDates.some((d) => d.getTime() === date.getTime())
                  ? styles.reservedDate
                  : ""
              }
              excludeDates={excludedDates}
              dateFormat="yyyy-MM-dd"
              className={styles.input}
              placeholderText="Fecha de salida"
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
