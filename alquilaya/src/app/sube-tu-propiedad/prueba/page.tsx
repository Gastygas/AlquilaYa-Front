import Header from '@/Components/Header/Header';
import Prueba from '@/Components/Sube-tu-propiedad/prueba';
import Step6 from '@/Components/Sube-tu-propiedad/Step-6'
import React from 'react'

const prueba = () => {
  return (
    <div className='bg-gray-100'>
    <Header />
      <div className='container'>
        <div className='padding-section'>
        <Prueba/>
        </div>
      </div>
    </div>
  )
}

export default prueba;