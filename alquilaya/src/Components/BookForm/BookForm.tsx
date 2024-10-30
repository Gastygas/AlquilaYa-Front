"use client"
import { useState } from "react";
import styles from "./BookForm.module.css"

interface BookFormProps {
  propertyId: string;
  propertyName: string;
  unitPrice: number;
}

const BookForm: React.FC<BookFormProps> = ({ propertyId, propertyName, unitPrice }) => {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Tipado para requestData
    const requestData = {
      id: propertyId,
      title: propertyName,
      quantity: 1,
      unit_price: unitPrice,
    };

    /*const mp = new MercadoPago("TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc", {
      locale: "es-AR", // Ajusta el idioma de tu región
    });*/


    try {
      // Llamado a la API NestJS en el backend
      const response = await fetch("http://localhost:3001/mercadopago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.preferenceId) {
        // Inicializa el checkout de Mercado Pago con el preferenceId recibido
        const mp = new window.MercadoPago("TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc", {
          locale: "es-AR",
        });

        mp.checkout({
          preference: {
            id: data.preferenceId,
          },
          autoOpen: true,
        });
      } else {
        console.error("No se pudo obtener el ID de la preferencia");
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };

  return (
    <form className="flex flex-col justify-center">
        <div className='grid grid-cols-2 gap-8 p-12'>
            <div>
            <label htmlFor="checkInDate" className={styles.label}>Fecha de Entrada</label>
              <input type='date'
        id='checkInDate'
        name='CheckIn'
        placeholder='Fecha de Ingreso'
        //onChange={handleChange}
        //value={data.email}
        className={styles.input}
      /></div>
            <div>
            <label htmlFor="checkOutDate" className={styles.label}>Fecha de Salida</label>
              <input type='date'
        id='checkOutDate'
        name='CheckIn'
        placeholder='Fecha de Ingreso'
        //onChange={handleChange}
        //value={data.email}
        className={styles.input}
      /></div>
      </div>
      <div className="flex justify-center">
      <button className={styles.button}>Reservar</button>
      </div>
          </form>
  )
}

export default BookForm