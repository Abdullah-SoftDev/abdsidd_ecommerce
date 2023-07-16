import { stripe } from "@/lib/stripe";
import { Product } from "@/types/typescript.type";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body: Product & { uid: string } = await request.json();

    const { productName, desc, price, images, quantity, uid } = body;

    try {
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: productName,
                            description: desc,
                            images: [images[0]],
                        },
                        unit_amount: price * 100,
                    },
                    quantity: quantity,
                }
            ],
            metadata: {
                userId: uid,
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


