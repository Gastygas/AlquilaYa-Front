"use client";
import Header from "@/Components/Header/Header";
import Hero from "@/Components/Hero/Hero";
import Section2 from "@/Components/Section-2/Section-2";
import Section3 from "@/Components/Section-3/Section-3";
import { useEffect, useState } from "react";
// import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '@/Interfaces/IUser';
import Chatbot from "@/Components/ChatBot/Chatbot";

export default function Home() {

  const initialToken = "Nada";
  const [token, setToken] = useState(initialToken);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth_token = params.get('auth_token');
//    const token = Cookies.get('auth_token');
    if (auth_token) {
      setToken(auth_token);
      const userGoogle : IUser = jwtDecode(auth_token);
      console.log("userGoogle: ", userGoogle); 
  
      const user ={
        success: 'you have logged in',
        user: {
          id: userGoogle.id,
          email: userGoogle.email,
          isAdmin: userGoogle.isAdmin,
        },
        login: true,
      }
  
      localStorage.setItem("user", JSON.stringify(user));
      //window.location.href = '/';

       // Actualizar la URL eliminando el parámetro `auth_token` sin recargar la página
       window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [])
 
    
  return (
    <div>
 <Header/> 
<Hero/>
<Section2/>
<Section3/>
<Chatbot/>
    </div>
  );
}