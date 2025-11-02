import userModel from "../models/user.model.js";

// ------------------- GET USER CART -------------------
export const getCart = async (req, res) => {
    try {
        const user = await userModel
            .findById(req.userId)
            .populate("cartData.foodId"); // populate food details

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ cart: user.cartData });
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ------------------- ADD ITEM TO CART -------------------
export const addToCart = async (req, res) => {
    try {
        const { foodId, quantity } = req.body;

        const user = await userModel.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingItem = user.cartData.find(
            (item) => item.foodId.toString() === foodId
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            user.cartData.push({ foodId, quantity: quantity || 1 });
        }

        await user.save();
        res.status(200).json({ message: "Item added to cart", cart: user.cartData });
    } catch (error) {
        console.error("Add To Cart Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ------------------- UPDATE ITEM QUANTITY -------------------
export const updateCartItem = async (req, res) => {
    try {
        const { foodId, quantity } = req.body;

        if (quantity < 1)
            return res.status(400).json({ message: "Quantity must be at least 1" });

        const user = await userModel.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const item = user.cartData.find((i) => i.foodId.toString() === foodId);
        if (!item) return res.status(404).json({ message: "Item not found in cart" });

        item.quantity = quantity;
        await user.save();

        res.status(200).json({ message: "Cart updated", cart: user.cartData });
    } catch (error) {
        console.error("Update Cart Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ------------------- REMOVE ITEM FROM CART -------------------
export const removeFromCart = async (req, res) => {
    try {
        const { foodId } = req.params;

        const user = await userModel.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.cartData = user.cartData.filter(
            (item) => item.foodId.toString() !== foodId
        );

        await user.save();
        res.status(200).json({ message: "Item removed from cart", cart: user.cartData });
    } catch (error) {
        console.error("Remove Cart Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
