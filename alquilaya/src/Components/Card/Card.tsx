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
    <div key={property.id} className={styles.cardGrid}>
    <button className={styles.favButton}>
      <FaHeart/>
    </button>
        <div className={styles.imgContainer}>
        <Image src={property.photos[0]} alt={property.propertyName} className="rounded-md" width={300} height={300}/>
        </div>
        <h3 className={styles.title}>{property.propertyName}</h3>
        <h4>${property.price}</h4>
        <p className={styles.description}>{property.description}</p>
        

    </div>
    </Link>
  )
}
export default Card 