"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
      <header className="fixed flex justify-center items-center">
        <Image alt="logo" width={300} height={300} src="/Group 8252.svg">

        </Image>
      </header>
  );
}

export default Header;
