import { auth, db } from "@/firebase/firebaseConfig";
import { CartProps, Product } from "@/types/typescript.type";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, getDoc, orderBy, query, updateDoc } from "firebase/firestore";
import React, { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";

const Cart = ({ open, setOpen }: CartProps) => {
  const [user] = useAuthState(auth);
  const cartQuery = query(
    collection(db, `users/${user?.uid}/cart`),
    orderBy('createdAt')
  );

  const [cartData, loading] = useCollectionData(cartQuery);

  const handelRemoveFromCart = async (id: string) => {
    await deleteDoc(doc(db, `users/${user?.uid}/cart/${id}`));
  }

  const userCartdata = cartData;

  const totalArr: number[] = [];
  (userCartdata as Product[])?.map((e: Product) => {
    totalArr.push(e.price * e.quantity); // Calculate the total price for each item
  });

  let sum = 0;
  for (let i = 0; i < totalArr.length; i++) {
    sum += totalArr[i];
  }
 
  const createCheckout = async () => {
    const data = await fetch(`/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCartdata,
        uid:user?.uid
      }),
    });

    if (!data.ok) {
      return toast.error("Failed to create order");
    }

    const { url } = await data.json();

    window.location.href = url;
  };

  const handleIncrementQuantity = async (id: string) => {
    try {
      const cartRef = doc(db, `users/${user?.uid}/cart/${id}`);
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        // Increase the quantity if the product already exists in the cart
        await updateDoc(cartRef, {
          quantity: cartSnapshot.data().quantity + 1
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDecrementQuantity = async (id: string) => {
    try {
      const cartRef = doc(db, `users/${user?.uid}/cart/${id}`);
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        const currentQuantity = cartSnapshot.data().quantity;
        const updatedQuantity = currentQuantity - 1;

        if (updatedQuantity <= 0) {
          // Remove the product from the cart if quantity becomes 0 or less
          await deleteDoc(cartRef);
        } else {
          // Decrease the quantity if greater than 0
          await updateDoc(cartRef, {
            quantity: updatedQuantity
          });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500 outline-none"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {(userCartdata?.length === 0) && (
                        <p className="text-red-500 italic text-lg py-5">Your cart is empty. Start Shopping🛒</p>
                      )}


                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {userCartdata?.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.images[0]}
                                    alt={product.productName}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={"/"}>{product.productName}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center">
                                      <button
                                        onClick={() => handleDecrementQuantity(product.slug)}
                                        type="button"
                                        className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          className="h-4 w-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 12H4"
                                          />
                                        </svg>
                                      </button>

                                      <p className="mx-2 text-black">{product.quantity}</p>

                                      <button
                                        onClick={() => handleIncrementQuantity(product.slug)}
                                        type="button"
                                        className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          className="h-4 w-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                          />
                                        </svg>
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        onClick={() => handelRemoveFromCart(product.slug)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>

                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {(!(userCartdata?.length === 0)) && <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{sum}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={createCheckout}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(true)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
