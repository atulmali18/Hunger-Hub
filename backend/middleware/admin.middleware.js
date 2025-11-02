import userModel from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
    try {
        // Get user from database using the userId set by authMiddleware
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user is an admin
        if (!user.isAdmin) {
            return res.status(403).json({
                message: "Access denied. Admin privileges required."
            });
        }

        // If user is admin, proceed to next middleware
        next();
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};