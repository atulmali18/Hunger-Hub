import React from "react";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderCard = ({ order, canCancel, onCancelClick, actionLoading }) => {
    const address = order.deliveryAddress ?? {};

    const safeFormat = (date, fmt = "MMM dd, yyyy - HH:mm") => {
        try {
            return date ? new Date(date).toLocaleString() : "-";
        } catch {
            return "-";
        }
    };

    return (
        <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4 gap-4">
                <div>
                    <h3 className="font-semibold">Order #{String(order._id).slice(-6)}</h3>
                    <p className="text-sm text-gray-500">{safeFormat(order.createdAt)}</p>
                    {order.estimatedDeliveryTime && (
                        <p className="text-xs text-gray-500 mt-1">
                            ETA: {safeFormat(order.estimatedDeliveryTime)}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status ?? "Pending"} />
                    {canCancel && (
                        <button
                            onClick={() => onCancelClick(order._id)}
                            disabled={actionLoading === order._id}
                            className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 disabled:opacity-60"
                        >
                            {actionLoading === order._id ? "Cancelling..." : "Cancel"}
                        </button>
                    )}
                </div>
            </div>

            <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-600">Delivery Address</h4>
                        <p className="text-sm mt-1">
                            {address.street ? `${address.street}, ` : ""}
                            {address.city ? `${address.city}` : ""}
                            {address.city && address.state ? <br /> : ""}
                            {address.state ? `${address.state} - ${address.pincode || ""}` : address.pincode || ""}
                            {!address.street && !address.city && !address.state && !address.pincode && <span>—</span>}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-600">Payment</h4>
                        <p className="text-sm mt-1">
                            Method: {order.paymentMethod ?? "—"}
                            <br />
                            Status: {order.paymentStatus ?? "—"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Items</h4>
                <div className="space-y-2">
                    {(order.items || []).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{(item.price ?? item.unitPrice ?? 0) * (item.quantity ?? 1)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{order.totalAmount ?? order.total ?? 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
