// brainstorm
// for stripe webhook after payment
// next.js convention for "automatic" apis - protected server-side
// needs to update the DB with paid 
// will need to already have users table in prisma - todo asap

// basing on MonkeyHR-live Stripe webhook
// helpful: https://nextjs.org/blog/building-apis-with-nextjs

import { NextResponse } from 'next/server' // use NextResponse not typical 'res' for Next api routes

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {

    // stripe webook instructions
    const signature = req.headers.get('stripe-signature')
    const buf = await req.arrayBuffer()
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(Buffer.from(buf), signature, webhookSecret)
    } catch (err) {
        console.log('a problem with constructEvent', err)
        return
    }

    if (event.type === 'checkout.session.completed') { // payment_intent.succeeded is another option
        console.log('hurray!! we have made it here in the stripe test!!')
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id // the Clerk userId set on initial payment links
        console.log('got the Clerk userId', userId)
        // do something with the database!
    }

    return NextResponse.json({ received: true }, { status: 200 })
}