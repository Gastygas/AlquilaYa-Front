"use client"
import { useEffect, useState } from "react";
import styles from "./UserInformationCard.module.css"
import { IUser } from "@/Interfaces/IUser";
import { getUserData } from "@/services/dataUserService";

const UserInformationCard =  () => {
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

  if (error) return (    <div className='w-2/3 flex flex-col bg-cyan-100  p-4 rounded-2xl justify-start align-top'>
    <h3 className='text-primary text-center opacity-1 pb-4'>Tu Información</h3>
    <div className='flex flex-row'>
      <h4 className="text-center">Ha ocurrido un error</h4>
    </div>
  </div>
   
  );
 
  return (
    <div className='w-2/3 flex flex-col bg-cyan-100  p-4 rounded-2xl justify-center align-middle'>
    <h3 className='text-primary text-center opacity-1 pb-4'>Tu Información</h3>
    <div className='flex flex-row'>
      <div className='w-1/2 flex flex-col opacity-80'>
        <h4 className='pt-4 text-center font-bold'>Nombre</h4>
        <h4 className='pb-4 text-center'>{userData?.name} {userData?.surname}</h4>
        <h4 className='pt-4 text-center font-bold'>Email</h4>
        <h4 className='pb-4 text-center'>{userData?.email}</h4>
        <h4 className='pt-4 text-center font-bold'>Dni</h4>
        <h4 className='pb-4 text-center'>{userData?.dni}</h4>
      </div>
      <div className='w-1/2 flex flex-col opacity-80'>
        <h4 className='pt-4 text-center font-bold'>País</h4>
        <h4 className='pb-4 text-center'>{userData?.country}</h4>
        <h4 className='pt-4 text-center font-bold'>Dirección</h4>
        <h4 className='pb-4 text-center'>{userData?.address}</h4>
        <h4 className='pt-4 text-center font-bold'>Teléfono</h4>
        <h4 className='pb-4 text-center'>{userData?.phone}</h4>
      </div>

    </div>
    <button className={styles.editButton}>Editar</button>
    <button className={styles.editButton}>Cambiar contraseña</button>
  </div>
  )
}

export default UserInformationCard