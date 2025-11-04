import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        pages: 1,
        currentPage: 1
    });

    const fetchOrders = async (params = {}) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get('/orders/all', { params });
            console.log(data);

            setOrders(data.orders);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Fetch orders error:', error);
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const { data } = await axiosInstance.patch(`/orders/${orderId}/status`, { status });
            setOrders(prev => prev.map(order =>
                order._id === orderId ? data.order : order
            ));
            toast.success('Order status updated');
            return true;
        } catch (error) {
            console.error('Update order status error:', error);
            toast.error(error.response?.data?.message || 'Failed to update order status');
            return false;
        }
    };

    return (
        <OrderContext.Provider value={{
            orders,
            loading,
            pagination,
            fetchOrders,
            updateOrderStatus,
        }}>
            {children}
        </OrderContext.Provider>
    );
};