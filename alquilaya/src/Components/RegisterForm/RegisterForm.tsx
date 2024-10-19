"use client";
import { FormEvent, useEffect, useState } from 'react';
import { validatePassword, validateEmail, validateAddress } from '@/app/helpers/validation';
//import { registerService } from '@/services/authServices';
import { useRouter } from 'next/navigation';


const RegisterForm = () => {
  const initialData = { email: "", password: "", address: "", name: "", phone: "" };
  const initialDirty = { email: false, password: false, address: false, name: false, phone: false };

  const router = useRouter()
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
    <form onSubmit={handleSubmit} >
      <label htmlFor='email'>Email</label>
      <input type='email'
        id='email'
        name='email'
        placeholder='email@example.com'
        onChange={handleChange}
        value={data.email}
        onBlur={handleBlur}
        />
      {dirty.email ? <p>{error.email}</p> : null}

      <label htmlFor='password'>Password</label>
      <input type='password'
        id='password'
        name='password'
        placeholder='At least 8 characters'
        onChange={handleChange}
        value={data.password}
        onBlur={handleBlur}
        />
      {dirty.password ? <p>{error.password}</p> : null}

      <label htmlFor='address'>Address</label>
      <input type='text'
        id='address'
        name='address'
        placeholder='60 Wall Street'
        onChange={handleChange}
        value={data.address}
        onBlur={handleBlur}
         />
      {dirty.address ? <p >{error.address}</p> : null}

      <label htmlFor='name'>Name</label>
      <input type='name'
        id='name'
        name='name'
        placeholder='Name'
        onChange={handleChange}
        value={data.name}
        onBlur={handleBlur}
         />
      {dirty.name ? <p >{error.name}</p> : null}

      <label htmlFor='phone'>Phone</label>
      <input type='phone'
        id='phone'
        name='phone'
        placeholder='Phone'
        onChange={handleChange}
        value={data.phone}
        onBlur={handleBlur}
        />
      {dirty.phone ? <p>{error.phone}</p> : null}


      <button>Register</button>
    </form>
  );
};

export default RegisterForm;