import foodModel from "../models/food.model.js";
import fs from "fs";

//  Add new food item
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        // Check for image upload
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

//  Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error in listFood:", error);
        res.status(500).json({ success: false, message: "Failed to fetch food list" });
    }
};

//  Remove a food item by ID
const removeFood = async (req, res) => {
    try {
        const { id } = req.params; // <-- get ID from URL param

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        const imagePath = `uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await foodModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error("Error in removeFood:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export { addFood, listFood, removeFood };
