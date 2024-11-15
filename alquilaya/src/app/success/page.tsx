"use client";
import Header from "@/Components/Header/Header";
import { IUser } from "@/Interfaces/IUser";
import { getUserData } from "@/services/dataUserService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
      } else {
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR"); // Formato DD/MM/YYYY
  };

  const latestBooking = userData?.bookings[userData.bookings.length - 1];

  return (
    <div>
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl text-center font-semibold mb-6">
          ¡Reserva Exitosa!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-start space-y-4">
            <h2 className="text-xl font-bold mb-4">Detalles de la Reserva</h2>
            <p>
              <strong>ID de la reserva:</strong> {latestBooking?.id}
            </p>

            <p>
              <strong>Propiedad:</strong> {latestBooking?.property.propertyName}
            </p>
            <p>
              <strong>Método de pago:</strong>
              {latestBooking?.payment?.method === "credit_card"
                ? "Tarjeta de crédito"
                : latestBooking?.payment?.method === "debit_card"
                ? "Tarjeta de débito"
                : "Otro método de pago"}
            </p>
            <p>
              <strong>Monto: $</strong> {latestBooking?.payment?.amount}
            </p>
            <p>
              <strong>Fecha de inicio:</strong> {formatDate(latestBooking?.dateStart || "")}
            </p>
            <p>
              <strong>Fecha de fin:</strong> {formatDate(latestBooking?.dateEnd || "")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-start space-y-4">
            <h2 className="text-xl font-bold mb-4">Foto de la Propiedad</h2>
            {latestBooking?.property.photos ? (
              <img
                src={latestBooking?.property.photos[0]}
                alt="Foto de la propiedad"
                className="w-full h-64 object-cover rounded-md"
              />
            ) : (
              <p>No hay foto disponible.</p>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          <p>Gracias por elegirnos. ¡Esperamos verte pronto!</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
