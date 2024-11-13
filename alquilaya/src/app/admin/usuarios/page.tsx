import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import styles from "./usuario.module.css"
import Link from 'next/link';
import UserList from '@/Components/UserList/UserList';

const page = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) throw new Error('Error al obtener los usuarios');
  
  const users = await res.json();
    /*const notifydeclineProperty = () => toast.success("Usuario Eliminado exitosamente", { autoClose: 3000 });

  const handleDenyUser = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/disable/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Error al cambiar el estado de la propiedad');
    notifydeclineProperty();
  };*/

  return (
    <div>
      <HeaderAdmin />
      <UserList users={users}/>
    </div >
  )
}

export default page