"use client"
import Button from "../Button/Button"
import styles from "./BookForm.module.css"

const BookForm = () => {
  return (
    <form className="flex flex-col justify-center">
        <div className='grid grid-cols-2 gap-8 p-12'>
            <div><input type='date'
        id='checkInDate'
        name='CheckIn'
        placeholder='Fecha de Ingreso'
        //onChange={handleChange}
        //value={data.email}
        className={styles.input}
      /></div>
            <div><input type='date'
        id='checkInDate'
        name='CheckIn'
        placeholder='Fecha de Ingreso'
        //onChange={handleChange}
        //value={data.email}
        className={styles.input}
      /></div>
      </div>
      <Button variant="primary" className="font-bold text-secondary flex justify-center">Reservar</Button>
          </form>
  )
}

export default BookForm