"use client";
import styles from "./login.module.css"
import { FormEvent, useContext, /*useContext*/ useEffect, useState } from 'react';
import { validatePassword, validateEmail } from '@/app/helpers/validation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginService } from '@/services/authServices';
import { FaGoogle } from "react-icons/fa";
import AuthContext from "../contexts/authContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const {setUser} = useContext(AuthContext);
  const router = useRouter()
  const initialData = { email: "", password: "" };
  const notifyLoginTrue = () => toast.success("Inicio de sesión exitoso", { autoClose: 3000 });
  const notifyLoginFalse = () => toast.error("Inicio de sesión fallido, revisá tus datos", { autoClose: 3000 });


  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await loginService(`${process.env.NEXT_PUBLIC_BACK_URL}/auth/signin`, data)
    if (response.succes) {
      notifyLoginTrue();
       setUser(response);

       if (response.user.isAdmin) {
        router.push('/admin'); 
      } else {
        router.push('/'); 
      }
    } else {
      notifyLoginFalse();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setError({
      email: validateEmail(data.email),
      password: validatePassword(data.password),
    });
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className={styles.formEstructure}>
      <p className={styles.mail}>Ingresa tu email y contraseña para acceder</p>
      <label htmlFor="email">Correo electrónico</label>
      <input type='email'
        id='email'
        name='email'
        placeholder='Usuario'
        onChange={handleChange}
        value={data.email}
        className={styles.input}
      />
      <label htmlFor="password">Contraseña</label>
      <input type='password'
        id='password'
        name='password'
        placeholder='Contraseña'
        onChange={handleChange}
        value={data.password}
        className={styles.input}
      />

      <button className={styles.submitButton} >
        Ingresar
      </button>
      <Link href={`${process.env.NEXT_PUBLIC_BACK_URL}/auth/googleLogin`}><button className={styles.googleButton}>Iniciar sesión con <FaGoogle color="secondary" size={15}/></button></Link>
      <Link href="/register"><p className={styles.register}>No tienes una cuenta? Regístrate</p></Link>
      <Link href="/forget-password"><p className={styles.forgot}>Olvidaste tu contraseña? Click Aquí </p></Link>
    </form>
  );
};

export default LoginForm;