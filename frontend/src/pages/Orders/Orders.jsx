import React, { useEffect, useState } from "react";
import { orderApi } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import OrderCard from "./OrderCard";
import CancelModal from "./CancelModal";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // Loading for cancel/status actions
    const [cancelOrderId, setCancelOrderId] = useState(null); // Stores orderId for cancel modal
    const [modalOpen, setModalOpen] = useState(false); // Cancel modal visibility

    // -------------------- Fetch Orders on Mount --------------------
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await orderApi.getUserOrders();
                setOrders(data?.orders ?? data ?? []);
            } catch (err) {
                toast.error("Failed to load orders");
            }
        };

        // Fetch initially
        fetchOrders();

        // Poll every 5 seconds
        const interval = setInterval(fetchOrders, 5000);

        return () => clearInterval(interval); // clean up on unmount
    }, []);

    // -------------------- Cancel Order Flow --------------------
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

            // Update the order status in state directly (instant update)
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === cancelOrderId ? { ...o, status: "Cancelled" } : o
                )
            );
        } catch {
            toast.error("Failed to cancel order");
        } finally {
            setActionLoading(null);
            setCancelOrderId(null);
            setModalOpen(false);
        }
    };

    // -------------------- Admin Status Update --------------------
    const handleAdminStatusUpdate = async (orderId, newStatus) => {
        setActionLoading(orderId);
        try {
            await orderApi.updateOrderStatus(orderId, { status: newStatus });
            toast.success("Status updated");

            // Update order status directly in state (instant UI update)
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === orderId ? { ...o, status: newStatus } : o
                )
            );
        } catch {
            toast.error("Failed to update status");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    // -------------------- Render Orders --------------------
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
                            onStatusUpdate={handleAdminStatusUpdate} // Admin status update function
                        />
                    ))}
                </div>
            )}

            {/* Cancel Modal */}
            <CancelModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmCancel}
            />
        </div>
    );
};

export default Orders;
