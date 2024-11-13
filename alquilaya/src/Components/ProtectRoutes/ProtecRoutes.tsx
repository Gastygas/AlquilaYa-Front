"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../contexts/authContext";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const notifyLogOutTrue = () => toast.success("Has Cerrado Sesión exitosamente", { autoClose: 3000 });

  useEffect(() => {
    if (!loading) {
      if (!user?.user) {
        notifyLogOutTrue()
        router.push("/");
      } else if (adminOnly && !user?.user.isAdmin) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    }
  }, [user, loading, router, adminOnly]);

  if (isLoading || loading) {
    return <Loader />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
