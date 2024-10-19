"use client";
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
    <form onSubmit={handleSubmit} className='padding-section container bg-darkBlue text-lightBlue p-6 rounded-lg'>

      <div className='flex justify-between items-center mb-4'>
        <input type='email'
          id='email'
          name='email'
          placeholder='email@ejemplo.com'
          onChange={handleChange}
          value={data.email}
          onBlur={handleBlur}
          className='w-3/4 border border-lightBlue p-3 rounded-md bg-lightBlue text-darkBlue'
        />
        <label htmlFor='email' className='ml-4 text-cyan'>Email</label>
      </div>
      {dirty.email ? <p className='text-red-600'>{error.email}</p> : null}


      <div className='flex justify-between items-center mb-4'>
        <input type='password'
          id='password'
          name='password'
          placeholder='Al menos 8 caracteres'
          onChange={handleChange}
          value={data.password}
          onBlur={handleBlur}
          className='w-3/4 border border-lightBlue p-3 rounded-md bg-lightBlue text-darkBlue'
        />
        <label htmlFor='password' className='ml-4 text-cyan'>Contraseña</label>
      </div>
      {dirty.password ? <p className='text-red-600'>{error.password}</p> : null}

      <div className='flex justify-between items-center mt-6'>
        <button>
          Ingresar
        </button>

        <Link
          href={"/register"}>
          <button >
            Registrate
          </button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;