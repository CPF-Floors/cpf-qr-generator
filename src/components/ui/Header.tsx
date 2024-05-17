"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex justify-center items-center">
        <Image
        className="header-logo"
          alt="logo"
          width={300}
          height={300}
          src="/Group 8252.svg"
        ></Image>
        <Image
          onClick={() => setOpen(!open)}
          className="absolute right-0 m-10 cursor-pointer"
          src="/bars-solid.svg"
          height={30}
          width={30}
          alt="bar"
        ></Image>
      </header>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
          initial={{x:-500}}
          animate={{x:0}}
          exit={{x:-500}}
          transition={{duration:0.5}}
          className="sidebar absolute top-0">
            <div>
              <Image onClick={() => setOpen(false)} className="absolute right-0 m-5 cursor-pointer" height={30} width={30} alt="close" src="/xmark-solid.svg"></Image>

            </div>
            <div className="sidebar-logo flex justify-center p-10">
              <Image src="/Group 8245.svg" height={180}width={180} alt="logo"></Image>
            </div>

          </motion.div>
        )}
        </AnimatePresence>
    </>
  );
}

export default Header;
