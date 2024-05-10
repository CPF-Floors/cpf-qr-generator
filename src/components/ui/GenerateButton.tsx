import Image from "next/image";
import Link from "next/link";

function GenerateButton() {
    return ( 
        <button className="generate-button fixed bottom-20 right-0">
        <Link href='/generate-new'>
            <Image height={20} width={20} alt="plus" src='/plus-solid.svg'></Image>
        </Link>
        </button>
     );
}

export default GenerateButton;