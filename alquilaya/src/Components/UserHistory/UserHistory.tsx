"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IUser } from "@/Interfaces/IUser";
import { getUserData } from "@/services/dataUserService";
import styles from "./UserHistory.module.css";
import Link from "next/link";

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

  if (userData?.bookings.length === 0)
    return (
      <div className={styles.booksGrid}>
        <h3 className={styles.title}>Tus Reservas</h3>
        <div className={styles.box}>
          <h4 className={styles.center}>No has realizado reservas aún</h4>
        </div>
      </div>
    );
  return (
    <div className={styles.colorBox}>
      <h3 className={styles.title}>Tus Reservas</h3>

      {userData?.bookings?.map((property, index) => (
        <div key={index} className={styles.item}>
          <Image src={userData.bookings[index].property.photos[0]} alt="book" width={60} height={60} />
          <h4>
            {userData.bookings[index].property.propertyName} <br /> {userData.bookings[index].property.price}
          </h4>
        </div>
      ))}

      <Link href="propiedades/reservas">
        <button className={styles.seeMore}>Ver Más</button>
      </Link>
    </div>
  );
};

export default UserHistory;
