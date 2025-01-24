"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <Link
              href="/"
              className="text-xl font-bold text-blue-400 hover:underline"
            >
              Solid Technology
            </Link>
          </div>

          <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </nav>

          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6 text-blue-400 hover:text-blue-500" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6 text-blue-400 hover:text-blue-500" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 text-blue-400 hover:text-blue-500" />
            </a>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Solid Technology. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
