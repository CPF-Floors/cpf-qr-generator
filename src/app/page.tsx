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
      <div style={{ marginTop: "120px" }} className="dashboard-container">
        <h1 className="text-center font-bold underline underline-offset-2">
          Dashboard - Total QR codes: ({qrs.length})
        </h1>
        {qrs
          .slice()
          .reverse()
          .map((qr, index) => (
            <div key={index}>
              <div className="dashboard-item-container flex justify-between">
                <div className="mx-5 image-qr flex">
                  <Image
                    key={index}
                    height={200}
                    width={200}
                    alt={qr.qrName}
                    src={qr.qrImage}
                  ></Image>
                  <div className="text-qr">
                    <h2 className="font-bold my-2">{qr.qrName}</h2>
                    <p className="mb-5 truncate ...">{qr.qrUrl}</p>
                    <p>{qr.qrCreatedAt}</p>
                  </div>
                </div>

                <div className="flex items-end">
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
