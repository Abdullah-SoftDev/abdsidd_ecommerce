"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const page = () => {
  return (
    <section className="mx-auto max-w-5xl px-2 py-14 min-h-screen">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="w-24 md:w-36 mb-10 object-cover object-center rounded"
          alt="hero"
          src="https://codeswear.com/codeswearcircle.png"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium">
            Welcome to <span>abdsidd.com</span>
          </h1>

          <p className="text-xl leading-relaxed mb-2">
            Buy{" "}
            <span className="text-pink-700 font-semibold">
              <TypeAnimation
                sequence={[
                  "Tshirts",
                  1000,
                  "Hoodies",
                  1000,
                  "Airpods",
                  1000,
                  "Smartwatch",
                  1000,
                ]}
                wrapper="span"
                speed={40}
                style={{ fontSize: "1.5rem", display: "inline-block" }}
                repeat={Infinity}
              />
            </span>
          </p>
          <p className="mb-8 leading-relaxed">
            Introducing Abdsidd, a revolutionary e-commerce platform that brings
            you incredible products at unbeatable prices. Built using the power
            of Next.js and Firebase, our website offers a seamless shopping
            experience with the added benefits of server-side rendering. Whether
            you're a tech enthusiast or someone in search of a stylish geek
            T-shirt, AbdSidd has something for everyone. And if you're
            interested in the development process, don't miss the github repo on
            github. Explore the future of online shopping by visiting AbdSidd
            today.
          </p>
          <div className="flex justify-center">
            <a href="/tshirts">
              <button className="inline-flex text-black bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
                Start Shopping
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
