"use client";
import { FormEvent, useContext, useEffect, useState } from 'react';
import { validatePassword, validateEmail } from '@/app/helpers/validation';
//import { loginService } from '@/services/authServices'; PREGUNTAR A BACK
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginService } from '@/services/authServices';
import Button from '../Button/Button';
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

    const response = await loginService(`${process.env.BACK_URL}/auth/signin`, data)
    if (response.login) {
      alert("Inicio de sesión exitoso");
      // setUser(response);
      // router.back();
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
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-8 bg-darkBlue'>
      <h2 className="text-3xl font-bold text-lightBlue mb-1 mt-14">Iniciar Sesión</h2>
      <div className='flex flex-col items-start space-y-2 w-80'>
        <label htmlFor='email' className='text-lightBlue'>Email</label>
        <input type='email'
          id='email'
          name='email'
          placeholder='email@ejemplo.com'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2"
          onChange={handleChange}
          value={data.email}
          onBlur={handleBlur}

        />
      </div>
      {dirty.email ? <p className='text-red-600'>{error.email}</p> : null}

      <div className="flex flex-col items-start space-y-2 w-80">
        <label htmlFor='password' className='text-lightBlue'>Contraseña</label>
        <input type='password'
          id='password'
          name='password'
          placeholder='Mínimo 8 caracteres'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2 "
          onChange={handleChange}
          value={data.password}
          onBlur={handleBlur}
         
        />

        {dirty.password ? <p className='text-red-600'>{error.password}</p> : null}
        </div>

        <div className='flex justify-between mt-6'>
          <Button variant="primary">Ingresar</Button>
          <Link href={"/RegisterForm"}>
            <Button variant="secondary">Registrate</Button>
          </Link>
        </div>
    </form>
  );
};

export default LoginForm;