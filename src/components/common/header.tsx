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
import ThemeToggle from "../theme/toggleTheme";
import { SITE_NAME } from "@/constants/constants";
import Image from "next/image";
import { SITE_LOGO } from "@/constants/images";

export default function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);

  // Ensure that the component is mounted before accessing the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <div className="flex flex-row justify-center sm:justify-start">
          <Link
            href="/home"
            className="mx-auto sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12"
          >
            {SITE_LOGO ? (
              <span className="brightness-110 contrast-125 drop-shadow-md">
                {" "}
                {/* Added filter */}
                <Image
                  src={SITE_LOGO}
                  alt="Site Logo"
                  width={90}
                  className="hover:opacity-75 transition-opacity duration-200 object-cover"
                  priority
                />
              </span>
            ) : (
              <span className="text-2xl font-bold text-blue-500 hover:opacity-50">
                {SITE_NAME}
              </span>
            )}
          </Link>
        </div>

        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-custom-black-3 glass opacity-20 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-white focus:font-extrabold focus:font-3xl focus:opacity-80 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <div>
            <ThemeToggle />
          </div>

          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />
            {/* Span items count when the global state is implemented */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 items-center flex justify-center text-xs">
              {itemCount}
            </span>
            <span>My Basket</span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
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
    </header>
  );
}
