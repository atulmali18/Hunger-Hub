import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// ------------------- SIGNUP -------------------
export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid email format" });

        if (!validator.isStrongPassword(password))
            return res.status(400).json({
                message: "Password must include uppercase, lowercase, number & symbol",
            });

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
            token,
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ------------------- LOGIN -------------------
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid email" });

        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin  // <-- Add this line
            },
            token,
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ------------------- GET USER PROFILE -------------------
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select('-password');

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
