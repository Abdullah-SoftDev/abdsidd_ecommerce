import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body: { userCartdata: any[], uid: any } = await request.json();

    const { userCartdata, uid } = body;

    console.log(userCartdata);

    try {
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: userCartdata.map((item: any) => ({
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


