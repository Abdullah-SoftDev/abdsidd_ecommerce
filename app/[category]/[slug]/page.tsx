"use client";
import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import RecommendedProductSlider from "./components/RecommendedProductSlider";
import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.type";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [product, setProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  const getProduct = async () => {
    const productRef = doc(db, "products", slug);
    const docSnapshot = await getDoc(productRef);
    const productData = docSnapshot.data() as Product;
    setProduct(productData);
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    setSelectedImage(product?.images[0]);
  }, [product]);

  return (
    <div className="mx-auto max-w-5xl px-2 py-14 min-h-screen">
      <div className="lg:grid lg:grid-cols-2 lg:space-x-8">
        {/* Image gallery */}
        <Tab.Group as="div" className="flex flex-col-reverse">
          {/* Image Gallery */}
          <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
              {product?.images.map((image) => (
                <Tab
                  key={String(image)}
                  className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50 ${
                    selectedImage === image
                      ? "ring-indigo-500"
                      : "ring-transparent"
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

        {/* Product info */}
        <div className="py-4 md:py-0 px-2 sm:px-0">
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-xl text-gray-900">Category</p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pt-3">
            {product?.productName}
          </h1>
          <div className="mt-6">
            <h3 className="text-xl font-medium tracking-tight ">
              Product Description
            </h3>

            <div className="text-base text-gray-700 space-y-6">
              {product?.desc}
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

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
                      <Disclosure.Panel
                        as="div"
                        className="pb-6 prose prose-sm"
                      >
                        {/* <ul role="list">
                          {detail.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul> */}
                        <ul role="list">
                          <li key={product?.slug}>{product?.desc}</li>
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </section>

            <div className="pt-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Change the availablity in your region
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500"></div>
              <form className="mt-5 sm:flex sm:items-center">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    name="search"
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter pincode..."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Check
                </button>
              </form>
            </div>

            <form className="mt-6">
              <div className="mt-10 space-x-5 flex sm:flex-col1">
                <button
                  type="submit"
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                  Add to bag
                </button>
                <button
                  type="submit"
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                  Buy Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <RecommendedProductSlider />
    </div>
  );
}
