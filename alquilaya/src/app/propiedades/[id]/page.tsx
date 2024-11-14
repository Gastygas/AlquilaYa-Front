import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaMapLocationDot, FaPeopleRoof } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { FaWifi, FaParking, FaHeart, FaStream } from "react-icons/fa";
import Header from '@/Components/Header/Header';
import IProperty from '@/Interfaces/IProperties';
import { TbAirConditioning } from "react-icons/tb";
import { GiBroom, GiHeatHaze, GiWashingMachine } from "react-icons/gi";
import { MdDinnerDining, MdOutdoorGrill, MdOutlinePool, MdYard } from "react-icons/md";
import BookForm from '@/Components/BookForm/BookForm';
import FavButton from '@/Components/FavButton/FavButton';
// import CreateCarousel from '@/Components/CarouselPhotos';
import { Loader } from '@googlemaps/js-api-loader';
import Maps from '@/Components/Maps/Maps';
import { PiVideoFill } from 'react-icons/pi';
import CreateCarousel from '@/Components/CarouselPhotos/CarouselPhotos';


const getProductById = async (id: string) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property/${id}`, {
    method: "GET",
    cache: "no-store"
  })
  const property = await res.json()
  if (!property) { notFound() }

  return property
};

const ProductDetail = async ({ params }: { params: { id: string } }) => {

  const property: IProperty = await getProductById(params.id)
  console.log(property.photos)
  return (
    <div><Header />
      <div className="container">
        <div className='flex my-28'>
          <div className='w-1/2'>
            <CreateCarousel photos={property.photos} />
            {/* <Image src={property.photos[0]} alt={property.propertyName} width={600} height={600} className='rounded-xl' /> */}
          </div>
          <div className='w-1/2'>
            <div className='flex justify-between'>
              <h1>{property.propertyName}</h1>
              <FavButton propertyId={property.id} propertiesInfo={property} className="top-52 right-60 w-14 h-14 bg-primary rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-secondary hover:shadow-slate-700 transition-all" />
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
          <BookForm
            propertyId={property.id}
            propertyName={property.propertyName}
            unitPrice={property.price} />
        </div>
        <div className='grid grid-cols-2 mb-36'>
          <div className='flex flex-col align-middle gap-4 mx-10'>
            <h2 className='text-center'>¿Qué dicen los usuarios?</h2>
            <div className='bg-gray-200 p-4 rounded-md gap-4'>
              <h4 className='font-bold capitalize'>nombre de usuario</h4>
              <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.e officia ea, est cumque eligendi minima dolorum? Explicabo, vel? Asperiores, quasi. Enim veritatis distinctio reprehenderit natus. Dolorem, quos?</p>
            </div>
            <div className='bg-gray-200  p-4 rounded-md gap-4'>
              <h4 className='font-bold capitalize'>nombre de usuario</h4>
              <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.e officia ea, est cumque eligendi minima dolorum? Explicabo, vel? Asperiores, quasi. Enim veritatis distinctio reprehenderit natus. Dolorem, quos?</p>
            </div>
            <div className='bg-gray-200 p-4 rounded-md gap-4'>
              <h4 className='font-bold capitalize'>nombre de usuario</h4>
              <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.e officia ea, est cumque eligendi minima dolorum? Explicabo, vel? Asperiores, quasi. Enim veritatis distinctio reprehenderit natus. Dolorem, quos?</p>
            </div>
          </div>
          <div className='flex justify-center items-center'>

            <Maps propertyLat={property.lat} propertyLng={property.lng} />
            {/* <Image src="/mapa.png" alt={property.propertyName} width={600} height={600} className='rounded-xl' /> */}

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;