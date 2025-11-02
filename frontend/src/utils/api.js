import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to headers automatically if exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Order related endpoints
export const orderApi = {
    createRazorpayOrder: (orderData) =>
        api.post("/orders/create-razorpay-order", orderData),

    verifyRazorpayPayment: (paymentData) =>
        api.post("/orders/verify-razorpay-payment", paymentData),

    createOrder: (orderData) =>
        api.post("/orders", orderData),

    getUserOrders: (params) =>
        api.get("/orders", { params }),

    getOrderById: (orderId) =>
        api.get(`/orders/${orderId}`),

    cancelOrder: (orderId) =>
        api.post(`/orders/${orderId}/cancel`),
};

export default api;
