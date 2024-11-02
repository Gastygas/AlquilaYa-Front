import ForgetPasswordForm from '@/Components/ForgetPasswordForm/ForgetPassword'
import Header from '@/Components/Header/Header'

import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
    <div className='container'>
      <div className='padding-section'>
      <h1 className="pb-12 text-primary">Recuperar contraseña</h1>
        <ForgetPasswordForm/>
      </div>
    </div>
    </div>
  )

}

export default page