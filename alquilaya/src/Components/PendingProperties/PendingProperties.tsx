// PendingPropertiesTable.tsx
"use client";

import { useState, useEffect } from 'react';
import styles from './Pending.module.css';
import IProperty from '@/Interfaces/IProperties';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface PendingPropertiesTableProps {
  properties: IProperty[];
}

const PendingPropertiesTable: React.FC<PendingPropertiesTableProps> = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState<IProperty[]>(initialProperties);
  const [token, setToken] = useState<string | null>(null);
  const notifyApproveProperty = () => toast.success("Propiedad aprobada", { autoClose: 3000 });
  const notifydeclineProperty = () => toast.success("Propiedad Denegada exitosamente", { autoClose: 3000 });

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property`, {
      method: "GET",
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Error al obtener las propiedades');
    const data = await res.json();
    setProperties(data);
  };

  const handleApprovedProperty = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/approve/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Error al cambiar el estado de la propiedad');
    notifyApproveProperty();
    fetchProperties();
  };

  const handleDisapprovedProperty = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/deny/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Error al cambiar el estado de la propiedad');
    notifydeclineProperty();
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
            <td className="py-3 px-6 text-center">{property.propertyStatus === 'pending'? 'pendiente': ''}</td>
            <td className="border px-4 py-2 text-center">
            <Link href={`/admin/solicitudes/${property.id}`}>
              <button className="bg-primary text-secondary px-4 py-2 rounded font-semibold">
                Ver más
              </button></Link>
            </td>
            <td className="border px-4 py-2 text-center flex justify-center gap-4">
              <button
                onClick={(e) => handleApprovedProperty(e, property.id)}
                className={styles.approve}>Aprobar</button>
              <button
                onClick={(e) => handleDisapprovedProperty(e, property.id)}
                className={styles.deny}>Denegar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PendingPropertiesTable;
