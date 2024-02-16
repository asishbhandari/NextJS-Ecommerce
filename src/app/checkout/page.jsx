'use client'
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, decrementItemQuantity } from "../../lib/features/cartSlice"
import Navigation from "../../component/navigation";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import { PiCurrencyInrBold } from "react-icons/pi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useSession, signIn } from "next-auth/react"
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

export default function Checkout() {
    const router = useRouter();
    const { data, status } = useSession();
    const cartItems = useSelector((state) => state.cart?.items)
    const totalQuanty = cartItems?.reduce((total, item) => total + item.quantity, 0)
    const totalCost = cartItems?.reduce((total, item) => total + item.price*item.quantity, 0)
    const dispatch = useDispatch();
    const handleDecrementQuantity = () => {
        return
    }

    const handlePaymentRequest =async()=>{
        const stripe= await stripePromise

        // request to checkout session api
        const checkoutSession= await axios.post('/api/checkout_session',
        {
            items: cartItems,
            email: data.user.email
        });

        const result =await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        })

        if(result.error) alert(result.error.message)
    }
    
    return (
        <div className="bg-gray-100">
            <Navigation />
            <div className="mx-auto h-40 mt-2 lg:h-96 md:h-72">
                <img src="/amaprime2.png" alt="primeimage" className="w-full h-full object-contain" />
            </div>
            {
                cartItems?.length !== 0 ?
                    (
                        <div className="max-w-screen-2xl mx-auto p-1 md:p-4">
                            <div className="flex w-full text-xl font-bold justify-center border-b-2 border-slate-200 pb-2">Your shopping Cart</div>
                            <div className="flex flex-col md:flex-row w-full">
                                <div className="md:w-3/4 m-3 bg-white p-3">
                                    {
                                        cartItems?.map((item, i) => (
                                            <div key={i * 20 + 1} className="grid grid-cols-5 bg-white ">
                                                <img src={item.image} alt={item.title} className="me-auto object-contain h-52 w-52 my-2" />
                                                <div className="col-span-3 px-2">
                                                    <p className="text-lg line-clamp-1 "> {item.title}</p>
                                                    <p className="text-xs text-green-600 mb-0">In Stock</p>
                                                    <p className="text-sm text-gray-500 ">Eligible for FREE shipping</p>
                                                    <div className="flex mb-2"> {Array(Math.floor(item.rating.rate)).fill().map((a, i) => (
                                                        <FaStar className="text-yellow-500" key={i} />
                                                    ))}
                                                    </div>
                                                    <p className="line-clamp-2 py-1">{item.description}</p>
                                                    <div className="flex gap-2">
                                                        <span
                                                            onClick={item.quantity > 1 ? () => dispatch(decrementItemQuantity(item)) : handleDecrementQuantity}
                                                            className="w-7 h-7 rounded-full border border-slate-300 text-center 
                                                            text-lg cursor-pointer">-
                                                        </span>
                                                        <span className=" w-10 h-7 border border-slate-300 text-center 
                                                            text-lg rounded-md ">
                                                            {item?.quantity}
                                                        </span>
                                                        <span
                                                            onClick={() => dispatch(addToCart(item))}
                                                            className="w-7 h-7 rounded-full border border-slate-300 text-center 
                                                            text-lg cursor-pointer">+
                                                        </span>
                                                        <span
                                                            onClick={() => dispatch(removeFromCart(item))}
                                                            className=" text-md border-l-2 border-slate-300 ml-4 pl-3 cursor-pointer hover:text-slate-300">
                                                            Delete
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className=" text-sm text-gray-500 text-end mb-0 ">Price</p>
                                                    <p className="flex items-center justify-end">
                                                        <span><PiCurrencyInrBold /></span>
                                                        <span>{item.price}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="md:w-1/4 m-3 bg-white p-3 flex flex-col">
                                    <div className="flex">
                                        <IoMdCheckmarkCircle className=" text-green-600 w-8 h-8 p-1" />
                                        <div className="flex flex-col">
                                            <span className="text-sm text-green-600 ">Your order is eligible for FREE Delivery.</span>
                                            <span className="text-xs">Select this option at checkout.</span>
                                        </div>
                                    </div>
                                    <div className=" mt-6 flex items-center">
                                        <span className="pr-2">{`Subtotal (${totalQuanty} items) :`}</span>
                                        <PiCurrencyInrBold />
                                        <span className="font-bold text-lg">{` ${totalCost}`}</span>
                                    </div>
                                    {
                                        data ? 
                                        // <form action="../api/checkout_session" method="POST">
                                            <button
                                                onClick={handlePaymentRequest}
                                                role="link"
                                                className="button">
                                                Proceed To Checkout
                                            </button>
                                        // </form>
                                            :
                                        <button
                                            onClick={signIn}
                                            className="button">
                                            SignIn To Proceed
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div className="flex w-full h-48 justify-center items-center mt-3 text-lg ">
                            Your Cart is Emplty <span onClick={() => router.push('/')} className=" underline ps-2 cursor-pointer"> Start Shopping</span>
                        </div>
                    )
            }
        </div>
    )
}