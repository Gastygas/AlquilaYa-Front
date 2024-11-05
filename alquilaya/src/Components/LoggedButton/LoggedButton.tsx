"use client"
import Link from "next/link";
import Button from "../Button/Button"
import NotLoggedButtons from "../NotLoggedButtons/NotLoggedButtons";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { MdLogout } from "react-icons/md";
import styles from "./Logged.module.css"

const LoggedButton = () => {
 const { user,logout } = useContext(AuthContext);
 if(user?.user) {
return (
  <div className={styles.container}>
          <Link href="/mi-cuenta"><Button variant="primary" className={styles.account}>Mi cuenta</Button></Link>
      <Button variant="transparent" onClick={logout} className={styles.logout}>Salir<MdLogout size={20} color="--var(--darkBlue)"/></Button>
  </div>
)};return (<NotLoggedButtons/>)
}

export default LoggedButton