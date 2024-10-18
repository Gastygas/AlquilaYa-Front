import Link from "next/link"
import Image from "next/image"
import styles from "./Header.module.css"
//import LoggedButton from "../LoggedButton/LoggedButton"
import NotLoggedButtons from "../NotLoggedButtons/NotLoggedButtons"


const NavBar = () => {
  return (
    <div className={ `${styles.navBg} py-6 z-20`}>
      <div className={`container flex justify-between`}>
        <div>
          <Link href="/"><Image src="/logo-hor.png" alt="logo" width={100} height={60} className=" transition-transform duration-300 hover:scale-95 w-auto h-auto"/></Link>
        </div>
        <div className="flex flex-row justify-around items-center">
          <ul className="text-sm inline-flex" style={{ color:'var(--primary-color)'}}>
            <Link href="/nosotros"><li className={styles.itemsnav}> Sobre nosotros</li></Link>
            <Link href="/propiedades"><li className={styles.itemsnav}>Propiedades</li></Link>
            <Link href="/faq"><li className={styles.itemsnav}>FAQ</li></Link>
            <Link href="/sube-tu-propiedad"><li className={styles.itemsnav}>Sube tu propiedad</li></Link>
          </ul>
        </div>
        <NotLoggedButtons/>
      </div>
    </div>
  )
}

export default NavBar