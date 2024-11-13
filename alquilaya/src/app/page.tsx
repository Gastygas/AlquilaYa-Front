'use client'
import Header from "@/Components/Header/Header";
import Hero from "@/Components/Hero/Hero";
import Section2 from "@/Components/Section-2/Section-2";
import Section3 from "@/Components/Section-3/Section-3";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '@/Interfaces/IUser';
import Chat from "@/Components/ChatBot/Chatbot";


export default function Home() {

  const initialToken = "Nada";
  const [token, setToken] = useState(initialToken);


  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setToken(token);
      const userGoogle : IUser = jwtDecode(token);
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
    }
  }, [])
 
    
  return (
    <div>
 <Header/> 
<Hero/>
<Section2/>
<Section3/>
<Chat/>
    </div>
  );
}