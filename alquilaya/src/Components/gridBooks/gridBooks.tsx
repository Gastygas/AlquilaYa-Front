"use client";
import React, { useEffect, useState } from "react";
import IProperty from "@/Interfaces/IProperties";
import { getPropertyById, getUserData } from "@/services/dataUserService";
import { IUser } from "@/Interfaces/IUser";

const GridBooks = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
        const fetchedProperties = await Promise.all(
          data.favoriteProperties.map((id: string) => getPropertyById(id))
        );
        const validProperties = fetchedProperties.filter(
          (property) => property !== null
        ) as IProperty[];
        setProperties(validProperties);
      } else {
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  if (!userData || userData?.bookings.length === 0) {
    return (
      <div className="text-center">
        <h4>No tienes reservas.. </h4>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-center text-2xl font-semibold mb-6">Tus Reservas</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {userData.bookings.map((booking, index) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-48 w-full mb-6">
              {/* Suponiendo que la propiedad tiene una imagen de portada */}
              <img
                src={userData.bookings[index].property.photos[0]}
                alt="Property"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Detalles de la Reserva</h2>
              <p>{booking.property.propertyName}</p>
              <p>
                <strong>ID de la reserva:</strong> {booking.id}
              </p>
              <p>
                <strong>Método de pago:</strong>
                {userData?.bookings[userData.bookings.length - 1].payment
                  ?.method === "credit_card"
                  ? "Tarjeta de crédito"
                  : userData?.bookings[userData.bookings.length - 1].payment
                      ?.method === "debit_card"
                  ? "Tarjeta de débito"
                  : "Otro método de pago"}
              </p>
              <p>
                <strong>Monto: $</strong>{" "}
                {booking.payment ? booking.payment.amount : "No disponible"}
              </p>
              <p>
                <strong>Fecha de inicio:</strong> {booking.dateStart}
              </p>
              <p>
                <strong>Fecha de fin:</strong> {booking.dateEnd}
              </p>
            </div>

            <div className="text-center mt-4">
              <button
                className="bg-red-500 text-white font-medium py-3 px-8 rounded-xl border-2 border-red-600 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500 transition duration-200 ease-in-out"
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridBooks;
