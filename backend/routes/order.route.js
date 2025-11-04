import express from "express";
import {
    createOrder,
    getUserOrders,
    updateOrderStatus,
    createRazorpayOrder,
    verifyRazorpayPayment,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import orderModel from "../models/order.model.js";

const orderRouter = express.Router();

// Payment endpoints (Razorpay)
orderRouter.post("/create-razorpay-order", authMiddleware, createRazorpayOrder);
orderRouter.post("/verify-razorpay-payment", authMiddleware, verifyRazorpayPayment);

// Customer routes
orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, getUserOrders);
orderRouter.get("/active", authMiddleware, getUserOrders);

// Admin routes
orderRouter.patch("/:orderId/status",
    authMiddleware, isAdmin,
    updateOrderStatus);
orderRouter.get("/all",
    authMiddleware, isAdmin,
    getUserOrders);

// Route to cancel order (both admin and user can access)
orderRouter.post("/:orderId/cancel", authMiddleware, async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Only allow cancellation of pending or confirmed orders
        if (!['Pending', 'Confirmed'].includes(order.status)) {
            return res.status(400).json({
                message: "Cannot cancel order in current status"
            });
        }

        order.status = 'Cancelled';
        await order.save();

        res.json({ message: "Order cancelled successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to cancel order" });
    }
});

export default orderRouter;
