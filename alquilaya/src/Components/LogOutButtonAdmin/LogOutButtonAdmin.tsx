"use client"
import Link from 'next/link'
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import styles from "./LogOut.module.css"

const LogOutButtonAdmin = () => {
    const { logout } = useContext(AuthContext);
  return (
    <div className={styles.gridButtons}>
   <Link href="/"><button  onClick={logout} className={styles.button}>Cerrar Sesión</button></Link>
    </div>
  )
}

export default LogOutButtonAdmin