import Link from "next/link"
import Image from "next/image"
import styles from "./HeaderLogo.module.css"



const HeaderLogo = () => {
  return (
    <div className={styles.navBg}>
      <div className="container flex justify-center">
        <div>
          <Link href="/"><Image src="/logo-hor.png" alt="logo" width={100} height={60} className={styles.img}/></Link>
        </div>
    </div>
    </div>
  )
}

export default HeaderLogo