"use client"
import IProperty from '@/Interfaces/IProperties';
import { IUser } from '@/Interfaces/IUser';
import { getPropertyById, getUserData } from '@/services/dataUserService';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const UserPropertiesFav = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
        const fetchedProperties = await Promise.all(data.favoriteProperties.map((id: string) => getPropertyById(id))); // Obtenemos cada propiedad por su ID
        const validProperties = fetchedProperties.filter(property => property !== null) as IProperty[];
        setProperties(validProperties);
      } else {
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  if (!userData || userData?.favoriteProperties.length === 0) {
    return ( <div className='w-1/3 flex flex-col bg-cyan-100  p-4 rounded-2xl gap-3'>
    <h3 className='text-center pb-2'>Favoritos</h3>
    <h4 className="text-center">No tienes propiedades favoritas</h4>
    </div>);
  }

  return (
    <div className='w-1/3 flex flex-col bg-cyan-100  p-4 rounded-2xl gap-3'>
    <h3 className='text-center pb-2'>Favoritos</h3>
    {properties.map((property: IProperty, i) => (
    <div  key={i} className='flex align-middle gap-4 opacity-80 bg-cyan-200 p-4 rounded-2xl'>
        <Image src={property.photos} alt='property image' width={60} height={60}/>
        <h4> {property.propertyName} <br/> {property.country}</h4>
    </div>))}
    <button className='font-semibold underline'>Ver Más</button>
    </div>
  )
}

export default UserPropertiesFav