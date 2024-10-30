"use client"
import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import styles from "./solicitudes.module.css"
import Link from 'next/link';
import IProperty from '@/Interfaces/IProperties';
import { useEffect, useState } from 'react';

const url = "http://localhost:3001/property";

const page = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("user"); // Aquí se obtiene el string

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const token = parsedData.token;
      setToken(token);
    } else {
      alert("No tienes permiso para esto")
    }

    const fetchProperties = async () => {
      const res = await fetch(url, {
        method: "GET",
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Error al obtener las propiedades');
      const data = await res.json();
      setProperties(data);
    };
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await fetch(url, {
      method: "GET",
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Error al obtener las propiedades');
    const data = await res.json();
    setProperties(data);
  };

  const handleApprovedProperty = async (e: any, id: string) => {
    e.preventDefault();

    const res = await fetch(`${url}/approve/${id}`, {
      method: "PATCH",
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Error al cambiar el estado de la propiedad');
    const updatedProperty = await res.json();

    alert("Propiedad aprobada")

    fetchProperties();

    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === id ? { ...property, ...updatedProperty } : property
      )
    );
  };

  const handleDisapprovedProperty = async (e: any, id: string) => {
    e.preventDefault();
    e.preventDefault();

    const res = await fetch(`${url}/deny/${id}`, {
      method: "PATCH",
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Error al cambiar el estado de la propiedad');
    const updatedProperty = await res.json();

    alert("Propiedad Denegada exitosamente")

    fetchProperties();

    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === id ? { ...property, ...updatedProperty } : property
      )
    );
  };

  const pendingProperties = properties.filter((prop) => prop.propertyStatus === "pending");

  if (pendingProperties.length === 0) {
    return (
      <div>
        <HeaderAdmin />
        <div className="container">
          <div className="padding-section">
            <h1 className="pb-12 text-primary">Solicitudes</h1>
            <h4> No tienes solicitudes pendientes</h4>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <HeaderAdmin />
      <div className="container">
        <div className="padding-section">
          <h1 className="pb-12 text-primary">Solicitudes</h1>
          <table className={styles.primary}>
            <thead>
              <tr className="bg-gray-200 text-primary uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre Propiedad</th>
                <th className="py-3 px-6 text-left">Nombre Usuario</th>
                <th className="py-3 px-6 text-center">Precio</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Detalles</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {properties.filter((prop) => prop.propertyStatus === "pending")
                .map((property, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left text-primary">{property.propertyName}</td>
                    <td className="py-3 px-6 text-left">{property.address}</td>
                    <td className="py-3 px-6 text-center">{property.price}</td>
                    <td className="py-3 px-6 text-center">{property.propertyStatus}</td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center">
                        <button className="bg-primary text-secondary px-4 py-2 rounded font-semibold">
                          Ver más
                        </button>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-center flex justify-center gap-4">
                      <button
                        onClick={(e) => handleApprovedProperty(e, property.id)}
                        className="bg-green-400 text-white px-4 py-2 rounded"
                      >
                        Aprobar
                      </button>
                      <button onClick={(e) => handleDisapprovedProperty(e, property.id)}
                        className="bg-red-400 text-white px-4 py-2 rounded">
                        Denegar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Link href="/admin">
            <button className={styles.button}>Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page