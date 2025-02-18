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
import { SITE_NAME } from "@/constants/constants";
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
    <header className="w-full px-4 py-3 space-y-4 md:space-y-0">
      {/* Main header container */}
      <div className="w-full mx-auto">
        {/* Top row - Logo, Search, Actions */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center">
            <Link href="/home" className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-black hover:opacity-50">
                {SITE_NAME}
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <Form action="/search" className="w-full md:flex-1 max-w-2xl">
            <input
              type="text"
              name="query"
              placeholder="Search for products"
              className="w-full bg-custom-black-1 glass opacity-60 text-gray-800 px-4 py-2 rounded 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-white 
                focus:font-extrabold focus:opacity-80 focus:ring-opacity-50 border"
            />
          </Form>

          {/* Actions Section */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-around">
            <div className="hidden lg:block">
              <Link href="/home" className="flex items-center space-x-3">
                {SITE_LOGO && (
                  <div className="flex items-center justify-center">
                    <span className="brightness-40 contrast-125 drop-shadow-md">
                      <Image
                        src={SITE_LOGO}
                        alt="Site Logo"
                        width={90}
                        className="hover:opacity-75 transition-opacity duration-200"
                        priority
                      />
                    </span>
                  </div>
                )}
              </Link>
            </div>

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
          </div>
        </div>
      </div>
    </header>
  );
}
