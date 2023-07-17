'use client'
import Lottie from "lottie-react";
import loadingAnimation from "../../public/success.json";
import { auth, db } from "@/firebase/firebaseConfig";
import { collection, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
export default function page() {
    const [user] = useAuthState(auth);
    const cartsRef = collection(db, `users/${user?.uid}/cart`);
    const [cartSnapshots, loading] = useCollection(cartsRef);
    useEffect(() => {
        const deleteCartItems = async () => {
          if (!loading && cartSnapshots && user) {
            const deletionPromises = cartSnapshots.docs.map((doc) => deleteDoc(doc?.ref));
            await Promise.all(deletionPromises);
          }
        };
      
        deleteCartItems();
      }, [cartSnapshots, user]);
    
    return (
        <div className="w-full flex items-center justify-center h-[70vh] overflow-hidden flex-col">
                <h1 className="text-3xl font-bold px-4 text-center">✅ Congratulations! Your Order Was Successful.</h1>
            <Lottie style={{ height: 300 }} animationData={loadingAnimation} loop={true} />
        </div>
    )
}