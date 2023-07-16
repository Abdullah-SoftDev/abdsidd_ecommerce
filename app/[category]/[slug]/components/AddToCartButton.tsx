'use client'
import { auth, db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.type";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from "react-firebase-hooks/firestore";

const AddToCartButton = ({  productId, productName, slug, desc, price, category, images, quantity, }: Product) => {
    const [user] = useAuthState(auth);
    const [cartItemDoc] = useDocument(doc(db, `cart/${productId}`));

    const addToCart = async () => {
        try {
            if (!user) {
                throw new Error('Login first');
            } else {
            await setDoc(doc(db, 'cart', `${productId}`), {
                productId: productId,
                productName: productName,
                slug: slug,
                desc: desc,
                price: price,
                category: category,
                images: images,
                quantity: quantity,
                createdAt: serverTimestamp(),
                uid: user.uid
            });
            }
        } catch (error) {
            alert(error);
        }
    }

    const removeFromCart = async () => {
        try {
            if (!user) {
                throw new Error('Login first');
            } else {
            await deleteDoc(doc(db, `cart/${productId}`));
            }
        } catch (error) {
            alert(error);
        }
    }


    return (
        <div>
            {!cartItemDoc?.exists() ? (
                <button
                    onClick={addToCart}
                    type="button"
                    className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                    Add to bag
                </button>
            ) : (
                <button
                    onClick={removeFromCart}
                    type="button"
                    className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                    Remove from bag
                </button>
            )}
        </div>
    );
}

export default AddToCartButton;
