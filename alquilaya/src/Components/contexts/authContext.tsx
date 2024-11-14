"use client";
import { IUserSession } from "@/Interfaces/IUserSesion";
import {createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextprops {
    user: IUserSession | null;
    setUser: (user: IUserSession | null) => void;
    logout:() => void;
    loading: boolean;
}

 const AuthContext = createContext<AuthContextprops>({
    user: null,
    setUser: () => {},
    logout: () => {},
    loading: true
});

export const AuthProvider = ({ children }: AuthProviderProps
) => {
    const [user, setUser] = useState<IUserSession | null>(null);
    const [loading, setLoading] = useState(true);
    const notifyLogoutTrue = () => toast.success("Sesión cerrada exitosamente", { autoClose: 3000 });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }

    }, [user]);

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if (localUser) {
            setUser(JSON.parse(localUser));
        }
        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("data");
        setUser(null);
        notifyLogoutTrue()
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
};



export default AuthContext;