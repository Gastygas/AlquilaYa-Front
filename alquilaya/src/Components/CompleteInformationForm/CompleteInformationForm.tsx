"use client";
import { FormEvent, useContext, useEffect, useState } from 'react';
import { validatePassword, validateEmail, validateAddress, validateConfirmPassword, validateCountry, validateDni, validateName, validatePhone } from '@/app/helpers/validation';
import { useRouter } from 'next/navigation';
import { registerService, updateUserService } from '@/services/authServices';
import styles from "./complete.module.css"
import Link from 'next/link';
import { IUser } from '@/Interfaces/IUser';
import { getUserData } from '@/services/dataUserService';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../contexts/authContext';


const CompleteInformationForm = () => {
  const initialData = { id: "", email: "", address: "", country: "", dni: "", name: "", phone: "", surname: "",};
  const initialDirty = { id: false, email: false, address: false,country: false, dni: false, name: false, phone: false, surname: false};
  const initialToken = "Nada";
  const {setUser} = useContext(AuthContext);

  const router = useRouter()
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [dirty, setDirty] = useState(initialDirty);
  const [token, setToken] = useState(initialToken);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await updateUserService(`${process.env.NEXT_PUBLIC_BACK_URL}/users/edit`, data, token)
    response.token = token;//agrego el token al objeto response
    console.log("response: ", response);
    if (response.success) {
        localStorage.setItem("user", JSON.stringify(response));
      
      alert("Registro exitoso");
      //router.push('/');
      window.location.href = '/';
    } else {
      alert(`Porfavor revisa los siguientes campos: ${response.error.map((err:any) => err.property)}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };


  useEffect(() => {
    setError({
      id: validateCountry(data.id),
      email: validateEmail(data.email),
      // password: validatePassword(data.password),
      address: validateAddress(data.address),
      country: validateCountry(data.country),
      dni: validateDni(data.dni),
      name: validateName(data.name),
      phone: validatePhone(data.phone),
      surname: validateName(data.surname),
      // confirmPassword: validateConfirmPassword(data.password, data.confirmPassword),
    });
  }, [data]);
 
  //--------------------------------------------------------------------------
  //------------Cookie--------------------------------------------------------
  //--------------------------------------------------------------------------
  
  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setToken(token);
      const userGoogle : IUser = jwtDecode(token);
      console.log("userGoogle: ", userGoogle);
      const userData = {
        id: userGoogle.id,
        name: userGoogle.name,
        surname: userGoogle.surname,
        address: userGoogle.address,
        country: userGoogle.country,
        dni: userGoogle.dni,
        phone: userGoogle.phone,
        email: userGoogle.email
      }
      setData(userData);
      
      console.log("Data: ", userData);
    }
  }, [])
    
//--------------------------------------------------------------------------
//------------Cookie--------------------------------------------------------
//--------------------------------------------------------------------------
  /*useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
      } 
    };

    fetchUserData();
  }, []);*/

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='gap-4 '>
        <label htmlFor="name">Nombre de usuario:</label>
          <input
            type='text'
            id='name'
            name='name'
            // placeholder={userData?.name}
            className={styles.input}
            onChange={handleChange}
            value={data?.name}
          />
          {dirty.name ? <p className='text-red-600 text-sm'>{error.name}</p> : null}
          <label htmlFor="surname">Apellido:</label>
          <input
            type='text'
            id='surname'
            name='surname'
            // placeholder={userData?.surname}
            className={styles.input}
            onChange={handleChange}
            value={data.surname}
          />
          {dirty.surname ? <p className='text-red-600 text-sm'>{error.surname}</p> : null}
          <label htmlFor="address">Dirección:</label>
          <input
            type='text'
            id='address'
            name='address'
            // placeholder='Calle y altura'
            className={styles.input}
            onChange={handleChange}
            value={data.address}
          />
          {dirty.address ? <p className='text-red-600 text-sm'>{error.address}</p> : null}
          <label htmlFor="country">País:</label>
          <input
            type='text'
            id='country'
            name='country'
            // placeholder='País'
            className={styles.input}
            onChange={handleChange}
            value={data.country}
          />
          {dirty.country ? <p className='text-red-600 text-sm'>{error.country}</p> : null}
          
        </div>
        <div className='gap-4 '>
        <label htmlFor="dni">DNI:</label>
          <input
            type='text'
            id='dni'
            name='dni'
            // placeholder='DNI'
            className={styles.input}
            onChange={handleChange}
            value={data.dni}
          />
          {dirty.dni ? <p className='text-red-600 text-sm'>{error.dni}</p> : null}
        <label htmlFor="phone">Teléfono:</label> 
          <input
            type='phone'
            id='phone'
            name='phone'
            // placeholder='Número de celular'
            className={styles.input}
            onChange={handleChange}
            value={data.phone}
          />
          {dirty.phone ? <p className='text-red-600 text-sm'>{error.phone}</p> : null}
          <label htmlFor="email">Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            // placeholder={userData?.email}
            className={styles.input}
            onChange={handleChange}
            value={data.email}
          />
          {dirty.email ? <p className='text-red-600 text-sm'>{error.email}</p> : null}
          {/* <label htmlFor="password">Contraseña:</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Contraseña'
            className={styles.input}
            onChange={handleChange}
            value={data.password}
            onBlur={handleBlur}
          />
          {dirty.password ? <p className='text-red-600 text-sm'>{error.password}</p> : null}
          <label htmlFor="confirmPassword">Confirma tu contraseña:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Confirma tu contraseña'
            className={styles.input}
            onChange={handleChange}
            value={data.confirmPassword}
            onBlur={handleBlur}
          />
          {dirty.confirmPassword ? <p className='text-red-600 text-sm'>{error.confirmPassword}</p> : null} */}

        </div>
      </div>
      <button className={styles.submitButton}>Completa tus datos</button>
    </form>
  );
};

export default CompleteInformationForm;
