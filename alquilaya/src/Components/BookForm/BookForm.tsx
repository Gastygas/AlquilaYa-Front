"use client"
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import styles from './BookForm.module.css';

interface BookFormProps {
  propertyId: string;
  propertyName: string;
  unitPrice: number;
}

const BookForm: React.FC<BookFormProps> = ({ propertyId, propertyName, unitPrice }) => {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  // const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const orderData = {
      items: [
        {
          id: "1234",
          title: "Producto de ejemplo",
          quantity: 1,
          unit_price: 1000,
          // Precio en tu moneda local (en este caso 1000)
        },
      ],

      newBooking: {
        booking: {
          propertyId: "c04855bc-06b9-4340-bd7e-b51d11293133",
          dateEnd: "2025-30-04",
          dateStart: "2022-05-05",
        },

        userId: "aab3d6e7-6468-47b2-8010-8f796fb305d6",
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

  useEffect(() => {
    if (preferenceId && typeof window !== 'undefined' && window.MercadoPago) {
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
  }, [preferenceId]);

  return (
    <>
      <Script src="https://sdk.mercadopago.com/js/v2" strategy="beforeInteractive" />

      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8 p-12">
          <div>
            <label htmlFor="checkInDate" className={styles.label}>Fecha de Entrada</label>
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
            <label htmlFor="checkOutDate" className={styles.label}>Fecha de Salida</label>
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
        <div className="flex justify-center">
          <button type="submit" className={styles.button}>Reservar</button>
        </div>
      </form>
    </>
  );
};

export default BookForm;
