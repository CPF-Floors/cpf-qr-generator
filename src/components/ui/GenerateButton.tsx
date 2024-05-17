import Image from "next/image";
import Link from "next/link";

function GenerateButton() {
  return (
    <div className="generate-button-container flex justify-center items-center p-5">
        <button className="w-10/12 p-5">Create New QR Code</button>
    </div>
  );
}

export default GenerateButton;
