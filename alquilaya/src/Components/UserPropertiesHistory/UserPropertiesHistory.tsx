"use client"
import styles from "./Properties.module.css"
import IProperty from '@/Interfaces/IProperties';
import { IUser } from '@/Interfaces/IUser';
import { getUserData } from '@/services/dataUserService';
import Image from 'next/image'
import Link from "next/link";
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

  if (userData?.properties.length === 0) return (    <div className={styles.box}>
    <h3 className={styles.title}>Tu Propiedades</h3>
    <div className={styles.grid}>
      <h4 className={styles.center}>No tienes propiedades en la plataforma</h4>
    </div>
  </div>
   
  );
  return (
    <div className={styles.box}>
    <h3 className={styles.center}>Tus Propiedades</h3>

 {userData?.properties.map((property: IProperty) => (
    <Link href={`/propiedades/${property.id}`}><div className={styles.singleBox}>
      <Image src={property.photos[0]} alt='property image' width={60} height={60} />
      <h4>{property.propertyName}<br /> {property.country}</h4>
    </div></Link>
    ))}
  </div>
  )
}

export default UserPropertiesHistory