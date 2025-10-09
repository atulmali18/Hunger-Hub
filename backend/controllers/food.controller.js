import foodModel from "../models/food.model.js";

export const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required. Please upload a file under the 'image' field.",
            });
        }

        const image = req.file.filename;

        const newFood = new foodModel({
            name,
            description,
            price,
            image,
            category,
        });

        await newFood.save();

        res.status(201).json({
            success: true,
            message: "Food added successfully!",
            data: newFood,
        });
    } catch (error) {
        console.error("Error in addFood:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
