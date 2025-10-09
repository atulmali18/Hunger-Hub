import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://atulmali18:Xr7wLgfQRROmkCvt@cluster0.qb0wtwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
        });
        console.log("monogDB connected successfully");
    } catch (error) {
        console.log(error);
    }
};
