import FavButton from '@/Components/FavButton/FavButton'
import Header from '@/Components/Header/Header'
import styles from "./single.module.css"
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaParking, FaWifi } from 'react-icons/fa'
import { FaMapLocationDot, FaPeopleRoof } from 'react-icons/fa6'
import { GiBroom, GiHeatHaze, GiWashingMachine } from 'react-icons/gi'
import { IoBed } from 'react-icons/io5'
import { LiaToiletSolid } from 'react-icons/lia'
import { MdDinnerDining, MdOutdoorGrill, MdOutlinePool, MdYard } from 'react-icons/md'
import { TbAirConditioning } from 'react-icons/tb'
import Link from 'next/link'
import BookFormMock from '@/Components/BookFormMock/BookFormMock'
import { PiVideoFill } from 'react-icons/pi'
import Maps from '@/Components/Maps/Maps'
import CreateCarousel from '@/Components/CarouselPhotos/CarouselPhotos';
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes'

const getProductById = async (id: string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/${id}`, {
        method: "GET",
        cache: "no-store"
    })
    const property = await res.json()
    if (!property) { notFound() }

    return property
};

const page = async ({ params }: { params: { id: string } }) => {

    const property = await getProductById(params.id)

    return (
        <ProtectedRoute adminOnly={true}>
        <div><Header />
            {property.propertyStatus === 'approved' ?
                <div className='w-full bg-green-300 flex flex-col py-10 mt-0 mb-8 justify-center align-middle gap-4'>
                    <h3 className='text-center'>Esta propiedad está aprobada</h3>
                    <div className='flex justify-center gap-8 pt-3'>
                        <Link href="/admin/solicitudes"><button className={styles.buttonBack}>Atrás</button></Link>
                        <Link href={property.bill} target="_blank"><button className={styles.button}>Ver documento de respaldo</button></Link>
                        <Link href={`/propiedades/${property.id}`} target="_blank"><button className={styles.button}>Ver Propiedad aquí</button></Link>
                    </div>
                </div>
                : property.propertyStatus === 'pending' ? (<div className='w-full bg-orange-300 flex flex-col py-10 mt-0 mb-8 justify-center align-middle'>
                    <h3 className='text-center'>Esta propiedad está Pendiente</h3>
                    <div className='flex justify-center gap-8 pt-3'>
                        <Link href="/admin/solicitudes"><button className={styles.buttonBack}>Atrás</button></Link>
                        <Link href={property.bill} target="_blank"><button className={styles.button}>Ver documento de respaldo</button></Link>
                    </div>
                </div>)
                    : (<div className='w-full bg-red-300 flex flex-col py-14 mt-0 mb-8 justify-center align-middle'>
                        <h3 className='text-center'>Esta propiedad está Cancelada</h3>
                        <div className='flex justify-center gap-8 pt-3'>
                            <Link href="/admin/solicitudes"><button className={styles.buttonBack}>Atrás</button></Link>
                            <Link href={property.bill} target="_blank"><button className={styles.button}>Ver documento de respaldo</button></Link>
                            <Link href="/#"><button className={styles.button}>Eliminar</button></Link>
                        </div>
                    </div>
                    )}

            <div className="container">
                <div className='flex my-28 gap-8'>
                    <div className='w-1/2'>
                        <CreateCarousel photos={property.photos} />
                        {/* <Image src={property.photos[0]} alt={property.name} width={600} height={600} className='rounded-xl' /> */}
                    </div>
                    <div className='w-1/2'>
                        <div className='flex justify-between'>
                            <h1>{property.propertyName}</h1>
                        </div>
                        <h3>${property.price}</h3>
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
                            {property.streaming ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                                <PiVideoFill size={20} color="var(--darkBlue)" /><h4>Streaming</h4>
                            </div> : <></>}
                            {property.yard ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                                <MdYard size={20} color="var(--darkBlue)" /><h4>Patio</h4>
                            </div> : <></>}
                            {property.grill ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                                <MdOutdoorGrill size={20} color="var(--darkBlue)" /><h4>Parrilla</h4>
                            </div> : <></>}
                            {property.appliance ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                                <GiWashingMachine size={20} color="var(--darkBlue)" /><h4>Electrodomésticos</h4>
                            </div> : <></>}
                            {property.cleaningService ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                                <GiBroom size={20} color="var(--darkBlue)" /><h4>Servicio de Limpieza</h4>
                            </div> : <></>}
                            {property.catering ? <div className='flex justify-start items-center p-4 gap-3 shadow-lg rounded-md'>
                                <MdDinnerDining size={20} color="var(--darkBlue)" /><h4>Catering</h4>
                            </div> : <></>}
                        </div>
                    </div>
                </div>
                <div className='bg-primary rounded-2xl mb-28'>
                    <BookFormMock />
                </div>
                <div className='w-full flex mb-28 justify-center items-center'>
                        <Maps propertyLat={property.lat} propertyLng={property.lng} />
                    </div>
                <div className='bg-primary rounded-2xl mb-28'>
                    <BookFormMock/>
                </div>
            </div>
        </div>
        </ProtectedRoute>
    )
}

export default page