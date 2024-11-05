import Header from '@/Components/Header/Header'
import LoginForm from '@/Components/LoginForm/Login'
import React from 'react'
import styles from "./login.module.css"

const page = () => {
  return (
    <div>
      <Header/>
    <div className={styles.box}>
      <div className="padding-section">
      <h1 className={styles.title}>Iniciar sesión</h1>
        <LoginForm />
      </div>
    </div>
    </div>
  )

}

export default page