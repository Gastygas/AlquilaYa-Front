import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'

const page = async () => {
  const url = "http://localhost:3001/users";

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error('Error al obtener los usuarios');
  }

  const users = await res.json();

  /*const url = "http://localhost:3001/users"
  
   const getUsers = await fetch(url,{
        method: "GET",
    }).then(users => users.json())
      .catch(err => console.log(err))
    */

  return (
    <div>
      <HeaderAdmin />
      <div className='container'>
        <div className='padding-section'>
          <h1 className="pb-12 text-primary">Usuarios</h1>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Dni</th>
                <th className="py-3 px-6 text-center">Country</th>
                <th className="py-3 px-6 text-center">Dirección</th>
                <th className="py-3 px-6 text-center">Teléfono</th>

              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light"></tbody>
            {users.map((user: any, i: any) => {
              return (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left text-primary">{user.name} {user.surname}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-center">{user.dni}</td>
                  <td className="py-3 px-6 text-center">{user.country}</td>
                  <td className="py-3 px-6 text-center">{user.address}</td>
                  <td className="py-3 px-6 text-center">{user.role}</td>
                </tr>
              )
            })}
        </table>
      </div>
    </div>
</div >
  )
}

export default page