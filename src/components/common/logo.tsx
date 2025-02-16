// components/home/GetStarted.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface GetStartedProps {
  logoSrc: string; // Path to the logo image in the public folder
}

const GetStarted = ({ logoSrc }: GetStartedProps) => {
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (blurRef.current) {
        const rect = blurRef.current.getBoundingClientRect();
        const opacity = Math.max(
          0,
          Math.min(1, 1 - rect.top / window.innerHeight)
        );
        blurRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* Background Blur */}
      <div
        ref={blurRef}
        className="absolute inset-0 bg-gray-200 dark:bg-gray-700 blur-3xl transition-opacity duration-500"
        style={{ opacity: 1 }}
      ></div>

      {/* Logo */}
      <div className="relative z-10">
        <Image
          src={logoSrc} //  Path to the image in the public folder
          alt="App Logo"
          width={200}
          height={200}
          className="rounded-full shadow-lg"
          priority
        />
      </div>

      {/* Get Started Button */}
      <Link href="/home" className="relative z-10 mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default GetStarted;
