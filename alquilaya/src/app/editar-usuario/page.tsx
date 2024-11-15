import CompleteInformationForm from '@/Components/CompleteInformationForm/CompleteInformationForm'
import Header from '@/Components/Header/Header'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
    <div className='container'>
      <div className='padding-section'>
<h1>Edita tu información</h1>
<CompleteInformationForm/>
      </div>
    </div>
    </div>
  )
}

export default page