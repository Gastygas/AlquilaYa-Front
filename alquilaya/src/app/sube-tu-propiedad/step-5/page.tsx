import Header from '@/Components/Header/Header';
import Step5 from '@/Components/Sube-tu-propiedad/Step-5'
import React from 'react'
import styles from './step6.module.css'

const paso5 = () => {
  return (
    <div className='bg-gray-100'>
    <Header />
    {/* <div className={styles.container}> */}
      <div className='container' >
        <Step5/>
      </div>
    </div>
  )
}

export default paso5;