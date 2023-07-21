'use client'

import { auth, db } from "@/firebase/firebaseConfig";
import { collection, query, where } from "firebase/firestore";
import Lottie from "lottie-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import loadingAnimation from "../../public/loadingAnimation.json";
import Link from "next/link";

export default function Page() {
  const [user] = useAuthState(auth);
  const ordersRef = collection(db, "orders");
  const queryy = user ? query(ordersRef, where("uid", "==", user.uid)) : null;
  const [orderSnapshots, loading] = useCollection(queryy);
  const orders = orderSnapshots?.docs.map((doc) => doc.data());
  function calculateTotalPrice(userCartdata) {
    let totalPrice = 0;

    for (let i = 0; i < userCartdata.length; i++) {
      const product = userCartdata[i];
      totalPrice += product.price * product.quantity;
    }

    return totalPrice;
  }

  if (loading) {
    <Lottie style={{ height: 300 }} animationData={loadingAnimation} loop={true} />
  }

  return (
    <div className="mx-auto max-w-5xl px-2 py-14 min-h-screen">
      <div className="max-w-xl">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
        <p className="mt-2 text-sm text-gray-500">
          Check the status of recent orders, manage returns, and download invoices.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="sr-only">Recent orders</h2>
        {orders ? <div className="space-y-20">
          {orders?.map((order) => (
            <div key={order.createdAt}>
              <h3 className="sr-only">
                Order placed on <time>{order?.createdAt?.seconds}</time>
              </h3>
              <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                  <div className="flex justify-between sm:block">
                    <dt className="font-medium text-gray-900">Date placed</dt>
                    <dd className="sm:mt-1">
                      <time>{new Date(order?.createdAt.seconds * 1000).toDateString()}</time>
                    </dd>

                  </div>
                  {/* <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Order number</dt>
                      <dd className="sm:mt-1">{order.number}</dd>
                    </div> */}
                  <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                    <dt>Total amount</dt>
                    <dd className="sm:mt-1">{calculateTotalPrice(order.userCartdata)}</dd>
                  </div>
                </dl>
                <button
                  className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                >
                  View Invoice
                  {/* <span className="sr-only">for order {order.number}</span> */}
                </button>
              </div>

              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                <caption className="sr-only">Products</caption>
                <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                  <tr>
                    <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
                      Product
                    </th>
                    <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">
                      Price
                    </th>
                    <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                      Quantity
                    </th>
                    <th scope="col" className="w-0 py-3 font-normal text-right">
                      Info
                    </th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                  {order.userCartdata.map((product) => (
                    <tr key={product.id}>
                      <td className="py-6 pr-8">
                        <div className="flex items-center">
                          <img
                            src={product.images[0]}
                            alt={product.productName}
                            className="w-16 h-16 object-center object-cover rounded mr-6"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{product.productName}</div>
                            <div className="mt-1 sm:hidden">{product.price}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{product.quantity}</td>
                      <td className="py-6 font-medium text-right whitespace-nowrap">
                        <Link href={`/${product.category}/${product.slug}`} className="text-indigo-600">
                          View<span className="hidden lg:inline"> Product</span>
                          <span className="sr-only">, {product.productName}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div> : <Lottie style={{ height: 300 }} animationData={loadingAnimation} loop={true} />
        }
      </div>
    </div>
  )
}
