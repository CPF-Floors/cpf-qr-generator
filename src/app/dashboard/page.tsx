"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface QR {
  _id: string,
  qrCreatedAt: string,
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
    <div style={{ marginTop: "60px" }} className="dashboard-container">
      <h1 className="text-center font-bold underline underline-offset-2"
      >
        Dashboard - Total QR codes: ({qrs.length})
      </h1>
      {qrs
        .slice()
        .reverse()
        .map((qr, index) => (
          <div key={index}>
            <div className="dashboard-item-container flex items-tart">
              <div className="mx-5 image-qr">
                <Image
                  key={index}
                  height={200}
                  width={200}
                  alt={qr.qrName}
                  src={qr.qrImage}
                ></Image>
              </div>
              <div className="text-qr relative">
                <h2 className="font-bold my-5">{qr.qrName}</h2>
                <p className="mb-5">{qr.qrUrl}</p>
                <p>{qr.qrCreatedAt}</p>
                <a
                  className="z-0 absolute bottom-0 right-0 m-0 p-5"
                  href={qr.qrImage}
                  download={qr.qrName + ".png"}
                >
                  <button className="W-100 p-2 mb-3 rounded text-white">
                    Download QR
                  </button>
                </a>
                <button className="px-5 text-white p-2 rounded bg-red-600" onClick={() => deleteQr(qr._id)}>Delete QR</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
