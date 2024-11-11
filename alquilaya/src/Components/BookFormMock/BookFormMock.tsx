"use client"

import React from 'react';
import styles from './Book.module.css';

const BookFormMock = () => {
  
  return (
    <div>
      <form className={styles.form}>
        <div className={styles.boxGrid}>
          <div>
            <label htmlFor="checkInDate" className={styles.label}>Fecha de Entrada</label>
            <input
              type="date"
              id="checkInDate"
              name="CheckIn"
              placeholder="Fecha de Ingreso"
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="checkOutDate" className={styles.label}>Fecha de Salida</label>
            <input
              type="date"
              id="checkOutDate"
              name="CheckOut"
              placeholder="Fecha de Salida"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.centerButton}>
          <button className={styles.button}>Reservar</button>
        </div>
      </form>
    </div>
  );
};

export default BookFormMock;
