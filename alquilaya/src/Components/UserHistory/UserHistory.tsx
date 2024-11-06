"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IUser } from '@/Interfaces/IUser'
import { getUserData } from '@/services/dataUserService'
import styles from "./UserHistory.module.css"

const UserHistory = () => {
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

  if (userData?.properties.length === 0) return (    <div className={styles.booksGrid}>
    <h3 className={styles.title}>Tus Reservas</h3>
    <div className={styles.box}>
      <h4 className={styles.center}>No has realizado reservas aún</h4>
    </div>
  </div>
   
  );
  return (
    <div className={styles.colorBox}>
    <h3 className={styles.title}>Tus Reservas</h3>
  
    <div className={styles.item}>
      <Image src="/Herobg.jpg" alt='property image' width={60} height={60} />
      <h4>Nombre de la propiedad <br /> País de la propiedad</h4>
    </div>
  </div>
  )
}

export default UserHistory