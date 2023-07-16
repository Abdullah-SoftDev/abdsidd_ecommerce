'use client'
import { auth } from '@/firebase/firebaseConfig';
import { Product } from '@/types/typescript.type';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const BuyNowButton = ({ productName, slug, desc, price, category, images, quantity, }: Product) => {
    const [user] = useAuthState(auth);

    const createCheckout = async () => {
        const data = await fetch(`/buyNow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productName, slug, desc, price, category, images, quantity,
                uid: user?.uid
            }),
        });

        if (!data.ok) {
            return toast.error("Failed to create order");
        }

        const { url } = await data.json();

        window.location.href = url;
    };
    
    return (
       <>
        {user && (
            <button
              type="button"
              onClick={createCheckout}
              className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
            >
              Buy Now
            </button>
          )}
       </>
    )
}

export default BuyNowButton