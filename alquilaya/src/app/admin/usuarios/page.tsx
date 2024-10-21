import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import { IUser } from '@/Interfaces/IUser';

const page = async() => {

const url = "http://localhost:3001/users"

 const getUsers = await fetch(url,{
      method: "GET",
  }).then(users => users.json())
    .catch(err => console.log(err))
  
  
  return (
    <div>
    <HeaderAdmin />
    <div className='container'>
        <div className='padding-section'>
        <h1 className="pb-12 text-primary">Usuarios</h1>
        {getUsers.map((user:any) => {
          return(
            <div>
              <h2>{user.name}</h2>
              <h2>{user.surname}</h2>
            </div>
          )
        })}
        </div>
    </div>
</div>
  )
}

export default page