import Link from "next/link"
import styles from "./Footer.module.css"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className={styles.footer}>
    <div className={`container ${styles.footerSpace}`}>
    <Link href="/"><Image src="/logo-hor.png" alt="logo" width={100} height={60} className="transition-transform duration-300 hover:scale-95 w-auto h-auto"/></Link>
      <p className={styles.text}>Creado por Estudiantes de Henry WebPT20B 🍃</p>
    </div>
  </footer>
  )
}

export default Footer