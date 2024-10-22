import mockProperties from '@/mocks/properties';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { FaMapLocationDot, FaPeopleRoof } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { FaWifi } from "react-icons/fa";
import Header from '@/Components/Header/Header';

const getProductById = (id: string) => {
  return mockProperties.find((product) => product.id === id);
};

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = getProductById(params.id)
  if (!product) { notFound() }

  return (
    <div><Header />
      <div className="container">
        <div className='flex mt-28'>
          <div className='w-1/2'>
            <Image src={product.photo} alt={product.name} width={600} height={600} className='rounded-xl' />
          </div>
          <div className='w-1/2'>
            <h1>{product.name}</h1>
            <h3>{product.price}</h3>
            <h4 className='font-bold'>{product.adress}</h4>
            <div className='flex justify-start align-middle pt-4 gap-3'>
              <FaMapLocationDot size={20} color="#2CFFDE" /><h4>{product.city} </h4>
            </div>
            <div className='flex justify-start  gap-6'>
              <div className='flex justify-start align-middle pt-4 gap-3'>
                <FaPeopleRoof size={20} color="#2CFFDE" /><h4>Capacidad: {product.capacity} Personas</h4>
              </div>
              <div className='flex justify-start align-middle pt-4 gap-3'>
                <IoBed size={20} color="#2CFFDE" /><h4>Cuartos: {product.bedrooms} </h4>
              </div>
              <div className='flex justify-start align-middle pt-4 gap-3'>
                <LiaToiletSolid size={20} color="#2CFFDE" /><h4>Baños: {product.bathrooms} </h4>
              </div>
            </div>
            <p className='my-6 text-base'>{product.description}</p>
            <div className='flex justify-start gap-6 flex-wrap'>
              {product.wifi ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <FaWifi size={20} color="#2CFFDE" /><h4>WiFi</h4>
              </div> : <></>}
              {product.petFriendly ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <IoBed size={20} color="#2CFFDE" /><h4>Pet Friendly</h4>
              </div> : <></>}
              {product.airConditioning ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <LiaToiletSolid size={20} color="#2CFFDE" /><h4>Aire acondicionado</h4>
              </div> : <></>}
              {product.airConditioning ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <LiaToiletSolid size={20} color="#2CFFDE" /><h4>Aire acondicionado</h4>
              </div> : <></>}
              {product.heating ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <LiaToiletSolid size={20} color="#2CFFDE" /><h4>Calefacción</h4>
              </div> : <></>}
              {product.pool ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <LiaToiletSolid size={20} color="#2CFFDE" /><h4>Piscina</h4>
              </div> : <></>}
              {product.parking ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <LiaToiletSolid size={20} color="#2CFFDE" /><h4>Parqueadero</h4>
              </div> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;