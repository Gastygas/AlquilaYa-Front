import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import styles from "./usuario.module.css"
import Link from 'next/link';

const page = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) throw new Error('Error al obtener los usuarios');
  
  const users = await res.json();

  return (
    <div>
      <HeaderAdmin />
      <div className='container'>
        <div className='padding-section'>
          <h1 className="pb-12 text-primary">Usuarios</h1>
          <table className={styles.primary}>
            <thead>
              <tr className="bg-gray-200 text-primary  uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Dni</th>
                <th className="py-3 px-6 text-center">Country</th>
                <th className="py-3 px-6 text-center">Dirección</th>
                <th className="py-3 px-6 text-center">Teléfono</th>
                <th className="py-3 px-6 text-center">Favoritos</th>

              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {users.map((user: any, i: any) => {
              return (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left text-primary">{user.name} {user.surname}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-center">{user.dni}</td>
                  <td className="py-3 px-6 text-center">{user.country}</td>
                  <td className="py-3 px-6 text-center">{user.address}</td>
                  <td className="py-3 px-6 text-center">{user.phone}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <button className="bg-primary text-secondary px-4 py-2 rounded font-semibold">
                        Ver más
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
    </div >
  )
}

export default page