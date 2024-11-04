import Link from "next/link"
import Image from "next/image"
import styles from "./Header.module.css"
import LoggedButton from "../LoggedButton/LoggedButton"
import MenuHeader from "../MenuHeader/MenuHeader"
import NotLoggedButtons from "../NotLoggedButtons/NotLoggedButtons"


const Header = () => {
  return (
    <div className={styles.navBg}>
      <div className={styles.container}>
        <div>
          <Link href="/"><Image src="/logo-hor.png" alt="logo" width={100} height={60} className={styles.logo}/></Link>
        </div>
        <MenuHeader/>
        <LoggedButton/>
      </div>
    </div>
  )
}

export default Header