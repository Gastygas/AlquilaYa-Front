import Link from "next/link"
import Button from "../Button/Button"

const NotLoggedButtons = () => {
  return (
    <div className="flex">
    <Link href="/register"><Button variant="transparent" className="text-primary">Regístrate</Button></Link>
    <Link href="/login"><Button variant="primary" className="font-bold text-secondary">Inicia Sesión</Button></Link>
    </div>
  )
}

export default NotLoggedButtons