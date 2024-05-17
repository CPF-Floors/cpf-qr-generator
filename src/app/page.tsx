"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface QR {
  _id: string;
  qrCreatedAt: string;
  qrName: string;
  qrImage: string;
  qrUrl: string;
}

function Dashboard() {
  const [qrs, setQrs] = useState<QR[]>([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchQrs = async () => {
      const response = await fetch("/api/qr");
      const data = await response.json();
      setQrs(data);
    };

    fetchQrs();
  }, []);

  const deleteQr = async (id: string) => {
    await fetch(`/api/qr`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "QR-ID": id,
      },
    });

    setQrs(qrs.filter((qr) => qr._id !== id));
  };

  return (
    <>
      <div className="dashboard-container flex justify-center">
        <h1 className="text-center font-bold underline underline-offset-2 text-lg">
          Dashboard - Total QR codes: ({qrs.length})
        </h1>
        {qrs
          .slice()
          .reverse()
          .map((qr, index) => (
            <div key={index}>
              <div className="dashboard-item-container flex justify-between">
                <div className="qr-info mx-5 image-qr flex">
                  <Image
                    className="qr-image-dashboard mx-5"
                    key={index}
                    height={200}
                    width={200}
                    alt={qr.qrName}
                    src={qr.qrImage}
                  ></Image>
                  <div className="text-qr overflow-hidden">
                    <h2 className="font-bold my-2 text-lg">{qr.qrName}</h2>
                    <p className="mb-5 truncate qr-url">{qr.qrUrl}</p>
                    <p>{qr.qrCreatedAt}</p>
                  </div>
                </div>

                <div className="flex qr-action-buttons items-end">
                  <a
                    href={qr.qrImage}
                    download={qr.qrName + ".png"}
                  >
                    <button className="download-qr-button W-100 p-2 rounded text-white">
                      Download
                    </button>
                  </a>

                  <button
                    className="delete-qr-button"
                    onClick={() => deleteQr(qr._id)}
                  >
                    Delete QR
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Dashboard;
