"use client";
import { FormEvent, useEffect, useState } from 'react';
import { validatePassword, validateEmail, validateAddress, validateConfirmPassword } from '@/app/helpers/validation';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { registerService } from '@/services/authServices';


const RegisterForm = () => {
  const initialData = { email: "", password: "", address: "", name: "", phone: "", surname: "", confirmPassword: "" };
  const initialDirty = { email: false, password: false, address: false, name: false, phone: false, surname: false, confirmPassword: false  };

  const router = useRouter()
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [dirty, setDirty] = useState(initialDirty);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await registerService(`${process.env.BACK_URL}/auth/`, data)
    if (!response.message) {
      alert("Registro exitoso");
      router.back();
    } else {
      alert(response.message);
    }


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
      surname: validateAddress(data.surname),
      confirmPassword: validateConfirmPassword(data.password, data.confirmPassword),
    });
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-8 bg-darkBlue min-h-screen overflow-y-auto'>
      <h2 className="text-3xl font-bold text-lightBlue mb-1 mt-14">Registrarse</h2>
      <div className='flex flex-col items-start space-y-2 w-80'>
        <label htmlFor='name' className='text-lightBlue'>Nombre</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='nombre'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2"
          onChange={handleChange}
          value={data.name}
          onBlur={handleBlur}
        />
        {dirty.name ? <p className='text-red-600'>{error.name}</p> : null}
      </div>

      <div className='flex flex-col items-start space-y-2 w-80'>
        <label htmlFor='name' className='text-lightBlue'>Apellido</label>
        <input
          type='text'
          id='surname'
          name='surname'
          placeholder='apellido'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2"
          onChange={handleChange}
          value={data.surname}
          onBlur={handleBlur}
        />
        {dirty.surname ? <p className='text-red-600'>{error.surname}</p> : null}
      </div>

      <div className='flex flex-col items-start space-y-2 w-80'>
        <label htmlFor='address' className='text-lightBlue'>Dirección</label>
        <input
          type='text'
          id='address'
          name='address'
          placeholder='calle y altura'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2"
          onChange={handleChange}
          value={data.address}
          onBlur={handleBlur}
        />
        {dirty.address ? <p className='text-red-600'>{error.address}</p> : null}
      </div>

      <div className='flex flex-col items-start space-y-2 w-80'>
        <label htmlFor='phone' className='text-lightBlue'>Celular</label>
        <input
          type='phone'
          id='phone'
          name='phone'
          placeholder='número de celular'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2"
          onChange={handleChange}
          value={data.phone}
          onBlur={handleBlur}
        />
        {dirty.phone ? <p className='text-red-600'>{error.phone}</p> : null}
      </div>

      <div className='flex flex-col items-start space-y-2 w-80'>
        <label htmlFor='email' className='text-lightBlue'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='email@ejemplo.com'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2"
          onChange={handleChange}
          value={data.email}
          onBlur={handleBlur}
        />
        {dirty.email ? <p className='text-red-600'>{error.email}</p> : null}
      </div>

      <div className='flex flex-col items-start space-y-2 w-80'>
        <label htmlFor='password' className='text-lightBlue'>Contraseña</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='mínimo 8 carácteres'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2"
          onChange={handleChange}
          value={data.password}
          onBlur={handleBlur}
        />
        {dirty.password ? <p className='text-red-600'>{error.password}</p> : null}
      </div>

      <div className='flex flex-col items-start space-y-2 w-80'>
        <label htmlFor='confirmPassword' className='text-lightBlue'>Confirmar contraseña</label>
        <input
          type='confirmPassword'
          id='confirmPassword'
          name='confirmPassword'
          //placeholder='Mínimo 8 caracteres'
          className="w-full p-3 rounded-lg bg-slate-100 text-darkBlue border-spacing-2"
          onChange={handleChange}
          value={data.confirmPassword}
          onBlur={handleBlur}
        />
        {dirty.confirmPassword ? <p className='text-red-600'>{error.confirmPassword}</p> : null}
      </div>

      <button className="mt-6 bg-lightBlue text-white font-bold py-2 px-4 rounded-lg">Registrate</button>
    </form>
  );
};

export default RegisterForm;