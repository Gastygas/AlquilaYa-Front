

const Hero = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('/HeroBg.jpg')` }} >
      <div className="container absolute inset-0 flex justify-between">
          <div className='z-10 flex flex-col items-center justify-center'>
            <h1 style={{ textShadow: '8px 8px 12px rgba(0, 0, 0, 0.7)' }} className='text-white text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-secondary' >Explora, Reserva y Disfruta<br/> ¡Así de fácil!</h1>
          </div>
      </div>
    </div >
  )
}

export default Hero