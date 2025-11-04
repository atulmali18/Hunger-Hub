import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const rawAdmin = localStorage.getItem("admin");
        if (token) {
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            try {
                setAdmin(rawAdmin ? JSON.parse(rawAdmin) : null);
            } catch {
                setAdmin(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post("/user/login", { email, password });
            if (!data?.token) throw new Error(data?.message || "Invalid login response");
            localStorage.setItem("token", data.token);
            localStorage.setItem("admin", JSON.stringify(data.admin || {}));
            axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;
            setAdmin(data.admin || {});
            toast.success("Logged in");
            return { ok: true, data };
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Login failed");
            return { ok: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        delete axiosInstance.defaults.headers.Authorization;
        setAdmin(null);
        toast.success("Logged out");
    };

    return (
        <AuthContext.Provider value={{ admin, setAdmin, loading, login, logout, isAuthenticated: !!admin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};

export default AuthContext;