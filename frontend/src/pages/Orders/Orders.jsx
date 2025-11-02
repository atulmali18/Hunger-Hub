import React, { useEffect, useState } from 'react';
import { orderApi } from '../../utils/api';
import { format } from 'date-fns';

const OrderStatusBadge = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <span className={`${getStatusColor()} px-3 py-1 rounded-full text-sm font-medium`}>
            {status}
        </span>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await orderApi.getUserOrders();
                setOrders(data.orders);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p className="text-gray-600">No orders found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold">Order #{order._id.slice(-6)}</h3>
                                    <p className="text-sm text-gray-500">
                                        {format(new Date(order.createdAt), 'MMM dd, yyyy - HH:mm')}
                                    </p>
                                </div>
                                <OrderStatusBadge status={order.status} />
                            </div>

                            <div className="border-t pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-600">Delivery Address</h4>
                                        <p className="text-sm mt-1">
                                            {order.deliveryAddress.street}, {order.deliveryAddress.city}
                                            <br />
                                            {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-600">Payment</h4>
                                        <p className="text-sm mt-1">
                                            Method: {order.paymentMethod}
                                            <br />
                                            Status: {order.paymentStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Items</h4>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t mt-4 pt-4">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total Amount</span>
                                        <span>₹{order.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;