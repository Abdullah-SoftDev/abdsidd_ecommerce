// import { db } from "@/firebase/firebaseConfig";
import { stripe } from "@/lib/stripe";
import { Product } from "@/types/typescript.type";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: { userCartdata: Product[]; uid: string } = await request.json();

  const { userCartdata, uid } = body;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: userCartdata.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productName,
            description: item.desc,
            images: [item.images[0]],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      metadata: {
        userId: uid,
        images: JSON.stringify(userCartdata.map((item) => item.images)),
      },
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
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

// const createOrder = async (data) => {
//   await addDoc(collection(db, "orders"), {
//     uid: data.metadata.userId,
//     paymentId: data.id,
//     amount: data.amount_total / 100,
//     images: data.metadata.images[0],
//     createdAt: serverTimestamp(),
//   });
// };