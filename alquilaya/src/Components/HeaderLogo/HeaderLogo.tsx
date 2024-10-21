import Link from "next/link"
import Image from "next/image"
import styles from "./HeaderLogo.module.css"



const HeaderLogo = () => {
  return (
    <div className={ `${styles.navBg} py-6 z-20`}>
      <div className={`container flex justify-center`}>
        <div>
          <Link href="/"><Image src="/logo-hor.png" alt="logo" width={100} height={60} className=" transition-transform duration-300 hover:scale-95 w-auto h-auto"/></Link>
        </div>
    </div>
    </div>
  )
}

export default HeaderLogo