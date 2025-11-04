import React, { createContext, useContext, useState } from 'react';
import { orderApi } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import toast from 'react-hot-toast';

const PlaceOrderContext = createContext();

export const PlaceOrderProvider = ({ children }) => {
    const navigate = useNavigate();
    const { cartItems } = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);

    const placeOrder = async (formData) => {
        try {
            setLoading(true);
            setOrderError(null);

            // Validate cart is not empty
            const items = Object.entries(cartItems)
                .filter(([_, qty]) => qty > 0)
                .map(([foodId, quantity]) => ({
                    foodId,
                    quantity,
                }));

            if (items.length === 0) {
                throw new Error("Cart is empty");
            }

            const orderData = {
                items,
                deliveryAddress: {
                    street: formData.address,
                    city: formData.city,
                    state: formData.state || "Maharashtra", // Default value
                    pincode: formData.zipCode,
                },
                phoneNumber: formData.phone,
                deliveryNotes: formData.notes,
                paymentMethod: formData.paymentMethod === "card" ? "Razorpay" : "Cash on Delivery",
            };

            if (formData.paymentMethod === "card") {
                const { data } = await orderApi.createRazorpayOrder(orderData);

                const options = {
                    key: data.razorpayKeyId,
                    amount: data.amount,
                    currency: data.currency,
                    name: "Hunger Hub",
                    description: "Food Order Payment",
                    order_id: data.razorpayOrderId,
                    prefill: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        contact: formData.phone,
                    },
                    handler: async (response) => {
                        try {
                            await orderApi.verifyRazorpayPayment({
                                orderId: data.orderId,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            });
                            toast.success("Payment successful!");
                            navigate("/verify?status=success&type=payment");
                        } catch (error) {
                            setOrderError("Payment verification failed");
                            toast.error("Payment verification failed");
                            navigate("/verify?status=failed&type=payment");
                        }
                    },
                    modal: {
                        ondismiss: function () {
                            navigate("/verify?status=failed&type=payment");
                        }
                    }
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                await orderApi.createOrder(orderData);
                toast.success("Order placed successfully!");
                navigate("/verify?status=success&type=order");
            }
        } catch (error) {
            console.error("Order error:", error);
            setOrderError(error.response?.data?.message || error.message || "Failed to place order");
            toast.error(error.response?.data?.message || error.message || "Failed to place order");
            navigate("/verify?status=failed&type=order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PlaceOrderContext.Provider value={{
            placeOrder,
            loading,
            orderError,
        }}>
            {children}
        </PlaceOrderContext.Provider>
    );
};

export const usePlaceOrder = () => {
    const context = useContext(PlaceOrderContext);
    if (!context) {
        throw new Error("usePlaceOrder must be used within PlaceOrderProvider");
    }
    return context;
};