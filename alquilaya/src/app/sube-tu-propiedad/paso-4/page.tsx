import React from 'react'
import Step4 from '@/Components/Sube-tu-propiedad/Step-4'
import Header from '@/Components/Header/Header';
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes';

const paso4 = () => {
  return (
    <ProtectedRoute>
    <div className='bg-gray-100'>
    <Header />
      <div className='container'>
        <Step4/>
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default paso4;