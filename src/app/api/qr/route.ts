import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import qrModel from "@/models/qr.model";
import { connectDB } from "../../../config/db";
import qr from "qrcode"

connectDB()

export async function GET(req: NextRequest){
    const ID = req.headers.get("QR-ID");

    if(ID) {

        try {
            const QRDetails = await qrModel.findById(ID)
            return NextResponse.json(QRDetails, {status: 200})
        } catch (error) {
            return NextResponse.json({message: "Bad Request"}, {status: 500})
        }
    }

    try {
        const allQR = await qrModel.find({})
        return NextResponse.json(allQR, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Bad Request"}, {status: 500})
    }
}


export async function POST(req: NextRequest){
    const body = await req.json();

    const { name, url } = body;

    try {
        const QR = await qr.toDataURL(url)

        const newQR = new qrModel({
            qrName: name,
            qrImage: QR,
            qrUrl: url
        })

        const savedQR = await newQR.save()

        return NextResponse.json([savedQR], {status: 200});
    } catch (error) {
        return NextResponse.json({message: "No QR is being generated", error }, {status: 500})
    }
}

export async function DELETE(req: NextRequest){
    const ID = req.headers.get("QR-ID");
    try {
        const deleteQRCode = await qrModel.findByIdAndDelete(ID)
        return NextResponse.json({ message: "QR ha sido eliminado", deletedQR: deleteQRCode }, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Bad Server Request"}, {status: 500});
    }
}
