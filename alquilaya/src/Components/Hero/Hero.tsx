import styles from "./Hero.module.css"

const Hero = () => {
  return (
    <div className={styles.heroBg} style={{ backgroundImage: `url('/HeroBg.jpg')` }} >
      <div className={styles.containerGrid}>
          <div className={styles.textOrder}>
            <h1 style={{ textShadow: '8px 8px 12px rgba(0, 0, 0, 0.7)' }} className={styles.text} >Explora, Reserva y Disfruta<br/> ¡Así de fácil!</h1>
          </div>
      </div>
    </div >
  )
}

export default Hero