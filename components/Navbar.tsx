"use client";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import ProfileDropdown from "./ProfileDropdown";
import Cart from "./Cart";
import { useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { auth, db } from "@/firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import WhatsappButton from "./WhatsappButton";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false); //Handles the cart sidebar
  const [user] = useAuthState(auth);
  const [cartData, loading] = useCollectionData(
    collection(db, `users/${user?.uid}/cart`)
  );
  
  const cartLength = cartData?.length || 0;  

  return (
    <Disclosure
      as="nav"
      className="bg-white shadow sticky top-0 left-0 right-0 z-20"
    >
      <div className="max-w-5xl mx-auto xl:px-0 px-2">
        <div className="flex justify-between h-16">
          {/* NavLinks */}
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center ">
              <img
                className="h-10 w-10 rounded-full"
                src="https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtd9M6KBOGZjnk94PFAEIGX-t7nDfWROVK17Mm8-ZMI%3Ds96-c&w=48&q=75"
              />
            </Link>
            <div className="hidden lg:ml-5 lg:flex lg:space-x-8 pt-1">
              <Link
                href="/iwatchUltra"
                className="border-transparent text-gray-500  hover:text-gray-700 inline-flex items-center px-1 pt-1 text-md font-medium"
              >
                IWATCH ULTRA
              </Link>
              <Link
                href="/airpod"
                className="border-transparent text-gray-500  hover:text-gray-700 inline-flex items-center px-1 pt-1 text-md font-medium"
              >
                AIRPOD
              </Link>
              <Link
                href="/tshirts"
                className="border-transparent text-gray-500  hover:text-gray-700 inline-flex items-center px-1 pt-1 text-md font-medium"
              >
                T-SHIRTS
              </Link>
            </div>
          </div>
          <Searchbar />
          <ProfileDropdown />
          <div className="group outline-none flex items-center pl-2 cursor-pointer">
            <div className="group relative">
              <ShoppingBagIcon
                onClick={() => {
                  setOpen(true);
                }}
                className="flex-shrink-0 outline-none text-gray-400 group-hover:text-gray-500 h-7 w-7 cursor-pointer"
                aria-hidden="true"
              />
              <span className="absolute animate-pulse top-0 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                {cartLength}
              </span>
            </div>
          </div>

          <WhatsappButton />

          <Cart open={open} setOpen={setOpen} />
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
