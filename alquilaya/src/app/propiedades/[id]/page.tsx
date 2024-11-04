import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { FaMapLocationDot, FaPeopleRoof } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { FaWifi, FaParking, FaHeart } from "react-icons/fa";
import Header from '@/Components/Header/Header';
import IProperty from '@/Interfaces/IProperties';
import { TbAirConditioning } from "react-icons/tb";
import { GiHeatHaze } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import BookForm from '@/Components/BookForm/BookForm';
import FavButton from '@/Components/FavButton/FavButton';


const getProductById = async (id: string) => {
  const url = "http://localhost:3001/property"

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store"
  })
  const property = await res.json()
  if (!property) { notFound() }

  return property.find((product: IProperty) => product.id === id);
};

const ProductDetail = async ({ params }: { params: { id: string } }) => {

  const property = await getProductById(params.id)

  return (
    <div><Header />
      <div className="container">
        <div className='flex my-28'>
          <div className='w-1/2'>
            <Image src={property.photos[0]} alt={property.name} width={600} height={600} className='rounded-xl' />
          </div>
          <div className='w-1/2'>
            <h1>{property.propertyName}</h1>
            <h3>{property.price}</h3>
            <h4 className='font-bold'>{property.address}</h4>
            <div className='flex justify-start align-middle pt-4 gap-3'>
              <FaMapLocationDot size={20} color="var(--darkBlue)" /><h4>{property.city} </h4>
            </div>
            <div className='flex justify-start  gap-6'>
              <div className='flex justify-start align-middle pt-4 gap-3'>
                <FaPeopleRoof size={20} color="var(--darkBlue)" /><h4>Capacidad: {property.capacity} Personas</h4>
              </div>
              <div className='flex justify-start align-middle pt-4 gap-3'>
                <IoBed size={20} color="var(--darkBlue)" /><h4>Cuartos: {property.bedrooms} </h4>
              </div>
              <div className='flex justify-start align-middle pt-4 gap-3'>
                <LiaToiletSolid size={20} color="var(--darkBlue)" /><h4>Baños: {property.bathrooms} </h4>
              </div>
            </div>
            <p className='my-6 text-base'>{property.description}</p>
            <div className='flex justify-start gap-6 flex-wrap'>
              {property.wifi ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <FaWifi size={20} color="var(--darkBlue)" /><h4>WiFi</h4>
              </div> : <></>}
              {property.petFriendly ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <IoBed size={20} color="var(--darkBlue)" /><h4>Pet Friendly</h4>
              </div> : <></>}
              {property.airConditioning ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <TbAirConditioning size={20} color="var(--darkBlue)" /><h4>Aire acondicionado</h4>
              </div> : <></>}
              {property.heating ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <GiHeatHaze size={20} color="var(--darkBlue)" /><h4>Calefacción</h4>
              </div> : <></>}
              {property.pool ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <MdOutlinePool size={20} color="var(--darkBlue)" /><h4>Piscina</h4>
              </div> : <></>}
              {property.parking ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                <FaParking size={20} color="var(--darkBlue)" /><h4>Parqueadero</h4>
              </div> : <></>}
            </div>
            <FavButton propertyId={property.id} properties={property}/>
          </div>
        </div>
        <div className='bg-primary rounded-2xl mb-28'>
          <BookForm
            propertyId={property.id}
            propertyName={property.propertyName}
            unitPrice={property.price}/>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;