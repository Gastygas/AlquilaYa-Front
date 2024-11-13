import styles from "./single.module.css"
import { notFound } from 'next/navigation'
import React from 'react'
import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import Link from 'next/link'

const getUsersById = async (id: string) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/${id}`, {
    method: "GET",
    cache: "no-store"
  })
  const property = await res.json()
  if (!property) { notFound() }

  return property
};

const page = async ({ params }: { params: { id: string } }) => {

  const user = await getUsersById(params.id)

  return (
    <div>
      <HeaderAdmin />
      <div className='container'>
        <div className='padding-section'>
          <h1 className="pb-12 text-primary">{user.name}</h1>
          <div className={`${styles.primary} p-4 border rounded-lg bg-gray-50`}>
            <div className="flex items-center justify-between border-b border-gray-200 py-2">
              <span className="text-primary font-semibold">Nombre:</span>
              <span className="text-gray-600">{user.name} {user.surname}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-2">
              <span className="text-primary font-semibold">Email:</span>
              <span className="text-gray-600">{user.email}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-2">
              <span className="text-primary font-semibold">DNI:</span>
              <span className="text-gray-600">{user.dni}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-2">
              <span className="text-primary font-semibold">Country:</span>
              <span className="text-gray-600">{user.country}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-2">
              <span className="text-primary font-semibold">Dirección:</span>
              <span className="text-gray-600">{user.address}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-2">
              <span className="text-primary font-semibold">Teléfono:</span>
              <span className="text-gray-600">{user.phone}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-primary font-semibold">Favoritos:</span>
              <div className="text-center">
                <button className="bg-primary text-secondary px-4 py-2 rounded font-semibold">
                  Eliminar Usuario
                </button>
              </div>
            </div>
          </div>
          <Link href="/admin/usuarios"><button className={styles.button}>Volver</button></Link>
        </div>
      </div>
    </div >
  )
}

export default page