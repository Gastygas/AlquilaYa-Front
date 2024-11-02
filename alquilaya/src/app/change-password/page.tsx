"use client";

import ChangePasswordForm from '@/Components/ChangePasswordForm/ChangePassword'
import Header from '@/Components/Header/Header'
import React from 'react'

const page = () => {
  
  return (
    <div>
      <Header/>
    <div className='container'>
      <div className='padding-section'>
      <h1 className="pb-12 text-primary">Cambia tu contraseña</h1>
        <ChangePasswordForm/>
      </div>
    </div>
    </div>
  )

}

export default page