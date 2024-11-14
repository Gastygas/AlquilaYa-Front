import Header from '@/Components/Header/Header'
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes'
import Step1 from '@/Components/Sube-tu-propiedad/Step-1'
import React from 'react'

const description = () => {
  return (
    <ProtectedRoute>
    <div>
    <Header />
      <div className='container'>
        <Step1 /> 
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default description 