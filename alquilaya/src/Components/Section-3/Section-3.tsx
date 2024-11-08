import styles from "./Section-3.module.css"
import Link from "next/link";
import Image from "next/image";

const Section3 = () => {
    return (
        <div className="bg-center container flex flex-col">
            <div className="padding-section">
                <div className={styles.gridSection}>
                    <div className={styles.gridContainer}>
                        <h3 className={styles.title}>Descubre las mejores propiedades cerca de ti</h3>
                        <p className={styles.description}> Desde cómodos apartamentos en la ciudad hasta lujosas villas en la playa, AlquilaYa tiene algo para todos. Echa un vistazo a nuestras propiedades más populares, elegidas por su ubicación, comodidad y excelentes reseñas de usuarios.</p>
                        <Link href="/propiedades"><button className={styles.button}>Ver Más</button></Link>
                    </div>
                    <div>
                    <Image src="/seccion3.jpg" alt="hero" height={500} width={500} className={styles.image}/>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Section3