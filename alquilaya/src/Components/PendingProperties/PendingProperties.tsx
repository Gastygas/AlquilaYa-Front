// PendingPropertiesTable.tsx
"use client";

import { useState, useEffect } from 'react';
import styles from './Pending.module.css';
import IProperty from '@/Interfaces/IProperties';

interface PendingPropertiesTableProps {
  properties: IProperty[];
}

const url = "http://localhost:3001/property";

const PendingPropertiesTable: React.FC<PendingPropertiesTableProps> = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState<IProperty[]>(initialProperties);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setToken(parsedData.token);
    } else {
      alert("No tienes permiso para esto");
    }
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

  const handleApprovedProperty = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const res = await fetch(`${url}/approve/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Error al cambiar el estado de la propiedad');
    alert("Propiedad aprobada");
    fetchProperties();
  };

  const handleDisapprovedProperty = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const res = await fetch(`${url}/deny/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Error al cambiar el estado de la propiedad');
    alert("Propiedad Denegada exitosamente");
    fetchProperties();
  };

  const pendingProperties = properties.filter((prop) => prop.propertyStatus === "pending");

  if (pendingProperties.length === 0) {
    return <h4>No tienes solicitudes pendientes</h4>;
  }

  return (
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
        {pendingProperties.map((property) => (
          <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left text-primary">{property.propertyName}</td>
            <td className="py-3 px-6 text-left">{property.address}</td>
            <td className="py-3 px-6 text-center">{property.price}</td>
            <td className="py-3 px-6 text-center">{property.propertyStatus}</td>
            <td className="border px-4 py-2 text-center">
              <button className="bg-primary text-secondary px-4 py-2 rounded font-semibold">
                Ver más
              </button>
            </td>
            <td className="border px-4 py-2 text-center flex justify-center gap-4">
              <button
                onClick={(e) => handleApprovedProperty(e, property.id)}
                className="bg-green-400 text-white px-4 py-2 rounded">Aprobar</button>
              <button
                onClick={(e) => handleDisapprovedProperty(e, property.id)}
                className="bg-red-400 text-white px-4 py-2 rounded">Denegar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PendingPropertiesTable;
