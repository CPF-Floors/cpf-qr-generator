import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/qrcode");
        console.log(">>> DB is Connected <<<");
    } catch (error) {
        console.log(error)
    }
}