import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import UserList from '@/Components/UserList/UserList';

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
      <UserList users={users}/>
    </div >
  )
}

export default page