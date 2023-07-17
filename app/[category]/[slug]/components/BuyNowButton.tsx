'use client'
import { auth } from '@/firebase/firebaseConfig';
import { Product } from '@/types/typescript.type';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

interface BuyNowButtonProps {
    productData: Product;
  }
  
  const BuyNowButton = ({ productData }: BuyNowButtonProps) => {
        const [user] = useAuthState(auth);

    const createCheckout = async () => {
        if (!user) {
            alert('Please login first.');
            return;
          }
        const data = await fetch(`/buyNow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productData: [productData], 
                uid:user?.uid
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
            <button
              type="button"
              onClick={createCheckout}
              className="max-w-sm flex-1  bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
            >
              Buy Now
            </button>
       </>
    )
}

export default BuyNowButton