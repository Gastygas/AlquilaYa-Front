import { IUser } from "@/Interfaces/IUser";


export const getUserData = async (): Promise<IUser | null> => {
  if (typeof window === "undefined") return null;

  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    alert("Ha ocurrido un error");
    return null;
  }

  const parsedData = JSON.parse(storedUser);
  const userId = parsedData.user?.id;
  const apiUrl = `${process.env.NEXT_PUBLIC_BACK_URL}/users/${userId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching user data");
    }

    const data: IUser = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/property/${id}`); 
    if (!response.ok) {
      throw new Error('Error al obtener la propiedad'); 
    }
    return await response.json();
  } catch (error) {
    console.error(error); 
    return null; 
  }
};
