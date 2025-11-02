import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/api";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Login user and save token
    const loginUser = (userData, token) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    // Logout user
    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // Signup API
    const signup = async (data) => {
        const res = await api.post("/signup", data);
        loginUser(res.data.user, res.data.token);
        return res.data;
    };

    // Login API
    const login = async (data) => {
        const res = await api.post("/login", data);
        loginUser(res.data.user, res.data.token);
        return res.data;
    };

    // Get profile API
    const getProfile = async () => {
        const res = await api.get("/profile");
        return res.data;
    };

    return (
        <AuthContext.Provider
            value={{ user, loginUser, logoutUser, signup, login, getProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// -------------------- useUser Hook --------------------
export const useUser = () => {
    return useContext(AuthContext);
};

export default AuthContext;
