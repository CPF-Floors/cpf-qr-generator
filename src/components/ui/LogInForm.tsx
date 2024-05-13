"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";

export default function App() {
  interface IFormInput {
    email: string;
    password: string;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center">
        <Image
            className="mb-10"
          height={200}
          width={200}
          alt="logo"
          src="/Nuevo_Logo_CPF_Floors2-04-1.png"
        ></Image>

        <form
          className="flex flex-col text-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="rounded p-2 mb-5"
            placeholder="Enter your e-mail"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Please enter a valid e-mail",
              },
            })}
          />
          {errors.email && (
            <p className="text-start mb-5 text-red-600">
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            className="rounded p-2 mb-5"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="text-start mb-5 text-red-600">
              Password is required *
            </p>
          )}

          <button className="p-2 mb-3 rounded text-white" type="submit">
            Log In
          </button>

          <button className="p-2 mb-3 rounded text-white text-center" type="submit">
          <Image className="absolute mx-4" height={20} width={20} alt="google" src="/google.svg" ></Image>
            <Link href="#">
              Log in with Google
            </Link>
          </button>

          <p>
            Not registered yet? Click to{" "}
            <Link className="font-semibold" href="/sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
