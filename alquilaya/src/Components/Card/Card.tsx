import IProperty from '@/Interfaces/IProperties'
import styles from './Card.module.css'
import Image from "next/image"
import Link from "next/link"
import { FaHeart } from 'react-icons/fa'
import FavButton from '../FavButton/FavButton'


interface ProductProps {
    property: IProperty;
    onRemoveFavorite?: (propertyId: string) => void;
    userId?:string | null
}

const Card = ({property, onRemoveFavorite, userId}: ProductProps) => {

  return (
    <Link href={`/propiedades/${property.id}`}>
    <div key={property.id} className={styles.cardGrid}>

    {userId !== null? (
      <FavButton propertyId={property.id} propertiesInfo={property} className={styles.favButton} onRemoveFavorite={onRemoveFavorite}/>
    ): ("")}
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