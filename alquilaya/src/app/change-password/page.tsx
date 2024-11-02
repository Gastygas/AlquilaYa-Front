"use client";

import ChangePasswordForm from '@/Components/ChangePasswordForm/ChangePassword'
import Header from '@/Components/Header/Header'
import React, { Suspense } from 'react'

const page = () => {
  
  return (
    <div>
      <Header/>
    <div className='container'>
      <div className='padding-section'>
      <h1 className="pb-12 text-primary">Cambia tu contraseña</h1>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
        <ChangePasswordForm/>
      </div>
    </div>
    </div>
  )

}

export default page