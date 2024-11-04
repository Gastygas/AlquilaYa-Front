"use client";
import { FormEvent, useEffect, useState } from 'react';
import { validatePassword, validateEmail, validateAddress, validateConfirmPassword, validateCountry, validateDni, validateName, validatePhone } from '@/app/helpers/validation';
import { useRouter } from 'next/navigation';
import { registerService } from '@/services/authServices';
import { FaGoogle } from "react-icons/fa";
import styles from "./registerForm.module.css"
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterForm = () => {
  const initialData = { email: "", password: "", address: "", country: "", dni: "", name: "", phone: "", surname: "", confirmPassword: "" };
  const initialDirty = { email: false, password: false, address: false,country: false, dni: false, name: false, phone: false, surname: false, confirmPassword: false };
  const router = useRouter()
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [dirty, setDirty] = useState(initialDirty);
  const notifyRegisterTrue = () => toast.success("Registro Exitoso", {autoClose: 3000 });
  const notifyRegisterFalse = () => toast.error("Registro fallido! Revisa tu información", {autoClose: 3000 });


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response: any = await registerService(`http://localhost:3001/auth/signup`, data)
    if (response.succes) {
      notifyRegisterTrue;
      router.back();
    } else {
      notifyRegisterFalse();
      //alert(`Porfavor revisa los siguientes campos: ${response.error.map((err:any) => err.property)}`);
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data, [e.target.name]: e.target.value
    })
    setDirty({ ...dirty, [e.target.name]: true });;
  };

  useEffect(() => {
    setError({
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      address: validateAddress(data.address),
      country: validateCountry(data.country),
      dni: validateDni(data.dni),
      name: validateName(data.name),
      phone: validatePhone(data.phone),
      surname: validateName(data.surname),
      confirmPassword: validateConfirmPassword(data.password, data.confirmPassword),
    });
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='gap-4 '>
        <label htmlFor="name">Nombre de usuario:</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Nombre'
            className={styles.input}
            onChange={handleChange}
            value={data.name}
          />
          {dirty.name ? <p className='text-red-600 text-sm'>{error.name}</p> : null}
          <label htmlFor="surname">Apellido:</label>
          <input
            type='text'
            id='surname'
            name='surname'
            placeholder='Apellido'
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
            placeholder='Calle y altura'
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
            placeholder='País'
            className={styles.input}
            onChange={handleChange}
            value={data.country}
          />
          {dirty.country ? <p className='text-red-600 text-sm'>{error.country}</p> : null}
          <label htmlFor="dni">DNI:</label>
          <input
            type='text'
            id='dni'
            name='dni'
            placeholder='DNI'
            className={styles.input}
            onChange={handleChange}
            value={data.dni}
          />
          {dirty.dni ? <p className='text-red-600 text-sm'>{error.dni}</p> : null}
        </div>
        <div className='gap-4 '>
        <label htmlFor="phone">Teléfono:</label>
          <input
            type='phone'
            id='phone'
            name='phone'
            placeholder='Número de celular'
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
            placeholder='Email'
            className={styles.input}
            onChange={handleChange}
            value={data.email}
          />
          {dirty.email ? <p className='text-red-600 text-sm'>{error.email}</p> : null}
          <label htmlFor="password">Contraseña:</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Contraseña'
            className={styles.input}
            onChange={handleChange}
            value={data.password}
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
          />
          {dirty.confirmPassword ? <p className='text-red-600 text-sm'>{error.confirmPassword}</p> : null}

        </div>
      </div>
      <button className={styles.submitButton}>Regístrate</button>
      <Link href="http://localhost:3001/auth/googleLogin"><button className={styles.googleButton}>Iniciar sesión con <FaGoogle color="secondary" size={15}/></button></Link>
      <Link href="/login"><p className=" pt-8 text-sm font-bold underline text-primary hover:text-secondary transition-all">¿Ya tienes una cuenta? Ingresa</p></Link>
     
    </form>
  );
};

export default RegisterForm;
