import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {

        try {

            const response = await api.get("/session");

            setUser(response.data);

        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);

        }
    };

    const logout = async () => {

        try {

            await api.post("/logout");

        } catch (error) {

            console.error("Logout error:", error);

        } finally {

            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                checkSession
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}