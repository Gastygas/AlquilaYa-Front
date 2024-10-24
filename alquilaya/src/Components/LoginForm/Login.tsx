"use client";
import styles from "./login.module.css"
import { FormEvent, useContext, /*useContext*/ useEffect, useState } from 'react';
import { validatePassword, validateEmail } from '@/app/helpers/validation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginService } from '@/services/authServices';
import { FaGoogle } from "react-icons/fa";
import AuthContext from "../contexts/authContext";




const LoginForm = () => {
  const {setUser} = useContext(AuthContext);
  const router = useRouter()
  const initialData = { email: "", password: "" };
  const initialDirty = { email: false, password: false };


  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData)
  const [dirty, setDirty] = useState(initialDirty)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const apiurl = process.env.NEXT_PUBLIC_BACK_URL;
    const response = await loginService(apiurl + "/auth/signin", data)
    if (response.succes) {
      alert("Inicio de sesión exitoso");
       setUser(response);
      router.push('/');
    } else {
      alert("Usuario o credenciales incorrectas");
    };
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full md:w-1/2 justify-center items-center'>

      <p className="text-sm">Ingresa tu usuario y contraseña para acceder</p>
      <input type='email'
        id='email'
        name='email'
        placeholder='Usuario'
        onChange={handleChange}
        value={data.email}

        className={styles.input}
      />

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
      
        <Link href="/register"><p className=" pt-12 text-sm font-bold underline text-primary hover:text-secondary transition-all">No tienes una cuenta? Regístrate</p></Link>
        <Link href="http://localhost:3001/auth/googleLogin"><button className={styles.googleButton}>Iniciar sesión con <FaGoogle color="secondary" size={15}/></button></Link>
    </form>
  );
};

export default LoginForm;