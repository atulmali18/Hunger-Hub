import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // -------------------- Load user from localStorage --------------------
    useEffect(() => {
        const token = localStorage.getItem("token");
        const rawUser = localStorage.getItem("user");

        if (token) {
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            try {
                const parsedUser = rawUser ? JSON.parse(rawUser) : null;
                setUser(parsedUser);
            } catch {
                setUser(null);
            }
        }

        setLoading(false);
    }, []);

    // -------------------- Helper Functions --------------------
    const saveAuthData = (userData, token) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    };

    const clearAuthData = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        delete axiosInstance.defaults.headers.Authorization;
    };

    // -------------------- API Actions --------------------
    const signup = async (formData) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post("/user/signup", formData);

            if (!data?.token || !data?.user) throw new Error("Invalid signup response");

            saveAuthData(data.user, data.token);
            toast.success("Signup successful");
            return { ok: true, data };
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Signup failed");
            return { ok: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    const login = async (formData) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post("/user/login", formData);

            if (!data?.token || !data?.user) throw new Error("Invalid login response");

            saveAuthData(data.user, data.token);
            toast.success("Logged in successfully");
            return { ok: true, data };
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Login failed");
            return { ok: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    const getProfile = async () => {
        try {
            const { data } = await axiosInstance.get("/user/profile");
            return data;
        } catch (err) {
            toast.error("Failed to fetch profile");
            throw err;
        }
    };

    const logout = () => {
        clearAuthData();
        toast.success("Logged out");
    };

    // -------------------- Derived State --------------------
    const isAuthenticated = !!user;
    const isAdmin = user?.isAdmin === true;

    // -------------------- Context Value --------------------
    return (
        <AuthContext.Provider
            value={{
                user,
                isAdmin,
                isAuthenticated,
                loading,
                signup,
                login,
                getProfile,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// -------------------- Custom Hook --------------------
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};

export default AuthContext;
