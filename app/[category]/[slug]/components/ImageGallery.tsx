"use client";
import { ImageGallery } from "@/types/typescript.type";
import { Tab } from "@headlessui/react";
import { useState } from "react";

const ImageGallery = ({ images }: ImageGallery) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image:string) => (
            <Tab
              key={String(image)}
              className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50 ${
                selectedImage === image ? "ring-indigo-500" : "ring-transparent"
              }`}
              onClick={() => setSelectedImage(String(image))}
            >
              <span className="sr-only">{String(image)}</span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <img
                  src={String(image)}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </span>
              <span
                className={`absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none ${
                  selectedImage === image
                    ? "ring-indigo-500"
                    : "ring-transparent"
                }`}
                aria-hidden="true"
              />
            </Tab>
          ))}
        </Tab.List>
      </div>
      <div className="w-full h-full py-4">
        <img
          src={String(selectedImage)}
          alt=""
          className="w-full h-full object-center object-cover rounded-md"
        />
      </div>
    </Tab.Group>
  );
};

export default ImageGallery;
