// Currenlty this will not work because nextjs has an issue that i have posted on their github and till then wait for their response🤷🥱

// Here is the issue link. https://github.com/vercel/next.js/issues/48875

import { db } from "@/firebase/firebaseConfig";
import { stripe } from "@/lib/stripe";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false,
    },
};

const createOrder = async (data: any) => {
    await addDoc(collection(db, "orders"), {
        uid: data.metadata.userId,
        paymentId: data.id,
        amount: data.amount_total / 100,
        images: data.metadata.images,
        createdAt: serverTimestamp(),
    });
};


export async function POST(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;
    if (req.method === 'POST') {
        const sig = req.headers['stripe-signature']!;

        let event;
        try {
            const body = await buffer(req);
            event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
        } catch (err: any) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        // Successfully constructed event
        console.log('✅ Success:', event.id);

        if (event.type === 'checkout.session.completed') {
            const data = event.data.object;
            createOrder(data);
        }
        // Return a response to acknowledge receipt of the event
        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

const buffer = (req: NextApiRequest) => {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];

        req.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            resolve(Buffer.concat(chunks));
        });

        req.on('error', reject);
    });
};
