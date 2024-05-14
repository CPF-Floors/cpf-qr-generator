"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between w-100">
      <Link href="/dashboard">
        <Image
          className="cursor-pointer"
          height={60}
          width={60}
          alt="logo"
          src="/cpf-floors-cuadrado-logo-02-01.png"
        ></Image>
      </Link>

      <Image
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
        height={30}
        width={30}
        alt="bar"
        src="/bars-solid.svg"
      ></Image>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="mobile-nav absolute left-0 right-0 w-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 300 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/generate-new">Generate QR</Link>
            <Link href="#">Profile</Link>
            <div className="flex">
              <Link className="mx-" href="#">Logout</Link><Image className="mx-2" height={20} width={20} alt="out" src="/arrow-right-from-bracket-solid.svg"></Image>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
