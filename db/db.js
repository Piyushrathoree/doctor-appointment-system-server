
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO db connected successfully");
    } catch (error) {
        console.log("MONGO db connection failed !!! ", error);
    }
};

export default connectDB;
