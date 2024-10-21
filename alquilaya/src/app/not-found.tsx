import HeaderLogo from "@/Components/HeaderLogo/HeaderLogo"
import Link from "next/link"

const notfound = () => {
  return (
    <div>
      <HeaderLogo/>
    <div className="container">
    <div className="padding-section">
      <h1 className=" pt-20 text-8xl text-primary">404</h1>
        <h3 className="text-primary">Lo sentimos, página no encontrada</h3>
        <Link href="/"><button className="mt-40 flex text-sm px-24 py-[7px] rounded-[20px] bg-primary text-secondary font-bold
    cursor-pointer transition-all duration-300 hover:scale-90">Volver al inicio</button></Link>

    </div>
  </div>
  </div>
  )
}

export default notfound