import React from "react";
const names = ["Recent Orders", "Products Delivered", "Our Customers"];

const Menubar = () => {
  return (
    <>
      <div className="mx-auto max-w-5xl flex mt-8 text-2xl whitespace-nowrap space-x-10 overflow-x-scroll scrollbar-hide">
        {names.map((name, index) => (
          <h2
            key={index}
            className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-105 hover:text-pink-500 active:text-red-500">
            {name}
          </h2>
        ))}
      </div>
      <div className=" absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12"/>
    </>
  );
};

export default Menubar;
