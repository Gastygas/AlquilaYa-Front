"use client";
import styles from "./ChangePassword.module.css"
import { FormEvent, useEffect, useState } from 'react';
import { validatePassword, validateConfirmPassword } from '@/app/helpers/validation';
import { useRouter, useSearchParams } from "next/navigation";
import { changePasswordService, loginService } from '@/services/authServices';
import { IUser } from "@/Interfaces/IUser";

const ChangePasswordForm = () => {
  const apiurl = process.env.NEXT_PUBLIC_BACK_URL;
  const initialUser = {name:'',surname:'',userPhoto:'',email:''}
  const searchParams= useSearchParams()
  const email = searchParams.get('email')
  const router = useRouter()
  const [user, setUser] = useState(initialUser);

  const initialData = {password: "",confirmPassword: "",email};
  const initialDirty = {password:false,confirmPassword:false}
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData)
  const [dirty, setDirty] = useState(initialDirty);

  const fetchUserByEmail = async () => { 
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/email/${email}`, {
        method: "GET",
        cache: "no-store"
      });
      if (!response.ok) {
        alert("No puedes acceder a esta ruta de esta manera");
        router.push('/');
        return;
      }
      const userData = await response.json();
      setUser(userData); // Almacena el usuario en el estado
    
  };
  useEffect(() => {
    fetchUserByEmail(); // Llama a la función cuando el componente se monta
  }, [email]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await changePasswordService(apiurl + "/auth/change/password", data)
    if (response.success) {
      alert("Tu contraseña se cambio exitosamente!");
      router.push('/login'); // Redirigir al login
    } else {
      alert(`Porfavor completa correctamente los datos faltantes`);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setError({
      password: validatePassword(data.password),
      confirmPassword: validateConfirmPassword(data.confirmPassword,data.password),
      email
    });
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full md:w-1/2 justify-center items-center'>

      <p className="text-sm">Que gusto verte de nuevo {user.name} {user.surname}. </p>
      <p className="text-sm">Ingresa tu nueva contraseña en el formulario.</p>

      <input type='password'
        id='password'
        name='password'
        placeholder='Nueva contraseña'
        onChange={handleChange}
        value={data.password}
        onBlur={handleBlur}
        className={styles.input}
      />
      {dirty.password ? <p className='text-red-600 text-sm'>{error.password}</p> : null}
      <input type='password'
        id='confirmPassword'
        name='confirmPassword'
        placeholder='Confirmar nueva contraseña'
        onChange={handleChange}
        value={data.confirmPassword}
        onBlur={handleBlur}
        className={styles.input}
      />
      {dirty.confirmPassword ? <p className='text-red-600 text-sm'>{error.confirmPassword}</p> : null}
      
      <button className={styles.submitButton} >
        Actualizar contraseña
      </button>
      
    </form>
  );
};

export default ChangePasswordForm;