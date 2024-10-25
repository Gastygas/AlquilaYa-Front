import Image from 'next/image'
import React from 'react'

const UserPropertiesFav = () => {
  return (
    <div className='w-1/3 flex flex-col bg-cyan-100  p-4 rounded-2xl gap-3'>
    <h3 className='text-center pb-2'>Favoritos</h3>
    <div className='flex align-middle gap-4 opacity-80 bg-cyan-200 p-4 rounded-2xl'>
        <Image src="/Herobg.jpg" alt='property image' width={60} height={60}/>
        <h4>Nombre de la propiedad <br/> País de la propiedad</h4>
    </div>
    <div className='flex align-middle gap-4 opacity-80 bg-cyan-200 p-4 rounded-2xl'>
        <Image src="/Herobg.jpg" alt='property image' width={60} height={60}/>
        <h4>Nombre de la propiedad <br/> País de la propiedad</h4>
    </div>
    <div className='flex align-middle gap-4 opacity-80 bg-cyan-200 p-4 rounded-2xl'>
        <Image src="/Herobg.jpg" alt='property image' width={60} height={60}/>
        <h4>Nombre de la propiedad <br/> País de la propiedad</h4>
    </div>
    <button className='font-semibold underline'>Ver Más</button>
    </div>
  )
}

export default UserPropertiesFav