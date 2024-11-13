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

    const response: any = await registerService(`${process.env.NEXT_PUBLIC_BACK_URL}/auth/signup`, data)
    if (response.succes) {
      notifyRegisterTrue();
      router.back();
    } else {
      notifyRegisterFalse();
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.gridForm}>
        <div className={styles.space}>
        <label htmlFor="name">Nombre de usuario:</label>
          <input
            type='text'
            id='name'
            name='name'
            // placeholder='Nombre'
            className={styles.input}
            onChange={handleChange}
            value={data.name}
          />
          {dirty.name ? <p className={styles.errorText}>{error.name}</p> : null}
          <label htmlFor="surname">Apellido:</label>
          <input
            type='text'
            id='surname'
            name='surname'
            // placeholder='Apellido'
            className={styles.input}
            onChange={handleChange}
            value={data.surname}
          />
          {dirty.surname ? <p className={styles.errorText}>{error.surname}</p> : null}
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
          {dirty.address ? <p className={styles.errorText}>{error.address}</p> : null}
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
          {dirty.country ? <p className={styles.errorText}>{error.country}</p> : null}
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
          {dirty.dni ? <p className={styles.errorText}>{error.dni}</p> : null}
        </div>
        <div className={styles.space}>
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
          {dirty.phone ? <p className={styles.errorText}>{error.phone}</p> : null}
        <label htmlFor="email">Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            // placeholder='Email'
            className={styles.input}
            onChange={handleChange}
            value={data.email}
          />
          {dirty.email ? <p className={styles.errorText}>{error.email}</p> : null}
          <label htmlFor="password">Contraseña:</label>
          <input
            type='password'
            id='password'
            name='password'
            // placeholder='Contraseña'
            className={styles.input}
            onChange={handleChange}
            value={data.password}
          />
          {dirty.password ? <p className={styles.errorText}>{error.password}</p> : null}
          <label htmlFor="confirmPassword">Confirma tu contraseña:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            // placeholder='Confirma tu contraseña'
            className={styles.input}
            onChange={handleChange}
            value={data.confirmPassword}
          />
          {dirty.confirmPassword ? <p className={styles.errorText}>{error.confirmPassword}</p> : null}

        </div>
      </div>
      <button className={styles.submitButton}>Regístrate</button>
      <Link href={`${process.env.NEXT_PUBLIC_BACK_URL}/auth/googleLogin`}><button className={styles.googleButton}>Iniciar sesión con <FaGoogle color="secondary" size={15}/></button></Link>
      <Link href="/login"><p className={styles.linkLogin}>¿Ya tienes una cuenta? Ingresa</p></Link>
     
    </form>
  );
};

export default RegisterForm;
