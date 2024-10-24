"use client";
import { IUserSession } from "@/Interfaces/IUserSesion";
import {createContext, useEffect, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextprops {
    user: IUserSession | null;
    setUser: (user: IUserSession | null) => void;
    logout:() => void;
}

 const AuthContext = createContext<AuthContextprops>({
    user: null,
    setUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps
) => {
    const [user, setUser] = useState<IUserSession | null>(null);
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
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
};



export default AuthContext;