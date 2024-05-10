import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
    qrName: {
        type: String,
        require: true
    },
    qrImage: {
        type: String,
        require: true
    },
    qrUrl: {
        type: String,
        require: true
    },
}, { timestamps: true })

export default mongoose.model("QR", qrSchema)