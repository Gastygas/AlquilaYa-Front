"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../contexts/authContext";

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
    if (!user?.user) {
      //router.push("/login");
      alert("no autorizo")
    } else if (adminOnly && !user?.user.isAdmin) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }
  }, [user, loading, router, adminOnly]);

  if (isLoading || loading) {
    return <p>Verificando autenticación...</p>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
