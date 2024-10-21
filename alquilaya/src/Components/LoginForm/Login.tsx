"use client";
import styles from "./login.module.css"
import { FormEvent, useContext, useEffect, useState } from 'react';
import { validatePassword, validateEmail } from '@/app/helpers/validation';
//import { loginService } from '@/services/authServices'; PREGUNTAR A BACK
import { useRouter } from 'next/navigation';
import Link from 'next/link';
//import AuthContext from '@/contexts/authContext'; RUTA DEL ESTADO GLOBAL



const LoginForm = () => {
  //const {setUser} = useContext(AuthContext);

  const router = useRouter()
  const initialData = { email: "", password: "" };
  const initialDirty = { email: false, password: false };


  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData)
  const [dirty, setDirty] = useState(initialDirty)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //     const response = await loginService(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, data)
    //     if (response.login) {
    //       alert("Login success");
    //       setUser(response);
    //       router.back();
    //     } else {
    //       alert("User or credentials wrong!");
    //     };
    //   };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
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
          onBlur={handleBlur}
          className={styles.input}
        />
      {dirty.email ? <p className='text-red-600 text-sm'>{error.email}</p> : null}
        <input type='password'
          id='password'
          name='password'
          placeholder='Contraseña'
          onChange={handleChange}
          value={data.password}
          onBlur={handleBlur}
          className={styles.input}
        />
      {dirty.password ? <p className='text-red-600 text-sm'>{error.password}</p> : null}
        <button className={styles.submitButton} /*onClick={handleSubmit}*/>
          Ingresar
        </button>
        <Link
          href={"/register"}>
<Link href="/register"><p className=" pt-12 text-sm font-bold underline text-primary hover:text-secondary transition-all">No tienes una cuenta? Regístrate</p></Link>
        </Link>
    </form>
  );
};

export default LoginForm;