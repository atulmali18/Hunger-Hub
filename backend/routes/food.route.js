import express from 'express';
import { addFood, listFood, removeFood, updateFood } from '../controllers/food.controller.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

foodRouter.post('/add', upload.single("image"), addFood);
foodRouter.get('/list', listFood)
foodRouter.delete('/remove/:id', removeFood)
foodRouter.put("/update/:id", upload.single("image"), updateFood);

export default foodRouter;
