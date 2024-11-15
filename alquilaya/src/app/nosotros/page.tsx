import Header from '@/Components/Header/Header'
import Image from 'next/image'
import React from 'react'
import styles from "./nosotros.module.css"
import { LiaLinkedin } from 'react-icons/lia'
import Link from 'next/link'

const page = () => {
  return (
    <div><Header />
      <main className="container">
        <div className="padding-section">
          <h1 className="mb-8">Sobre Nosotros</h1>
          <p className='text-base text-center pb-12'>Somos un equipo de desarrolladores, los cuales cursamos el BootCamp FullStack de Soy Henry, este es nuestro proyecto final<br />
            y estamos ansiosos de que lo uses, pues es el comienzo, de 6 carreras dedicadas al mundo Tech
          </p>
          <div className='grid grid-cols-3 gap-8 w-full justify-evenly'>
            <div>
              <div className='w-50 h-50 flex justify-center'>
                <Image src='/imagen1.png' alt='Imagen' width={250} height={250} className={styles.imagen}  />
              </div>
              <h3 className='text-center pt-4'>Samuel Franco</h3>
              <h5 className='text-center'>Desarrollador Fullstack</h5>
              <div className='flex justify-center py-4'>
              <Link href="https://www.linkedin.com/in/samuel-franco-zapata-174b90217/"><LiaLinkedin size={30} /></Link>
              </div>
            </div>
            <div>
              <div className='w-50 h-50 flex justify-center'>
                <Image src='/Luis.png' alt='Imagen' width={250} height={250} className={styles.imagen} />
              </div>
              <h3 className='text-center pt-4'>Luis Coronel</h3>
              <h5 className='text-center'>Desarrollador Fullstack</h5>
              <div className='flex justify-center py-4'>
              <Link href="https://www.linkedin.com/in/luis-coronel-3075544a/"><LiaLinkedin size={30} /></Link>
              </div>
            </div>
            <div>
              <div className='w-50 h-50 flex justify-center'>
                <Image src='/Benja.png' alt='Imagen' width={250} height={250} className={styles.imagen}  />
              </div>
              <h3 className='text-center pt-4'>Benjamín del Campo</h3>
              <h5 className='text-center'>Desarrollador Fullstack</h5>
              <div className='flex justify-center py-4'>
              <Link href="https://www.linkedin.com/in/benjamindelcampo/"><LiaLinkedin size={30} /></Link>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-8 w-full justify-evenly'>
            <div>
              <div className='w-50 h-50 flex justify-center'>
                <Image src='/Gaston.png' alt='Imagen' width={250} height={250} className={styles.imagen}  />
              </div>
              <h3 className='text-center pt-4'>Gastón</h3>
              <h5 className='text-center'>Desarrollador Fullstack</h5>
              <div className='flex justify-center py-4'>
              <Link href="https://www.linkedin.com/in/benjamindelcampo/"><LiaLinkedin size={30} /></Link>
              </div>
            </div>
            <div>
              <div className='w-50 h-50 flex justify-center'>
                <Image src='/Abby.png' alt='Imagen' width={250} height={250} className={styles.imagen}  />
              </div>
              <h3 className='text-center pt-4'>Abby García</h3>
              <h5 className='text-center'>Desarrollador Fullstack</h5>
              <div className='flex justify-center py-4'>
              <Link href="https://www.linkedin.com/in/abigail-vanina-garcia-926059314/"><LiaLinkedin size={30} /></Link>

              </div>
            </div>
            <div>
              <div className='w-50 h-50 flex justify-center'>
                <Image src='/Hugo.png' alt='Imagen' width={250} height={250} className={styles.imagen}  />
              </div>
              <h3 className='text-center pt-4'>Hugo Agüero</h3>
              <h5 className='text-center'>Desarrollador Fullstack</h5>
              <div className='flex justify-center py-4'>
                <Link href="https://www.linkedin.com/in/hugoesteban/"><LiaLinkedin size={30} /></Link>
              </div>
            </div>

            

          </div>

        </div>
      </main>
    </div>
  )
}

export default page