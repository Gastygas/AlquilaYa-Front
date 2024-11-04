"use client"
import Link from 'next/link'
import styles from "./MenuHeader.module.css"
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';

const MenuHeader = () => {
    const { user } = useContext(AuthContext);
    if(user?.user) {
  return (
    <div className={styles.container}>
          <ul className={styles.menu}>
            <Link href="/nosotros"><li className={styles.itemsnav}>Sobre nosotros</li></Link>
            <Link href="/propiedades"><li className={styles.itemsnav}>Propiedades</li></Link>
            <Link href="/faq"><li className={styles.itemsnav}>FAQ</li></Link>
            <Link href="/sube-tu-propiedad/paso-1"><li className={styles.itemsnav}>Sube tu propiedad</li></Link>
          </ul>
        </div>
  )};return (

    <div className={styles.container}>
    <ul className={styles.menu}>
      <Link href="/nosotros"><li className={styles.itemsnav}> Sobre Nosotros</li></Link>
      <Link href="/propiedades"><li className={styles.itemsnav}>Propiedades</li></Link>
      <Link href="/faq"><li className={styles.itemsnav}>FAQ</li></Link>
    </ul>
  </div>)
}


export default MenuHeader