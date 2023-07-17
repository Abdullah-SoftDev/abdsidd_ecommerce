'use client'
import Lottie from "lottie-react";
import loadingAnimation from "../../public/success.json";
import { auth, db } from "@/firebase/firebaseConfig";
import { collection, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function page() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const cartsRef = collection(db, `users/${user?.uid}/cart`);
  const [cartSnapshots, loading] = useCollection(cartsRef);

  useEffect(() => {
    if (user == null) {
      router.push("/");
      return;
    }

    const deleteCartItems = async () => {
      if (!loading && cartSnapshots && user) {
        const deletionPromises = cartSnapshots.docs.map((doc) => deleteDoc(doc?.ref));
        await Promise.all(deletionPromises);
      }
    };

    deleteCartItems();
  }, [user, cartSnapshots]);

  if (!user) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center h-[70vh] overflow-hidden flex-col">
      <h1 className="text-3xl font-bold px-4 text-center">✅ Congratulations! Your Order Was Successful.</h1>
      <Lottie style={{ height: 300 }} animationData={loadingAnimation} loop={true} />
    </div>
  )
}