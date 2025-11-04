import axios from "axios";

// -------------------- Axios Instance --------------------
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach token if exists
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// -------------------- Order API --------------------
export const orderApi = {
    createRazorpayOrder: (orderData) =>
        axiosInstance.post("/orders/create-razorpay-order", orderData),

    verifyRazorpayPayment: (paymentData) =>
        axiosInstance.post("/orders/verify-razorpay-payment", paymentData),

    createOrder: (orderData) =>
        axiosInstance.post("/orders", orderData),

    getUserOrders: (params) =>
        axiosInstance.get("/orders", { params }),

    getOrderById: (orderId) =>
        axiosInstance.get(`/orders/${orderId}`),

    cancelOrder: (orderId) =>
        axiosInstance.post(`/orders/${orderId}/cancel`),
};

export default axiosInstance;
