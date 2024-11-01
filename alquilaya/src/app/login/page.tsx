import Header from '@/Components/Header/Header'
import LoginForm from '@/Components/LoginForm/Login'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
    <div className='container'>
      <div className='padding-section'>
      <h1 className="pb-6 text-primary">Iniciar sesión</h1>
        <LoginForm />
      </div>
    </div>
    </div>
  )

}

export default page