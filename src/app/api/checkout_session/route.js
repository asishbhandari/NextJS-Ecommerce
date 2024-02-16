import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
    // Create Checkout Sessions from body params.
    const data = await request.json();
    // console.log(data.items, data.email);

    const cartItems= data.items.map((item,i) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'inr',
        unit_amount : item.price*100,
        product_data:{
          name: item.title,
          description: item.description,
          images:[item.image]
        }
      }
    }))
    // console.log(cartItems)

    const session = await stripe.checkout.sessions.create({
      customer_email: data.email,
      payment_method_types: [
        "card"
      ],
      // billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA','IN'],
      },
      line_items: cartItems,
      mode: 'payment',
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/canceled`,
      metadata:{
        email: data.email,
        images:JSON.stringify(data.items.map(item=> item.image))
      }
      // success_url: `${req.headers.origin}/?success=true`,
      // cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    return NextResponse.json({id: session.id})
    // res.redirect(303, session.url);
}
