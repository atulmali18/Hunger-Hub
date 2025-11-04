import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/order.model.js";
import foodModel from "../models/food.model.js";
import userModel from "../models/user.model.js";

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a normal order (non-Razorpay or already-verified payment)
export const createOrder = async (req, res) => {
    try {
        const { items, deliveryAddress, paymentMethod = "Cash on Delivery", deliveryNotes, paymentReference } = req.body;

        if (!items?.length) {
            return res.status(400).json({ message: "Order must contain at least one item" });
        }
        if (!deliveryAddress?.street || !deliveryAddress?.city || !deliveryAddress?.pincode) {
            return res.status(400).json({ message: "Complete delivery address is required" });
        }

        // validate items & calculate total
        let totalAmount = 0;
        const detailedItems = await Promise.all(
            items.map(async (it) => {
                const food = await foodModel.findById(it.foodId);
                if (!food) throw new Error(`Food not found: ${it.foodId}`);
                if (food.isAvailable === false) throw new Error(`${food.name} is currently unavailable`);
                totalAmount += food.price * (it.quantity || 1);
                return {
                    foodId: food._id,
                    name: food.name,
                    price: food.price,
                    quantity: it.quantity || 1,
                    specialInstructions: it.specialInstructions || "",
                };
            })
        );

        // estimate delivery time (example: now + 1.5 hours)
        const estimatedDeliveryTime = new Date(Date.now() + 90 * 60 * 1000);

        const paymentStatus = paymentMethod === "Razorpay" ? "Pending" : (paymentMethod === "Cash on Delivery" ? "Pending" : "Completed");

        const order = await orderModel.create({
            userId: req.userId,
            items: detailedItems,
            totalAmount,
            deliveryAddress,
            paymentMethod,
            paymentStatus,
            deliveryNotes,
            estimatedDeliveryTime,
            // store payment reference if provided (e.g., stripe id / bank ref)
            razorpayPaymentId: paymentMethod === "Razorpay" && paymentReference ? paymentReference : undefined,
        });

        await order.populate('userId', 'name email');

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.error("createOrder error:", error);
        res.status(error.name === "ValidationError" ? 400 : 500).json({ message: error.message || "Failed to create order" });
    }
};

// Create Razorpay order and preliminary DB order
export const createRazorpayOrder = async (req, res) => {
    try {
        const { items, deliveryAddress, deliveryNotes, phoneNumber } = req.body;

        // basic request validation
        if (!items?.length) {
            return res.status(400).json({ message: "Order must contain items" });
        }
        if (!deliveryAddress?.street || !deliveryAddress?.city || !deliveryAddress?.pincode) {
            return res.status(400).json({ message: "Complete delivery address required" });
        }
        if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
            return res.status(400).json({ message: "Valid phoneNumber (10 digits) is required" });
        }

        // collect unique foodIds and fetch at once
        const uniqueIds = [...new Set(items.map(i => i.foodId))];
        const foods = await foodModel.find({ _id: { $in: uniqueIds } });

        // find missing ids
        const foundIds = foods.map(f => f._id.toString());
        const missing = uniqueIds.filter(id => !foundIds.includes(id.toString()));
        if (missing.length) {
            return res.status(400).json({ message: "Some food items not found", missing });
        }

        // calculate total and build detailed items
        let totalAmount = 0;
        const detailedItems = items.map(it => {
            const food = foods.find(f => f._id.toString() === it.foodId.toString());
            if (!food) throw new Error(`Unexpected missing food: ${it.foodId}`); // should not happen
            if (food.isAvailable === false) throw new Error(`${food.name} is unavailable`);
            const qty = it.quantity || 1;
            totalAmount += food.price * qty;
            return {
                foodId: food._id,
                name: food.name,
                price: food.price,
                quantity: qty,
                specialInstructions: it.specialInstructions || "",
            };
        });

        // create DB order with Pending status (include phoneNumber)
        const dbOrder = await orderModel.create({
            userId: req.userId,
            items: detailedItems,
            totalAmount,
            deliveryAddress,
            phoneNumber,
            paymentMethod: "Razorpay",
            paymentStatus: "Pending",
            status: "Pending",
            deliveryNotes,
        });

        // create razorpay order (amount in paise)
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: `order_rcpt_${dbOrder._id}`,
            payment_capture: 1,
        });

        dbOrder.razorpayOrderId = razorpayOrder.id;
        await dbOrder.save();

        res.status(201).json({
            message: "Razorpay order created",
            razorpayOrderId: razorpayOrder.id,
            razorpayKeyId: process.env.RAZORPAY_KEY_ID,
            orderId: dbOrder._id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
        });
    } catch (error) {
        console.error("createRazorpayOrder error:", error);
        const status = error.message && (error.message.includes("unavailable") || error.message.includes("not found")) ? 400 : 500;
        res.status(status).json({ message: error.message || "Failed to create Razorpay order" });
    }
};

// Verify Razorpay payment signature and finalize order
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
            return res.status(400).json({ message: "Missing payment verification parameters" });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid signature. Payment verification failed" });
        }

        const order = await orderModel.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.razorpayOrderId !== razorpay_order_id) {
            return res.status(400).json({ message: "Order id mismatch" });
        }

        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        order.paymentStatus = "Completed";
        order.status = "Confirmed";
        await order.save();

        res.status(200).json({ message: "Payment verified and order confirmed", order });
    } catch (error) {
        console.error("verifyRazorpayPayment error:", error);
        res.status(500).json({ message: error.message || "Payment verification failed" });
    }
};

// Get orders (user gets own orders; admin can fetch all)
export const getUserOrders = async (req, res) => {
    try {
        const { status, limit = 10, page = 1 } = req.query;
        const requestingUser = await userModel.findById(req.userId);
        const isAdminUser = requestingUser?.isAdmin;

        const query = isAdminUser ? {} : { userId: req.userId };
        if (status) query.status = status;

        const parsedLimit = Math.max(1, parseInt(limit, 10) || 10);
        const parsedPage = Math.max(1, parseInt(page, 10) || 1);

        const orders = await orderModel
            .find(query)
            .sort({ createdAt: -1 })
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit)
            .populate("items.foodId", "name price image")
            .populate("userId", "name email");

        const total = await orderModel.countDocuments(query);

        res.status(200).json({
            orders,
            pagination: {
                total,
                pages: Math.ceil(total / parsedLimit),
                currentPage: parsedPage,
            },
        });
    } catch (error) {
        console.error("getUserOrders error:", error);
        res.status(500).json({ message: error.message || "Failed to fetch orders" });
    }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        let { status } = req.body;

        if (!status) return res.status(400).json({ message: "Missing status in request body" });

        status = String(status).trim();

        const order = await orderModel.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Ensure incoming status matches enum values
        const allowedStatuses = ["Pending", "Confirmed", "Processing", "Out for Delivery", "Delivered", "Cancelled"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status "${status}". Allowed: ${allowedStatuses.join(", ")}` });
        }

        // If already in requested status, return success (idempotent)
        if (order.status === status) {
            return res.status(200).json({ message: `Order already in status "${status}"`, order });
        }

        const validTransitions = {
            Pending: ["Confirmed", "Cancelled"],
            Confirmed: ["Processing", "Cancelled"],
            Processing: ["Out for Delivery", "Cancelled"],
            "Out for Delivery": ["Delivered", "Cancelled"],
            Delivered: [],
            Cancelled: [],
        };

        const fromStatus = order.status;
        const allowedNext = validTransitions[fromStatus] || [];

        if (!allowedNext.includes(status)) {
            return res.status(400).json({
                message: `Cannot transition from "${fromStatus}" to "${status}"`,
                allowedNext,
            });
        }

        // Apply status change
        order.status = status;

        // update estimated delivery for Out for Delivery
        if (status === "Out for Delivery") {
            order.estimatedDeliveryTime = new Date(Date.now() + 30 * 60 * 1000); // +30 minutes
        }

        // If order is confirmed and payment method not COD, consider payment completed (optional)
        if (status === "Confirmed" && order.paymentMethod !== "Cash on Delivery") {
            order.paymentStatus = "Completed";
        }

        await order.save();

        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        console.error("updateOrderStatus error:", error);
        res.status(500).json({ message: error.message || "Failed to update order status" });
    }
};
