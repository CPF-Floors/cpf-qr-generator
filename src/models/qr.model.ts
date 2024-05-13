import mongoose, { Document, Schema, Model } from "mongoose";

interface QR extends Document {
    qrName: string;
    qrImage: string;
    qrUrl: string;
}

const qrSchema: Schema<QR> = new mongoose.Schema({
    qrName: {
        type: String,
        required: true
    },
    qrImage: {
        type: String,
        required: true
    },
    qrUrl: {
        type: String,
        required: true
    },
}, { timestamps: true });

const qrModel: Model<QR> = mongoose.models?.QR || mongoose.model<QR>("QR", qrSchema);

export default qrModel;