"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b bg-white p-4">
      <ul className="flex space-x-6 justify-center">
        {/* Static Navigation Links */}
        <li>
          <Link
            href="/"
            className={`${pathname === "/" || pathname === "/home" ? "text-green-600 font-bold" : "text-black"}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/accessories"
            className={`${pathname === "/accessories" ? "text-green-600 font-bold" : "text-black"}`}
          >
            Accessories
          </Link>
        </li>
        <li>
          <Link
            href="/repairs"
            className={`${pathname === "/repairs" ? "text-green-600 font-bold" : "text-black"}`}
          >
            Repairs
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
