import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        // 🛒 Store each item as { foodId, quantity }
        cartData: {
            type: [
                {
                    foodId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "food",
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        default: 1,
                        min: 1,
                    },
                },
            ],
            default: [],
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // auto adds createdAt & updatedAt
        minimize: false,  // ensures empty objects are saved
    }
);

// ✅ Prevent model overwrite on hot reload (important for dev)
const userModel =
    mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
