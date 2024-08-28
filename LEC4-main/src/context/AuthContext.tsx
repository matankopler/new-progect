import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    login: (jwt: string) => { },
    logout: () => { },
    getLoggedInUser: () => {
        return {
            id: "" as string,
            token: "" as string
        }
    }
});

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true)
        }
    }, []);

    const login = (jwt: string) => {
        setIsLoggedIn(true)
        localStorage.setItem("token", jwt)
    };

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("token")
    };

    const getLoggedInUser = () => {
        const token = localStorage.getItem("token");
        if (!token) return {}
        const user = jwtDecode<{ _id: string }>(token)
        return { id: user._id, token };
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, getLoggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
}

