"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import React, { useEffect, useState } from "react";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";
import Image from "next/image";
import { SITE_LOGO } from "@/constants/images";

export default function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="w-full px-4 md:px-6 py-2 border-b border-gray-200">
      {/* Top Bar with Phone Number */}
      <a
        href="https://wa.me/+254794579698"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex justify-end text-sm text-green-600 font-bold py-1 md:py-2">
          Need Help? <span className="ml-2">(+254) 794579698</span>
        </div>
      </a>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row items-center justify-between py-3 space-y-4 md:space-y-0">
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Link href="/" className="flex items-center space-x-3">
            {SITE_LOGO && (
              <Image
                src={SITE_LOGO}
                alt="Site Logo"
                width={120}
                className="hover:opacity-75 transition-opacity duration-200"
                priority
              />
            )}
          </Link>
        </div>

        {/* Search Bar */}
        <Form
          action="/search"
          className="flex w-full md:w-3/5 lg:w-1/2 max-w-2xl items-center border bg-custom-black-1 border-primary rounded overflow-hidden"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="w-full px-4 py-2 focus:outline-none"
          />
          <button className="bg-primary px-6 py-2 text-white font-bold">
            SEARCH
          </button>
        </Form>

        {/* Account & Cart Section */}
        <div className="flex items-center space-x-6 w-full md:w-auto justify-center md:justify-end">
          {/* Basket Button */}
          <Link
            href="/basket"
            className="relative inline-flex items-center justify-around space-x-2 dark:bg-blue-500 dark:hover:bg-blue-700 
                text-white font-bold py-2 px-4 rounded transition-colors duration-200 bg-primary hover:bg-primary/90"
          >
            <TrolleyIcon className="w-5 h-5" />
            <span className="">My Basket</span>
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full 
                  w-5 h-5 flex items-center justify-center text-xs"
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Section */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="inline-flex items-center space-x-2 dark:bg-blue-500 dark:hover:bg-blue-700 
                    text-white font-bold py-2 px-4 rounded transition-colors duration-200 bg-primary hover:bg-primary/90"
              >
                <PackageIcon className="w-5 h-5" />
                <span className="">My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center gap-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
          </ClerkLoaded>

          {/* Cart
          <Link href="/cart" className="relative flex items-center text-black">
            <TrolleyIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
            <span className="ml-2">My Basket </span>
          </Link> */}
        </div>
      </div>
    </header>
  );
}
