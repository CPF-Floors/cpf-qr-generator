import Footer from "@/components/ui/Footer";
import LogInForm from "../components/ui/LogInForm";
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
