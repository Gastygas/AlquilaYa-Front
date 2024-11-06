"use client"
import styles from "./UserPropertiesFav.module.css"
import IProperty from '@/Interfaces/IProperties';
import { IUser } from '@/Interfaces/IUser';
import { getPropertyById, getUserData } from '@/services/dataUserService';
import Image from 'next/image'
import Link from "next/link";
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
    return ( <div className={styles.box}>
    <h3 className={styles.title}>Favoritos</h3>
    <h4 className={styles.center}>No tienes propiedades favoritas</h4>
    </div>);
  }

  return (
    <div className={styles.box}>
    <h3 className={styles.title}>Favoritos</h3>
    {properties.slice(0,3).map((property: IProperty, i) => (
    <div  key={i} className={styles.singleBox}>
        <Image src={property.photos[0]} alt='property image' width={60} height={60}/>
        <h4> {property.propertyName} <br/> {property.country}</h4>
    </div>))}
    <Link href="/propiedades/favoritas"><button className={styles.seeMore}>Ver Más</button></Link>
    </div>
  )
}

export default UserPropertiesFav