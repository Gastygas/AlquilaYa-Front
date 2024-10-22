import Link from "next/link"
import Image from "next/image"
import styles from "./HeaderAdmin.module.css"

const HeaderAdmin = () => {
  return (
    <div className={ `${styles.navBg} py-6 z-20`}>
      <div className={`container flex justify-between`}>
        <div>
          <Link href="/admin"><Image src="/logo-hor.png" alt="logo" width={100} height={60} className=" transition-transform duration-300 hover:scale-95 w-auto h-auto"/></Link>
        </div>
        <div className="flex flex-row justify-around items-center">
          <ul className="text-sm inline-flex" style={{ color:'var(--primary-color)'}}>
            <Link href="/admin"><li className={styles.itemsnav}> Dashboard</li></Link>
            <Link href="/admin/usuarios"><li className={styles.itemsnav}>Usuarios</li></Link>
            <Link href="/admin/propiedades"><li className={styles.itemsnav}>Propiedades</li></Link>
            <Link href="/admin/transacciones"><li className={styles.itemsnav}>Transacciones</li></Link>
            <Link href="/admin/solicitudes"><li className={styles.itemsnav}>Solicitudes</li></Link>
          </ul>
        </div>
        <div className="flex flex-row justify-around items-center gap-6">
          <p className="text-base">Hola, Admin</p> <button className={styles.button}>Cerrar Sesión</button>
          </div>
      </div>
    </div>
  )
}

export default HeaderAdmin