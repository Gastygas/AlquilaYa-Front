
import Button from '@/Components/Button/Button';
import mockProperties from '@/mocks/properties';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";

const getProductById = (id: string) => {
    return mockProperties.find((product) => product.id === id);
  };

  const ProductDetail =  ({params} : {params: {id: string}}) =>{
    const product = getProductById(params.id)
    if (!product) { notFound()} 
    
  return (
    <div className="container">
      <div className='flex my-28'>
        <div className='w-1/2'>
          <Image src={product.photo} alt={product.name} width={400} height={400} className='rounded-xl' /></div>
        <div className='w-1/2'>
          <h1>{product.name}</h1>
          <h3>{product.price}</h3>
          <h4>{product.adress}</h4>
          <div className='flex justify-start align-middle pt-4 gap-3'>
          <FaMapLocationDot size={20} color="#2CFFDE"/><h4>{product.city} </h4>
          </div>
          <div className='flex gap-6'>
            <div className='flex justify-start align-middle pt-4 gap-3'>
            <FaMapLocationDot size={20} color="#2CFFDE"/><h4>{product.city} </h4>
            </div>
            <div className='flex justify-start align-middle pt-4 gap-3'>
            <FaMapLocationDot size={20} color="#2CFFDE"/><h4>{product.city} </h4>
            </div>
            <div className='flex justify-start align-middle pt-4 gap-3'>
            <FaMapLocationDot size={20} color="#2CFFDE"/><h4>{product.city} </h4>
            </div>
          </div>
          <p className='my-8'>{product.description}</p>
          <Button>Buy</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;