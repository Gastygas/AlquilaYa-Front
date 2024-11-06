"use client";
import styles from "./ChangePass.module.css"
import ChangePasswordForm from '@/Components/ChangePasswordForm/ChangePassword'
import Header from '@/Components/Header/Header'
import Loader from "@/Components/Loader/Loader";
import React, { Suspense } from 'react'

const page = () => {
  
  return (
    <div>
      <Header/>
    <div className={styles.box}>
      <div className='padding-section'>
      <h1 className={styles.apply}>Cambia tu contraseña</h1>
      <Suspense fallback={<Loader/>}>
        <ChangePasswordForm/>
      </Suspense>
      </div>
    </div>
    </div>
  )

}

export default page