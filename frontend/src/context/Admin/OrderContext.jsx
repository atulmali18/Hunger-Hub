import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        totalDocs: 0,
        totalPages: 1,
        currentPage: 1,
    });

    const fetchOrders = async (params = {}) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("/orders/all", { params });
            setOrders(data?.orders || []); // safe fallback
            setPagination({
                totalDocs: data?.pagination?.totalDocs || (data?.orders?.length || 0),
                totalPages: data?.pagination?.totalPages || 1,
                currentPage: data?.pagination?.currentPage || 1,
            });
        } catch (error) {
            console.error("Fetch orders error:", error);
            toast.error("Failed to fetch orders");
            setOrders([]);
            setPagination({ totalDocs: 0, totalPages: 1, currentPage: 1 });
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const { data } = await axiosInstance.patch(`/orders/${orderId}/status`, { status });
            setOrders((prev) =>
                prev.map((order) => (order._id === orderId ? data?.order || order : order))
            );
            toast.success("Order status updated");
            return true;
        } catch (error) {
            console.error("Update order status error:", error);
            toast.error(error.response?.data?.message || "Failed to update order status");
            return false;
        }
    };

    return (
        <OrderContext.Provider value={{ orders, loading, pagination, fetchOrders, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
};
