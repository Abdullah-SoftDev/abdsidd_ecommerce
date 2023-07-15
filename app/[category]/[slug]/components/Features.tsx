"use client";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Features = ({ productData }: any) => {
  console.log(productData);
  return (
    <div className="border-t divide-y divide-gray-200">
      <Disclosure as="div">
        {({ open }) => (
          <>
            <h3>
              <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                <span
                  className={classNames(
                    open ? "text-indigo-600 -z-10" : "text-gray-900",
                    "text-sm font-medium -z-10"
                  )}
                >
                  Features
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon
                      className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <PlusIcon
                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
              <ul role="list">
                <li key={productData?.slug}>{productData?.desc}</li>
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Features;
