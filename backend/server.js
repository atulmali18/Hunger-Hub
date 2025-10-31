import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/food.route.js';

const app = express()
const PORT = 4000

//middleware
app.use(express.json())
app.use(cors())
app.use("/images", express.static('uploads'))

//DB Connect
connectDB()

// API End points
app.use('/api/food', foodRouter)


app.get('/', (req, res) => {
    res.send("Server Running");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})