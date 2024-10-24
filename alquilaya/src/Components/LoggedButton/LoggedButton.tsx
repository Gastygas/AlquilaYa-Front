"use client"
import Link from "next/link";
import Button from "../Button/Button"
import NotLoggedButtons from "../NotLoggedButtons/NotLoggedButtons";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { IoLogOut } from "react-icons/io5";

const LoggedButton = () => {
 const { user,logout } = useContext(AuthContext);
 if(user?.user) {
return (
  <div className="flex flex-row justify-around items-center">
          <Link href="/"><Button variant="primary" className="font-bold text-secondary">Mi cuenta</Button></Link>
      <Button variant="transparent" onClick={logout} className="underline text-primary">Salir<IoLogOut size={20} color="--var(--darkBlue)"/></Button>
  </div>
)};return (<NotLoggedButtons/>)
}

export default LoggedButton