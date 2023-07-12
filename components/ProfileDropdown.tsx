import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";

const ProfileDropdown = () => {
  const user = false;
  function classNames(...classes: string[]) {
    return classes?.filter(Boolean)?.join(" ");
  }
  return (
    <div className="md:ml-4 ml-2 flex items-center">
      {user ? (
        <Menu as="div" className="relative flex-shrink-0">
          <div>
            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtd9M6KBOGZjnk94PFAEIGX-t7nDfWROVK17Mm8-ZMI%3Ds96-c&w=48&q=75"
                alt=""
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "px-4 py-2 text-sm text-gray-700 lg:hidden inline-flex w-full"
                    )}
                  >
                    IWATCH ULTRA{" "}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "px-4 py-2 text-sm text-gray-700 lg:hidden inline-flex w-full"
                    )}
                  >
                    AIRPOD
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "lg:hidden inline-flex px-4 py-2 text-sm text-gray-700 w-full"
                    )}
                  >
                    T-SHIRTS
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 w-full text-left" : "",
                      "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <Link
          href="/signIn"
          className="sm:ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default ProfileDropdown;
