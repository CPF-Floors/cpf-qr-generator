import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../config/db";


export async function GET(req: NextRequest){
    try {
        const allQR = await qrModel.find({})
        res.status(200).json(allQR)
    } catch (error) {
        res.status(500).json("Bad Rquest")
    }
    const { id } = req.params


    try {
        const QRDetails = await qrModel.findById(id)
        res.status(200).json(QRDetails)
    } catch (error) {
        res.status(500).json("Bad Rquest")
    }
}


export async function POST(req: NextRequest){
    const { name, url } = req.body
    try {
        qr.toDataURL(url, async (err, qrCodeUrl) => {
            if (err) {
                res.status(400).send("Bad Request")
            } else {
                const newQR = new qrModel({
                    qrName: name,
                    qrImage: qrCodeUrl,
                    qrUrl: url
                })
                const savedQR = await newQR.save()
                res.status(200).json(savedQR)
            }
        })
    } catch (error) {
        res.status(500).json("No QR is being generated", error)
    }
}

export async function DELETE(req: NextRequest){
    const { id } = req.params
    try {
        const deleteQRCode = await qrModel.findByIdAndDelete(id)
        res.status(204).json({ message: "QR ha sido eliminado", deletedQR: deleteQRCode })
    } catch (error) {
        res.status(500).json("Bad Server Request")
    }
}
