import IProperty from '@/Interfaces/IProperties'
import styles from './Card.module.css'
import Image from "next/image"
import Link from "next/link"


interface ProductProps {
    property: IProperty
}

const Card = ({property}: ProductProps) => {
  return (
    <Link href={`/propiedades/${property.id}`}>
    <div key={property.id} className="p-6 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl relative">
        <Image src={property.photos[0]} alt={property.name} className="rounded-md" width={300} height={300}/>
        <h3 className={styles.title}>{property.name}</h3>
        <h4>${property.price}</h4>
        <p className={styles.description}>{property.description}</p>
        

    </div>
    </Link>
  )
}
export default Card 