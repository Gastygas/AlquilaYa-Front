import ChangePasswordForm from '@/Components/ChangePasswordForm/ChangePassword'
import Header from '@/Components/Header/Header'
import React from 'react'
import { useSearchParams } from "next/navigation";


const page = () => {
  const searchParams= useSearchParams()
  const email = searchParams.get('email')
  const idEmail = searchParams.get('idEmail')
  
  return (
    <div>
      <Header/>
    <div className='container'>
      <div className='padding-section'>
      <h1 className="pb-12 text-primary">Cambia tu contraseña</h1>
        <ChangePasswordForm email={email} idEmail={idEmail} />
      </div>
    </div>
    </div>
  )

}

export default page