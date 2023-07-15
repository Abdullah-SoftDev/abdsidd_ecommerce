'use client'
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from "react-firebase-hooks/firestore";

const AddToCartButton = ({ productData }: any) => {
    const [user] = useAuthState(auth);
    const [cartItemDoc] = useDocument(doc(db, `cart/${productData.productId}`));

    const addToCart = async () => {
        try {
            // if (!user) {
            //     throw new Error('Login first');
            // } else {
            await setDoc(doc(db, 'cart', `${productData.productId}`), {
                productId: productData.productId,
                productName: productData.productName,
                slug: productData.slug,
                desc: productData.desc,
                price: productData.price,
                category: productData.category,
                images: productData.images,
                createdAt: serverTimestamp(),
                // uid: user.uid
            });
            // }
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
