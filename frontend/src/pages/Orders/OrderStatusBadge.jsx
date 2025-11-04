import React from "react";

const OrderStatusBadge = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-800";
            case "Processing":
                return "bg-blue-100 text-blue-800";
            case "Confirmed":
                return "bg-indigo-100 text-indigo-800";
            case "Out for Delivery":
                return "bg-purple-100 text-purple-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    return (
        <span className={`${getStatusColor()} px-3 py-1 rounded-full text-sm font-medium`}>
            {status}
        </span>
    );
};

export default OrderStatusBadge;
