"use client"
import Link from 'next/link'
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';


const LogOutButtonAdmin = () => {
    const { logout } = useContext(AuthContext);
  return (
    <div className="flex flex-row justify-around items-center gap-6">
    <p className="text-base">Hola, Admin</p> <Link href="/"><button  onClick={logout} className="flex text-sm px-10 py-[7px] rounded-[20px]
    cursor-pointer transition-all duration-300 hover:scale-90 bg-primary text-secondary font-bold">Cerrar Sesión</button></Link>
    </div>
  )
}

export default LogOutButtonAdmin