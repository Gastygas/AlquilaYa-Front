import styles from "./NotLogged.module.css"
import Link from "next/link"
import Button from "../Button/Button"

const NotLoggedButtons = () => {
  return (
    <div className={styles.box}>
    <Link href="/register"><Button variant="transparent" className={styles.register}>Regístrate</Button></Link>
    <Link href="/login"><Button variant="primary" className={styles.login}>Inicia Sesión</Button></Link>
    </div>
  )
}

export default NotLoggedButtons