import CompleteInformationForm from '@/Components/CompleteInformationForm/CompleteInformationForm'
import EditInformationForm from '@/Components/EditInformationForm/EditInformationForm'
import Header from '@/Components/Header/Header'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
    <div className='container'>
      <div className='padding-section'>
<h1>Edita tu información</h1>
<EditInformationForm/>
      </div>
    </div>
    </div>
  )
}

export default page