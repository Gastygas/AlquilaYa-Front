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
