import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.type";
import { addDoc, collection, deleteDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const createOrder = async (productData: Product[], uid: string) => {
  await addDoc(collection(db, "orders"), {
    uid,
    userCartdata: productData,
    createdAt: serverTimestamp(),
  });
};

export const POST = async (request: Request) => {
  const body: { productData: Product[]; uid: string } = await request.json();

  const { productData, uid } = body;

  try {
    await createOrder(productData, uid);

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: productData[0]?.productName,
              description: productData[0]?.desc,
              images: [productData[0]?.images[0]],
            },
            unit_amount: productData[0]?.price * 100,
          },
          quantity: productData[0]?.quantity,
        },
      ],
      metadata: {
        userId: uid,
      },
      mode: "payment",
      success_url: `https://your-domain.com/success`, // Update with the appropriate URL
      cancel_url: `https://your-domain.com/cancel`, // Update with the appropriate URL
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error((err as Error).message);

    return NextResponse.json(
      {
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
};
