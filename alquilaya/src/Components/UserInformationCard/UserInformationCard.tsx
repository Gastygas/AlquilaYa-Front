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

  if (error) return (    <div className={styles.bigBox}>
    <h3 className={styles.title}>Tu Información</h3>
    <div className={styles.grid}>
      <h4 className={styles.center}>Ha ocurrido un error</h4>
    </div>
  </div>
   
  );
 
  return (
    <div className={styles.bigBoxContent}>
    <h3 className={styles.title}>Tu Información</h3>
    <div className={styles.grid}>
      <div className={styles.singleItem}>
        <h4 className={styles.subtitle}>Nombre</h4>
        <h4 className={styles.content}>{userData?.name} {userData?.surname}</h4>
        <h4 className={styles.subtitle}>Email</h4>
        <h4 className={styles.content}>{userData?.email}</h4>
        <h4 className={styles.subtitle}>Dni</h4>
        <h4 className={styles.content}>{userData?.dni}</h4>
      </div>
      <div className={styles.singleItem}>
        <h4 className={styles.subtitle}>País</h4>
        <h4 className={styles.content}>{userData?.country}</h4>
        <h4 className={styles.subtitle}>Dirección</h4>
        <h4 className={styles.content}>{userData?.address}</h4>
        <h4 className={styles.subtitle}>Teléfono</h4>
        <h4 className={styles.content}>{userData?.phone}</h4>
      </div>

    </div>
    <button className={styles.editButton}>Editar</button>
    <button className={styles.editButton}>Cambiar contraseña</button>
  </div>
  )
}

export default UserInformationCard