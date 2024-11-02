"use client";
import styles from "./ForgetPass.module.css"
import { FormEvent, useContext, /*useContext*/ useEffect, useState } from 'react';
import { validateEmail } from '@/app/helpers/validation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { forgotPasswordService, loginService } from '@/services/authServices';

const ForgetPasswordForm = () => {
  const initialData = { email: ""};
  const router = useRouter()

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const apiurl = process.env.NEXT_PUBLIC_BACK_URL;
    const response = await forgotPasswordService(apiurl + `/auth/forgot/password/${data.email}`)
    if (response.success) {
      alert("Porfavor, revisa tu mail. Puede demorar unos minutos, sea paciente y no vuelva a mandar otro mail sino suspenderemos su cuenta");
      router.push('/')
      }
    else {
      alert("Usuario o credenciales incorrectas");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setError({
      email: validateEmail(data.email)
    });
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full md:w-1/2 justify-center items-center'>

      <p className="text-sm text-center">Ingresa tu mail y te enviaremos una notificacion via mail para recuperar tu contraseña </p>
      <input type='email'
        id='email'
        name='email'
        placeholder='Email'
        onChange={handleChange}
        value={data.email}

        className={styles.input}
      />

      <button className={styles.submitButton} >
        Enviar mail
      </button>
        <Link href="/register"><p className=" pt-12 text-sm font-bold underline text-primary hover:text-secondary transition-all">No tienes una cuenta? Regístrate</p></Link>
    </form>
  );
};

export default ForgetPasswordForm;