import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/food.route.js';
import userRouter from './routes/user.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express()
const PORT = 4000



//middleware
app.use(express.json())

app.use(cors({
    origin: [
        "https://hunger-hub-app.vercel.app",
        "http://localhost:5173"],
    credentials: true,
}));
app.use("/images", express.static('uploads'))

//DB Connect
connectDB()

// API End points
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)


app.get('/', (req, res) => {
    res.send("Server Running");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
