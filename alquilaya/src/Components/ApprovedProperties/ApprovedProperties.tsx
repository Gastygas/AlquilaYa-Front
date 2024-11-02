"use client"
import IProperty from "@/Interfaces/IProperties"
import styles from "./Approve.module.css"

interface PropertyTableProps {
    properties: IProperty[];
  }

const ApprovedProperties:  React.FC<PropertyTableProps> = ({ properties }) => {
    const handleInfoProperty = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Aquí manejas la lógica para el botón "Eliminar"
      };
  return (
    <table className={styles.primary}>
          <thead>
            <tr className="bg-gray-200 text-primary  uppercase text-sm leading-normal">
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
                   <p className="text-green-600 rounded uppercase text-sm" >activa</p> : <p className=" text-sm text-red-600 rounded uppercase">cancelada</p>}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <button className="bg-primary text-secondary px-4 py-2 rounded font-semibold">
                        Ver más
                      </button>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <button onClick={handleInfoProperty} className="bg-red-400 text-white px-4 py-2 rounded">
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