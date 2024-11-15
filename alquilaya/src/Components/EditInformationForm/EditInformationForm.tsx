"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  validateEmail,
  validateAddress,
  validateCountry,
  validateDni,
  validateName,
  validatePhone,
} from "@/app/helpers/validation";
import { useRouter } from "next/navigation";
import { updateUserService } from "@/services/authServices";
import styles from "./Edit.module.css";
import AuthContext from "../contexts/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData } from "@/services/dataUserService";
import { IUser } from "@/Interfaces/IUser";

const EditInformationForm = () => {
  // Estados iniciales
  const initialData = {
    id: "",
    email: "",
    address: "",
    country: "",
    dni: "",
    name: "",
    phone: "",
    surname: "",
  };

  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [dirty, setDirty] = useState(initialData);
  const [userData, setUserData] = useState<IUser | null>(null);
 /* useEffect(() => {
    // Cargar datos desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setData({
        id: parsedUser.id || "",
        email: parsedUser.email || "",
        address: parsedUser.address || "",
        country: parsedUser.country || "",
        dni: parsedUser.dni || "",
        name: parsedUser.name || "",
        phone: parsedUser.phone || "",
        surname: parsedUser.surname || "",
      });
    }
  }, []);*/
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
        console.log("data", data)
      } else {
        setError({
          id:  "",
          email:  "",
          address: "",
          country: "",
          dni: "",
          name: "",
          phone: "",
          surname:"",
        });
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Validar dinámicamente los campos
    setError({
      id: validateCountry(data.id),
      email: validateEmail(data.email),
      address: validateAddress(data.address),
      country: validateCountry(data.country),
      dni: validateDni(data.dni),
      name: validateName(data.name),
      phone: validatePhone(data.phone),
      surname: validateName(data.surname),
    });
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Actualizar datos y marcar campos como "sucios"
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setDirty({ ...dirty, [name]: true });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("Usuario no autenticado");
      return;
    }

    const response = await updateUserService(
      `${process.env.NEXT_PUBLIC_BACK_URL}/users/edit`,
      data,
      token
    );

    if (response.success) {
      setUser(response);
      toast.success("Edición exitosa");
      router.push("/");
    } else {
      toast.error("Ha ocurrido un error, vuelve a intentar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        {/* Primera columna */}
        <div className="gap-4">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            onChange={handleChange}
            value={userData?.name}
            disabled
          />
          {dirty.name && <p className={styles.errorText}>{error.name}</p>}

          <label htmlFor="surname">Apellido:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            className={styles.input}
            onChange={handleChange}
            value={userData?.surname}
            disabled
          />
          {dirty.surname && <p className={styles.errorText}>{error.surname}</p>}

          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            name="address"
            className={styles.input}
            onChange={handleChange}
            value={userData?.address}
          />
          {dirty.address && <p className={styles.errorText}>{error.address}</p>}

          <label htmlFor="country">País:</label>
          <input
            type="text"
            id="country"
            name="country"
            className={styles.input}
            onChange={handleChange}
            value={userData?.country}
          />
          {dirty.country && <p className={styles.errorText}>{error.country}</p>}
        </div>

        {/* Segunda columna */}
        <div className="gap-4">
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            className={styles.input}
            value={userData?.dni}
            disabled
          />
          {dirty.dni && <p className={styles.errorText}>{error.dni}</p>}

          <label htmlFor="phone">Teléfono:</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            className={styles.input}
            onChange={handleChange}
            value={userData?.phone}
          />
          {dirty.phone && <p className={styles.errorText}>{error.phone}</p>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            onChange={handleChange}
            value={userData?.email}
          />
          {dirty.email && <p className={styles.errorText}>{error.email}</p>}
        </div>
      </div>

      <button className={styles.submitButton} type="submit">
        Guardar cambios
      </button>
    </form>
  );
};

export default EditInformationForm;
