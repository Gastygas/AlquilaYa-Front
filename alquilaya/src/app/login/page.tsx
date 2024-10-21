import LoginForm from '@/Components/LoginForm/Login'
import React from 'react'

const page = () => {
  return (
    <div className='container'>
      <div className='padding-section'>
      <h1 className="pb-12 text-primary">Iniciar sesión</h1>
        <LoginForm />
      </div>
    </div>
  )

}

export default page