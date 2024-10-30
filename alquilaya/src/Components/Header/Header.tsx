import Link from "next/link"
import Image from "next/image"
import styles from "./Header.module.css"
import LoggedButton from "../LoggedButton/LoggedButton"
import MenuHeader from "../MenuHeader/MenuHeader"
import NotLoggedButtons from "../NotLoggedButtons/NotLoggedButtons"


const Header = () => {
  return (
    <div className={ `${styles.navBg} py-6 z-20`}>
      <div className={`container flex justify-between`}>
        <div>
          <Link href="/"><Image src="/logo-hor.png" alt="logo" width={100} height={60} className=" transition-transform duration-300 hover:scale-95 w-auto h-auto"/></Link>
        </div>
        <MenuHeader/>
        <LoggedButton/>
      </div>
    </div>
  )
}

export default Header