"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import styles from "../RegisterForm/registerForm.module.css"
import { createProperty } from '@/services/createPropertyService';


const Prueba = () => {
const initialData = { propertyName: "", bill: "", address: "", country: "", city: "", price: "", bedrooms: "", capacity: "", bathrooms: "",description:'' };
const serviceesData = {wifi:false,petFriendly:false,airConditioning:false,heating:false,pool:false,parking:false}
  const initialDirty = { email: false, password: false, address: false,country: false, dni: false, name: false, phone: false, surname: false, confirmPassword: false };
  const router = useRouter()
  const [data, setData] = useState(initialData);
  const [dataServices, setDataServices] = useState(serviceesData);
  const [error, setError] = useState(initialData);
  const [dirty, setDirty] = useState(initialDirty);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
      const storedData = localStorage.getItem("user");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setToken(parsedData.token);
      } 
    }, []);



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response: any = createProperty(`${process.env.NEXT_PUBLIC_BACK_URL}/property/create`,{...data,...dataServices},token)
    if (response.ok) {
      alert("se creooo")
    //   router.back();
    } else {
      alert(`Porfavor revisa los siguientes campos: ${response.error.map((err:any) => err.property)}`);
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data, [e.target.name]: e.target.value
    })
    setDirty({ ...dirty, [e.target.name]: true });;
  };

  const handleChangeServices = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setData({
      ...data, [e.target.name]: true
    })
    
  };

    return (
            <div>
                <h2 className="ml-10 mt-10 text-black mb-2">Crea tu propiedad</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
            
          <div className={styles.gridForm}>
            <div className={styles.space}>
            <label htmlFor="propertyName">Nombre de la Propiedad</label>
              <input
                type='text'
                id='propertyName'
                name='propertyName'
                placeholder='Nombre'
                className={styles.input}
                onChange={handleChange}
                value={data.propertyName}
                />
              {/* {dirty.name ? <p className={styles.errorText}>{error.name}</p> : null} */}
              <label htmlFor="bill">Bill:</label>
              <input
                type='text'
                id='bill'
                name='bill'
                placeholder='Luz o agua'
                className={styles.input}
                onChange={handleChange}
                value={data.bill}
                />
              {/* {dirty.surname ? <p className={styles.errorText}>{error.surname}</p> : null} */}
              <label htmlFor="address">Dirección:</label>
              <input
                type='text'
                id='address'
                name='address'
                placeholder='Calle y altura'
                className={styles.input}
                onChange={handleChange}
                value={data.address}
                />
              {/* {dirty.address ? <p className={styles.errorText}>{error.address}</p> : null} */}
              <label htmlFor="country">País:</label>
              <input
                type='text'
                id='country'
                name='country'
                placeholder='País'
                className={styles.input}
                onChange={handleChange}
                value={data.country}
                />
              {/* {dirty.country ? <p className={styles.errorText}>{error.country}</p> : null} */}
              <label htmlFor="bathrooms">bathrooms:</label>
              <input
                type='text'
                id='bathrooms'
                name='bathrooms'
                placeholder='bathrooms'
                className={styles.input}
                onChange={handleChange}
                value={data.bathrooms}
                />
              {/* {dirty.dni ? <p className={styles.errorText}>{error.dni}</p> : null} */}
            </div>
            <div className={styles.space}>
            <label htmlFor="bedrooms">bedrooms:</label>
              <input
                type='text'
                id='bedrooms'
                name='bedrooms'
                placeholder='bedrooms'
                className={styles.input}
                onChange={handleChange}
                value={data.bedrooms}
                />
              {/* {dirty.phone ? <p className={styles.errorText}>{error.phone}</p> : null} */}
            <label htmlFor="capacity">capacity:</label>
              <input
                type='text'
                id='capacity'
                name='capacity'
                placeholder='capacity'
                className={styles.input}
                onChange={handleChange}
                value={data.capacity}
                />
              {/* {dirty.email ? <p className={styles.errorText}>{error.email}</p> : null} */}
              <label htmlFor="city">city:</label>
              <input
                type='text'
                id='city'
                name='city'
                placeholder='city'
                className={styles.input}
                onChange={handleChange}
                value={data.city}
                />
              {/* {dirty.city ? <p className={styles.errorText}>{error.password}</p> : null} */}
              <label htmlFor="description">description:</label>
              <input
                type='text'
                id='description'
                name='description'
                placeholder='description'
                className={styles.input}
                onChange={handleChange}
                value={data.description}
                />
              {/* {dirty.confirmPassword ? <p className={styles.errorText}>{error.confirmPassword}</p> : null} */}
              <label htmlFor="price">price:</label>
              <input
                type='text'
                id='price'
                name='price'
                placeholder='price'
                className={styles.input}
                onChange={handleChange}
                value={data.price}
                />

                <label htmlFor="petFriendly">petFriendly:</label>
              <input
                type='checkbox'
                id='petFriendly'
                name='petFriendly'
                placeholder='petFriendly'
                // className={styles.input}
                onChange={handleChangeServices}
                />
                <label htmlFor="wifi">wifi:</label>
              <input
                type='checkbox'
                id='wifi'
                name='wifi'
                placeholder='wifi'
                // className={styles.input}
                onChange={handleChangeServices}
                />
                <label htmlFor="airConditioning">airConditioning:</label>
              <input
                type='checkbox'
                id='airConditioning'
                name='airConditioning'
                placeholder='airConditioning'
                // className={styles.input}
                onChange={handleChangeServices}
                />

                <label htmlFor="heating">heating:</label>
              <input
                type='checkbox'
                id='heating'
                name='heating'
                placeholder='heating'
                // className={styles.input}
                onChange={handleChangeServices}
              />
                <label htmlFor="pool">pool:</label>
              <input
                type='checkbox'
                id='pool'
                name='pool'
                placeholder='pool'
                // className={styles.input}
                onChange={handleChangeServices}
                />

                <label htmlFor="parking">parking:</label>
              <input
                type='checkbox'
                id='parking'
                name='parking'
                placeholder='parking'
                // className={styles.input}
                onChange={handleChangeServices}
                />


            </div>
          </div>


          <button className={styles.submitButton}>Agregar</button>
         
        </form>
                </div>
      );
}
// {wifi:false,petFriendly:false,airConditioning:false,heating:true,pool:true,parking:true}

export default Prueba