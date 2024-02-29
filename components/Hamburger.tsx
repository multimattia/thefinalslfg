"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function () {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        id="hamburger"
        className="cursor-pointer pr-5 sm:hidden"
        onClick={toggleMenu}
      >
        <span className="mb-1.5 block h-1 w-7 bg-black"></span>
        <span className="mb-1.5 block h-1 w-7 bg-black"></span>
        <span className="mb-1.5 block h-1 w-7 bg-black"></span>
      </div>
      {isOpen && (
        <>
          <Link id="ham_element" href="/matt" className="font-sans sm:block">
            Matt's form
          </Link>
          <Link
            id="ham_element"
            href="/users/table_antoine"
            className="font-sans sm:block "
          >
            Ant's table
          </Link>
        </>
      )}
    </>
  );
}
