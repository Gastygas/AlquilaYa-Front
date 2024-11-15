"use client"
import IProperty from "@/Interfaces/IProperties"
import styles from "./Approve.module.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

interface PropertyTableProps {
    properties: IProperty[];
  }

const ApprovedProperties:  React.FC<PropertyTableProps> = ({ properties: initialProperties}) => {
  const [token, setToken] = useState<string | null>(null);
  const [properties, setProperties] = useState<IProperty[]>(initialProperties);
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
  return (
    <table className={styles.primary}>
          <thead>
            <tr className={styles.headerForm}>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Dirección</th>
              <th className="py-3 px-6 text-center">Ciudad</th>
              <th className="py-3 px-6 text-center">Precio</th>
              <th className="py-3 px-6 text-center">Estado</th>
              <th className="py-3 px-6 text-center">Detalles</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {properties.filter((prop: IProperty) => {
              return prop.propertyStatus === 'approved'
            }).map((properties: any, i: any) => {
              return (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left text-primary">{properties.propertyName}</td>
                  <td className="py-3 px-6 text-left">{properties.address}</td>
                  <td className="py-3 px-6 text-center">{properties.city}</td>
                  <td className="py-3 px-6 text-center">{properties.price}</td>
                  <td className="py-3 px-6 text-center">{properties.propertyStatus === 'approved' ? 
                   <p className="text-green-600 uppercase text-sm" >activa</p> : <p className=" text-sm text-red-600 rounded uppercase">cancelada</p>}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center">
                    <Link href={`/admin/propiedades/${properties.id}`}>
                      <button className={styles.seeMore}>
                        Ver más
                      </button></Link>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center">

                      <button onClick={(e) => handleDisapprovedProperty(e, properties.id)} className={styles.deleteButton}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
  )
}

export default ApprovedProperties