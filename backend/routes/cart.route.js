import express from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; // middleware to get req.userId

const cartRouter = express.Router();

// 🛒 Get current user's cart
cartRouter.get("/", authMiddleware, getCart);

// 🛒 Add item to cart
cartRouter.post("/add", authMiddleware, addToCart);

// 🛒 Update quantity of an item
cartRouter.patch("/update", authMiddleware, updateCartItem);

// 🛒 Remove item from cart
cartRouter.delete("/:foodId", authMiddleware, removeFromCart);

export default cartRouter;
