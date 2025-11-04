import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // -------------------- Fetch all foods --------------------
    const fetchFoods = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/food/list");
            if (res.data.success) setFoods(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch foods");
        } finally {
            setLoading(false);
        }
    };

    // -------------------- Add food --------------------
    const addFood = async (formData) => {
        try {
            const res = await axiosInstance.post("/food/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.success) {
                setFoods((prev) => [...prev, res.data.data]); // add new food immediately
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to add food");
        }
    };

    // -------------------- Delete food --------------------
    const deleteFood = async (id) => {
        try {
            const res = await axiosInstance.delete(`/food/remove/${id}`);
            if (res.data.success) {
                setFoods((prev) => prev.filter((food) => food._id !== id));
                toast.success("Food deleted successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete food");
        }
    };

    // -------------------- Update food --------------------
    const updateFood = async (id, formData) => {
        try {
            const res = await axiosInstance.put(`/food/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.success) {
                setFoods((prev) =>
                    prev.map((food) => (food._id === id ? res.data.data : food))
                );
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update food");
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <FoodContext.Provider
            value={{ foods, loading, fetchFoods, addFood, deleteFood, updateFood }}
        >
            {children}
        </FoodContext.Provider>
    );
};
