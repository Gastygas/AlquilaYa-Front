"use client"
import { IUser } from '@/Interfaces/IUser';
import Link from 'next/link';
import styles from "./User.module.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserHistoryProps {
    users: IUser[];
  }

const UserList: React.FC<UserHistoryProps> = ({ users: initialUsers }) => {
    const notifydeclineProperty = () => toast.success("Usuario Eliminado exitosamente", { autoClose: 3000 });
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null);
    const [dataUsers, setDataUsers] = useState<IUser[]>(initialUsers);

    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setToken(parsedData.token);
        } else {
          alert("No tienes permiso para esto");
        }
      }, []);

      const fetchUsers = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users`, {
            method: "GET",
            cache: "no-store",
          });
          const data = await res.json();

          if(data.message === "Invalid Token"){
            alert("Logueate nuevamente porfavor")
            router.push("/login")
            return
          }else if (!res.ok) throw new Error('Error al obtener las propiedades');
          setDataUsers(data);
      }


  const handleDenyUser = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/disable/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Error al cambiar el estado del usuario');
    notifydeclineProperty();
    fetchUsers()
  };


  return (
    <div className='container'>
        <div className='padding-section'>
          <h1 className="pb-12 text-primary">Usuarios</h1>
          <table className={styles.primary}>
            <thead>
              <tr className="bg-gray-200 text-primary  uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Dni</th>
                <th className="py-3 px-6 text-center">País</th>
                <th className="py-3 px-6 text-center">Dirección</th>
                <th className="py-3 px-6 text-center">Favoritos</th>
                <th className="py-3 px-6 text-center">Estado</th>

              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {dataUsers.map((user: any, i: any) => {
              return (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left text-primary">{user.name} {user.surname}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-center">{user.dni}</td>
                  <td className="py-3 px-6 text-center">{user.country}</td>
                  <td className="py-3 px-6 text-center">{user.address}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center">
                    <Link href={`/admin/usuarios/${user.id}`}>
                      <button className="bg-primary text-secondary px-4 py-2 rounded font-semibold">
                        Ver más
                      </button></Link>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-center flex justify-center gap-4">
              <button
               /* onClick={(e) => handleDisapprovedProperty(e, property.id)}*/
                className={styles.deny}>Eliminar</button>
            </td>
                </tr>
              )
            })}
            </tbody>
          </table>
          <Link href="/admin"><button className={styles.button}>Volver</button></Link>
        </div>
      </div>
  )
}

export default UserList