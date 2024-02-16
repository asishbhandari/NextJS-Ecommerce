import Stripe from 'stripe';
import * as admin from 'firebase-admin'
import { NextResponse } from 'next/server';

// securing connection to firebase from backend
const serviceAccount = require("../../../../firebase_admin_permission.json");
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

// establishing connection to strip
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fullfillOrder = async (session) => {
    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => console.log(`Success: Order ${session.id} has been added to the DB`))
}

export async function POST(request) {
    
    const body = await request.text()
    const sig = request.headers.get('stripe-signature');
    let event;

    // Verify webhook signature and extract the event.
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // handle the checkout session complete event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        // fullfill the order
        return fullfillOrder(session)
            .then(() => NextResponse.json({status: 200}))
            .catch((err) => NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 }))
    }

    return NextResponse.json({received: true});
};

// export const config ={
//     api: {
//         bodyParser: false,
//         externalResolver: true
//     }
// }