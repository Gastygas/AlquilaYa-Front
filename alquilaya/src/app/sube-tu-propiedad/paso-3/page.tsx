import React from 'react'
import Step3 from '@/Components/Sube-tu-propiedad/Step-3'
import Header from '@/Components/Header/Header';
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes';

const paso3 = () => {
  return (
    <ProtectedRoute>
    <div>
    <Header />
      <div className='container'>
        <Step3 />
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default paso3;