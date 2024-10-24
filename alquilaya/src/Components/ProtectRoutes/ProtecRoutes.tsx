"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../contexts/authContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.user) {
      // Si no está logueado, redirige a la página de login
      router.push("/login");
    }else {
      // Si está autenticado, deja de cargar y muestra el contenido
      setIsLoading(false);
    }
  }, [user,router]);

  if (isLoading) {
    // Mientras espera la validación, puedes mostrar un loader o mantener vacío
    return <p>Verificando autenticación...</p>;
  }

  // Mientras espera la validación, puedes mostrar un loader o mantener vacío
  return <>{children}</>;
};

export default ProtectedRoute;
