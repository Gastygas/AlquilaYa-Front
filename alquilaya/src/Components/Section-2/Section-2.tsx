import styles from "./Section-2.module.css"
import { TbMapSearch } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";
import { HiHomeModern } from "react-icons/hi2";
import Link from "next/link";

const Section2 = () => {
    return (
        <div className="bg-center container flex flex-col">
            <div className="padding-section">
                <h1 className="text-center text-secondary pb-14">¿Cómo funciona?</h1>
                <div className="container flex justify-between gap-5 mb-14">
                    <div className={styles.card}>
                        <TbMapSearch size={80} color="#2CFFDE" />
                        <h4 className={styles.subtitle}>Explora</h4>
                        <p className={styles.parrafo}> Navega por nuestras propiedades disponibles en todo el país.</p>
                    </div>
                    <div className={styles.card}>
                        <GiNotebook size={80} color="#2CFFDE" />
                        <h4 className={styles.subtitle}>Reserva</h4>
                        <p className={styles.parrafo}>Elige las fechas que necesitas y realiza tu reserva online.</p>
                    </div>
                    <div className={styles.card}>
                        <HiHomeModern size={80} color="#2CFFDE" />
                        <h4 className={styles.subtitle}>Disfruta</h4>
                        <p className={styles.parrafo}>Todo está listo para tu llegada. ¡Relájate y disfruta de tu estancia!</p>
                    </div>
                </div>
                <Link href="/login"><button className={styles.button}>¡Comienza ahora!</button></Link>
            </div>
        </div >
    )
}

export default Section2