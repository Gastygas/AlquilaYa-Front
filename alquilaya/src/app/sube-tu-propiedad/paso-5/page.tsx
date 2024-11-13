import Header from '@/Components/Header/Header';
import Step5 from '@/Components/Sube-tu-propiedad/Step-5'
import React, { Suspense } from 'react'
import styles from './step5.module.css'
import Loader from '@/Components/Loader/Loader';
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes';

const paso5 = () => {
  return (
    <ProtectedRoute>
    <div className='bg-gray-100'>
    <Header />
    {/* <div className={styles.container}> */}
      <div className='container' >
      <Suspense fallback={<Loader/>}>
        <Step5/>
      </Suspense>
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default paso5;