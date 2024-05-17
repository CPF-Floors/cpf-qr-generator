"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function App() {
  interface IFormInput {
    name: string;
    url: string;
  }

  const [qr, setQr] = useState(null);
  const [qrName, setQrName] = useState(""); 


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await fetch("/api/qr", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const dataR = await response.json();
    setQr(dataR[0].qrImage); 
    console.log(dataR)
    setQrName(data.name);

    reset();
  };

  return (
    <>
      <div className="dashboard-container flex flex-col w-full justify-between items-center">

        {qr && (
          <div className="qr-display-container my-20 w-100 flex flex-col items-center justify-center">
            <Image src={qr} alt="QR Code" width={300} height={300} />
            <a href={qr} download={`${qrName}.png`}>
              <button className="download-qr-button-form W-100 p-2 mb-3 rounded text-white">
                Download QR
              </button>
            </a>
            <Link href="/">Go to the Dashboard</Link>
          </div>
        )}

        <form
          className="flex flex-col w-10/12 text-center justify-center w-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="font-semibold text-center mb-5">Please fill the fields to generate a new QR code</p>
          <input
            className="rounded p-2 mb-5"
            placeholder="New QR Name"
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && (
            <p className="text-start mb-5 text-red-600">
              {errors.name.message}
            </p>
          )}

          <input
            className="rounded p-2 mb-5"
            placeholder="Insert the URL"
            {...register("url", { required: true })}
          />
          {errors.url?.type === "required" && (
            <p className="text-start mb-5 text-red-600">URL is required *</p>
          )}

          <button className="generate-button-form p-2 mb-3 rounded text-white" type="submit">
            Generate
          </button>
        </form>
        <Link className="underline" href="/">Go back to the Dashboard</Link>
      </div>
    </>
  );
}
