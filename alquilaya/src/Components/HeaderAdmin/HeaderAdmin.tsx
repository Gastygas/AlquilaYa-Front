import Link from "next/link"
import Image from "next/image"
import styles from "./HeaderAdmin.module.css"
import LogOutButtonAdmin from "../LogOutButtonAdmin/LogOutButtonAdmin"

const HeaderAdmin = () => {
  return (
    <div className={styles.navBg}>
      <div className={styles.box}>
        <div>
          <Link href="/"><Image src="/logo-hor.png" alt="logo" width={100} height={60} className={styles.logo}/></Link>
        </div>
        <div className={styles.menu}>
          <ul className={styles.menuItems} style={{ color:'var(--primary-color)'}}>
            <Link href="/admin"><li className={styles.itemsnav}> Dashboard</li></Link>
            <Link href="/admin/usuarios"><li className={styles.itemsnav}>Usuarios</li></Link>
            <Link href="/admin/propiedades"><li className={styles.itemsnav}>Propiedades</li></Link>
            <Link href="/admin/transacciones"><li className={styles.itemsnav}>Transacciones</li></Link>
            <Link href="/admin/solicitudes"><li className={styles.itemsnav}>Solicitudes</li></Link>
          </ul>
        </div>
<LogOutButtonAdmin/>
      </div>
    </div>
  )
}

export default HeaderAdmin