import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch all foods
    const fetchFoods = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/api/food/list");
            if (response.data.success) {
                setFoods(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching foods:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add food
    const addFood = async (formData) => {
        try {
            const res = await axiosInstance.post("/api/food/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.success) {
                fetchFoods();
            }
        } catch (error) {
            console.error("Error adding food:", error);
        }
    };

    // ✅ Delete food
    const deleteFood = async (id) => {
        try {
            const res = await axiosInstance.delete(`/api/food/remove/${id}`);
            if (res.data.success) {
                setFoods((prev) => prev.filter((item) => item._id !== id));
            }
        } catch (error) {
            console.error("Error deleting food:", error);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <FoodContext.Provider value={{ foods, loading, fetchFoods, addFood, deleteFood }}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFood = () => useContext(FoodContext);
