import IProperty from '@/Interfaces/IProperties'
import styles from './Card.module.css'
import Image from "next/image"
import Link from "next/link"
import { FaHeart } from 'react-icons/fa'


interface ProductProps {
    property: IProperty
}

const Card = ({property}: ProductProps) => {

  return (
    <Link href={`/propiedades/${property.id}`}>
    <div key={property.id} className="p-6 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl relative">
    <button className="absolute top-4 right-4 w-10 h-10 bg-[--tertiary-color] rounded-full shadow-lg flex items-center justify-center z-50">
      <FaHeart/>
    </button>
        <Image src={property.photos[0]} alt={property.propertyName} className="rounded-md" width={300} height={300}/>
        <h3 className={styles.title}>{property.propertyName}</h3>
        <h4>${property.price}</h4>
        <p className={styles.description}>{property.description}</p>
        

    </div>
    </Link>
  )
}
export default Card 