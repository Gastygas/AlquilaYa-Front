"use client"
import IProperty from '@/Interfaces/IProperties';
import { IUser } from '@/Interfaces/IUser';
import { getUserData } from '@/services/dataUserService';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const UserPropertiesHistory = () => {
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

  if (userData?.properties.length === 0) return (    <div className='w-full flex flex-col bg-cyan-100  p-4 rounded-2xl justify-start align-top'>
    <h3 className='text-primary text-center opacity-1 pb-4'>Tu Propiedades</h3>
    <div className='flex flex-row justify-center py-4'>
      <h4 className="text-center">No tienes propiedades en la plataforma</h4>
    </div>
  </div>
   
  );
  return (
    <div className='w-full flex flex-col bg-cyan-100  p-4 rounded-2xl gap-3'>
    <h3 className='text-center pb-2'>Tus Propiedades</h3>

 {userData?.properties.map((property: IProperty) => (
    <div className='flex align-middle gap-4 opacity-80 bg-cyan-200 p-4 rounded-2xl'>
      <Image src={property.photos[0]} alt='property image' width={60} height={60} />
      <h4>{property.propertyName}<br /> {property.country}</h4>
    </div>
    ))}
  </div>
  )
}

export default UserPropertiesHistory