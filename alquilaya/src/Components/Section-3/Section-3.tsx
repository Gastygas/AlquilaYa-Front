import styles from "./Section-3.module.css"
import Link from "next/link";
import Image from "next/image";

const Section3 = () => {
    return (
        <div className="bg-center container flex flex-col">
            <div className="padding-section">
                <div className=" grid grid-cols-2 justify-around gap-5 mb-14">
                    <div className="flex flex-col align-middle justify-center">
                        <h3 className="text-[50px] text-primary font-extrabold pb-8 leading-none">Descubre las mejores propiedades cerca de ti</h3>
                        <p className="text-justify text-base"> Desde cómodos apartamentos en la ciudad hasta lujosas villas en la playa, AlquilaYa tiene algo para todos. Echa un vistazo a nuestras propiedades más populares, elegidas por su ubicación, comodidad y excelentes reseñas de usuarios.</p>
                        <Link href="/login"><button className={styles.button}>Ver Más</button></Link>
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