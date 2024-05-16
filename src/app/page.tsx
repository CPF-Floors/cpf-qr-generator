"use server"
import Footer from "@/components/ui/Footer";
import LogInForm from "../components/ui/LogInForm";
import { Redirect } from "next";
import { redirect } from "next/dist/server/api-utils";


function App() {


  return (
    <>

      
      <div className="h-lvh w-100 flex justify-center items-center">
        <div className="border-form">
          <LogInForm />
        </div>
      </div>
      <>
        <Footer />
      </>
    </>
  );
}

export default App;
