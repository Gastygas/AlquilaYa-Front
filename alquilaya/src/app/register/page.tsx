import Header from '@/Components/Header/Header'
import RegisterForm from '@/Components/RegisterForm/RegisterForm'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* <Header /> */}

      <div className="container">
        <div className="padding-section">
          <h1 className="pb-12 text-primary">Regístrate</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default page