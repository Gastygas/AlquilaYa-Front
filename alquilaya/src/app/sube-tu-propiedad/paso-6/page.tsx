import Header from '@/Components/Header/Header';
import Step6 from '@/Components/Sube-tu-propiedad/Step-6'
import React from 'react'
import styles from './step6.module.css'

const paso6 = () => {
  return (
    <div className='bg-gray-100'>
    <Header />
    {/* <div className={styles.container}> */}
      <div className='container' >
        <Step6/>
      </div>
    </div>
  )
}

export default paso6;