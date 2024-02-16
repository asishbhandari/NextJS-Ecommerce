'use client'
import Navigation from "@/component/navigation";
import { useRouter } from "next/navigation";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function success(){

    const router= useRouter();

    return(
        <div className="bg-gray-100 h-screen">
            <Navigation />
            <div className="max-w-screen-lg mx-auto bg-white m-2 p-4">
                <div className="flex justify-center text-md md:text-2xl space-x-4 ">
                    <IoMdCheckmarkCircle className=" text-green-600 w-6 h-6 md:w-8 md:h-8" /> 
                    <span>Thank you, your order has been confirmed!</span>
                </div>
                <div className=" py-2">
                    Thank you for shopping with us, we will send a confirmation when your item will be shipped,
                    if you would like to check the status of your order(s) please press the link above
                </div>
                <button onClick={()=> router.push("/orders")} className="button w-full">Go to Orders</button>
            </div>
        </div>
    )
}