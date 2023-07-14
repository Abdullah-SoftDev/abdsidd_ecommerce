import Link from "next/link";
import React from "react";
const names = [
  { name: "AddProduct", path: "/dashboard/addProduct" },
  { name: "ProductsDelivered", path: "/dashboard/productsDelivered" },
  { name: "VeiwAllProducts", path: "/dashboard/veiwAllProducts" },
];

const Menubar = () => {
  return (
    <>
      <div className="mx-auto max-w-5xl flex py-4 text-xl whitespace-nowrap space-x-10 overflow-x-scroll scrollbar-hide px-3 sm:px-0 relative bg-zinc-100 sm:bg-white">
        {names.map((item, index) => (
          <Link href={item.path} key={index} className="cursor-pointer hover:text-pink-500">
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menubar;
