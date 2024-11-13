import React from 'react'
import Step2 from '@/Components/Sube-tu-propiedad/Step-2'
import Header from '@/Components/Header/Header';
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes';

const paso2 = () => {
  return (
    <ProtectedRoute>
    <div>
    <Header />
      <div className='container'>
        <Step2/>
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default paso2;