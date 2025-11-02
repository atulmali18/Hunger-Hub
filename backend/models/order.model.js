import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "User ID is required"],
        },
        items: [
            {
                foodId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "food",
                    required: true,
                },
                name: { type: String, required: true },
                price: { type: Number, required: true, min: 0 },
                quantity: { type: Number, required: true, min: 1 },
                specialInstructions: { type: String },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Processing", "Out for Delivery", "Delivered", "Cancelled"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            enum: ["Credit Card", "PayPal", "Cash on Delivery", "UPI", "Razorpay"],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed", "Refunded"],
            default: "Pending",
        },
        // Razorpay specific fields
        razorpayOrderId: { type: String, sparse: true },
        razorpayPaymentId: { type: String, sparse: true },
        razorpaySignature: { type: String, sparse: true },

        deliveryAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        phoneNumber: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Please enter a valid phone number"],
        },
        estimatedDeliveryTime: { type: Date },
        deliveryNotes: { type: String },
    },
    {
        timestamps: true,
    }
);

// Add index for better query performance
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

// ✅ Prevent model overwrite in dev
const orderModel =
    mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
