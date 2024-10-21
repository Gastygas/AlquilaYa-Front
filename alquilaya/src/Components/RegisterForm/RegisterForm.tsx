"use client";
import styles from "./registerForm.module.css"
import { FormEvent, useEffect, useState } from 'react';
import { validatePassword, validateEmail, validateAddress } from '@/app/helpers/validation';
//import { registerService } from '@/services/authServices';
//import { useRouter } from 'next/navigation';


const RegisterForm = () => {
  const initialData = { email: "", password: "", address: "", name: "", phone: "" };
  const initialDirty = { email: false, password: false, address: false, name: false, phone: false };

  //const router = useRouter()
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [dirty, setDirty] = useState(initialDirty);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const response = await registerService(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, data)
    // if (!response.message) {
    //   alert("You are Registered!");
    //   router.back();
    // } else {
    //   alert(response.message);
    // }


  };

  const handleChange = (e: any) => {
    console.log("handleChange");
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e: any) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  useEffect(() => {
    setError({
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      address: validateAddress(data.address),
      name: validateAddress(data.name),
      phone: validateAddress(data.phone),
    });
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-1/2 justify-center items-center" >
            <p className="text-sm">Enter your username and password to access</p>
      <input type='email'
        id='email'
        name='email'
        placeholder='Email'
        onChange={handleChange}
        value={data.email}
        onBlur={handleBlur}
        className={styles.input}
      />
      {dirty.email ? <p className="text-red-600 text-sm text-center">{error.email}</p> : null}
      <input type='password'
        id='password'
        name='password'
        placeholder='Contraseña'
        onChange={handleChange}
        value={data.password}
        onBlur={handleBlur}
        className={styles.input}
      />
      {dirty.password ? <p className="text-red-600 text-sm text-center">{error.password}</p> : null}
      <input type='text'
        id='address'
        name='address'
        placeholder='Dirección'
        onChange={handleChange}
        value={data.address}
        onBlur={handleBlur}
        className={styles.input}
      />
      {dirty.address ? <p className="text-red-600 text-sm text-center">{error.address}</p> : null}
      <input type='name'
        id='name'
        name='name'
        placeholder='Nombre'
        onChange={handleChange}
        value={data.name}
        onBlur={handleBlur}
        className={styles.input}
      />
      {dirty.name ? <p className="text-red-600 text-sm text-center">{error.name}</p> : null}

      <input type='phone'
        id='phone'
        name='phone'
        placeholder='Teléfono'
        onChange={handleChange}
        value={data.phone}
        onBlur={handleBlur}
        className={styles.input}
      />
      {dirty.phone ? <p className="text-red-600 text-sm text-center">{error.phone}</p> : null}


      <button className={styles.submitButton} /*onClick={handleSubmit}*/>Register</button>
    </form>
  );
};

export default RegisterForm;