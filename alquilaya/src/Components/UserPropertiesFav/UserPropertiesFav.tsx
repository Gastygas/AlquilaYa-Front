"use client"
import { IUser } from '@/Interfaces/IUser';
import { getUserData } from '@/services/dataUserService';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const UserPropertiesFav = () => {

  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
      } else {
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  if (!error) {
    return ( <div className='w-1/3 flex flex-col bg-cyan-100  p-4 rounded-2xl gap-3'>
    <h3 className='text-center pb-2'>Favoritos</h3>
    <h4 className="text-center">No tienes propiedades favoritas</h4>
    </div>);
  }

  return (
    <div className='w-1/3 flex flex-col bg-cyan-100  p-4 rounded-2xl gap-3'>
    <h3 className='text-center pb-2'>Favoritos</h3>
    <div className='flex align-middle gap-4 opacity-80 bg-cyan-200 p-4 rounded-2xl'>
        <Image src="/Herobg.jpg" alt='property image' width={60} height={60}/>
        <h4>{userData?.email} <br/> País de la propiedad</h4>
    </div>
    <div className='flex align-middle gap-4 opacity-80 bg-cyan-200 p-4 rounded-2xl'>
        <Image src="/Herobg.jpg" alt='property image' width={60} height={60}/>
        <h4>Nombre de la propiedad <br/> País de la propiedad</h4>
    </div>
    <div className='flex align-middle gap-4 opacity-80 bg-cyan-200 p-4 rounded-2xl'>
        <Image src="/Herobg.jpg" alt='property image' width={60} height={60}/>
        <h4>Nombre de la propiedad <br/> País de la propiedad</h4>
    </div>
    <button className='font-semibold underline'>Ver Más</button>
    </div>
  )
}

export default UserPropertiesFav