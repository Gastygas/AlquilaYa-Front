"use client"
import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import styles from "./propiedades.module.css"
import Link from 'next/link';

const page = async () => {
  const url = "http://localhost:3001/property";

  const res = await fetch(url, {
    method: "GET",
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener los usuarios');

  const properties = await res.json()

  const handleInfoProperty = async (e: any) => {
    e.preventDefault()

  }

  return (
    <div>
      <HeaderAdmin />
      <div className='container'>
        <div className='padding-section'>
          <h1 className="pb-12 text-primary">Propiedades</h1>

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
            {properties.map((properties: any, i: any) => {
              return (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left text-primary">{properties.propertyName}</td>
                  <td className="py-3 px-6 text-left">{properties.address}</td>
                  <td className="py-3 px-6 text-center">{properties.city}</td>
                  <td className="py-3 px-6 text-center">{properties.price}</td>
                  <td className="py-3 px-6 text-center">{properties.propertyStatus}</td>
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
        <Link href="/admin"><button className={styles.button}>Volver</button></Link>
      </div>
      </div>
    </div>
  )
}

export default page