"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { Key } from "lucide-react";
import { useState } from "react";

export default function App() {
  interface IFormInput {
    name: string;
    url: string;
  }

  const [qr, setQr] = useState([])

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();
  
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {


    const dataR = await fetch("/api/qr", {
      body: JSON.stringify(data),
      method: "POST"
    });

    
    
    return(
      dataR
    )


    reset()
  };

  return (
    <>
      <div className="flex flex-col w-full justify-between items-center">

      <form
          className="flex flex-col w-10/12 text-center justify-center w-100"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <p className="text-start mb-5 text-red-600">
              URL is required *
            </p>
          )}

          <button className="p-2 mb-3 rounded text-white" type="submit">
            Generate
          </button>

        </form>
      </div>
    </>
  );
}
