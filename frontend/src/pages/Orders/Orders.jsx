import React, { useEffect, useState } from "react";
import { orderApi } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import OrderCard from "./OrderCard";
import CancelModal from "./CancelModal";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await orderApi.getUserOrders();
                setOrders(data?.orders ?? data ?? []);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleCancelClick = (orderId) => {
        setCancelOrderId(orderId);
        setModalOpen(true);
    };

    const handleConfirmCancel = async (reason) => {
        if (!cancelOrderId) return;

        try {
            setActionLoading(cancelOrderId);
            await orderApi.cancelOrder(cancelOrderId, { reason });
            toast.success("Order cancelled");

            setOrders((prev) =>
                prev.map((o) => (o._id === cancelOrderId ? { ...o, status: "Cancelled" } : o))
            );
        } catch (err) {
            console.error(err);
            toast.error("Failed to cancel order");
        } finally {
            setActionLoading(null);
            setCancelOrderId(null);
            setModalOpen(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No orders found</div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            canCancel={order.status === "Pending" || order.status === "Confirmed"}
                            onCancelClick={handleCancelClick}
                            actionLoading={actionLoading}
                        />
                    ))}
                </div>
            )}

            <CancelModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmCancel}
            />
        </div>
    );
};

export default Orders;
