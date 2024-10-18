import Button from "../Button/Button"

const NotLoggedButtons = () => {
  return (
    <div className="flex">
    <Button variant="transparent" className="text-primary">Regístrate</Button>
    <Button variant="primary" className="font-bold text-white">Inicia Sesión</Button>
    </div>
  )
}

export default NotLoggedButtons