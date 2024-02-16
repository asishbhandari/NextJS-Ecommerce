'use client'
import { FaSearch } from "react-icons/fa";
import { PiShoppingCart } from "react-icons/pi";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Navigation() {
    const router = useRouter()
    const { data } = useSession();
    const cartItems = useSelector((state) => state.cart.items)

    return (
        <nav className="flex flex-col mx-auto ">
            <div className="flex justify-between item-center px-2 py-1 md:px-6 md:py-1 lg:px-8 lg:py-2 bg-amaxon-blue">
                <div onClick={() => router.push('/')} className="font-bold self-center text-left sm:text-center text-lg sm:text-2xl 
                    text-stone-50 p-2 cursor-pointer border-2 border-amaxon-blue hover:border-white ">Local Mart</div>
                <div className="hidden mx-2 md:flex items-center flex-grow h-14 bg-yellow-400 hover:bg-yellow-500 cursor-pointer rounded-md ">
                    <input
                        className="flex-grow p-2 h-full rounded-l-md focus:outline-none"
                        type="text"
                        placeholder="search"
                    />
                    <FaSearch className="w-10 " />
                </div>
                <div className="popoverLink flex flex-col text-white p-2 item-center border-2 border-amaxon-blue 
                    hover:border-white cursor-pointer">
                    <span className="text-xs line-clamp-1 p-0 m-0 ">{!data ? `Hello, sign in` : `Hello, ${data.user.name}`}</span>
                    <span className="leading-4 text-xs sm:text-lg font-bold">Account & Lists</span>
                    <span className="popoverlayout">
                        {
                            data ? <span className="popoverItem"><button className="button" onClick={signOut}>SignOut</button></span>
                                :
                                <span className="popoverItem"><button className="button" onClick={signIn}>SignIn</button></span>
                        }
                    </span>
                </div>
                <div
                    onClick={()=> router.push('/orders')} 
                    className="flex flex-col text-white p-2 item-center border-2 border-amaxon-blue 
                    hover:border-white cursor-pointer ">
                    <span className="text-xs p-0 m-0 ">Returns</span>
                    <span className="leading-4 text-xs sm:text-lg font-bold">& Orders</span>
                </div>
                <div onClick={() => router.push('/checkout')} 
                    className="flex items-center h-14 p-2 justify-center text-stone-50 border-2 
                    border-amaxon-blue hover:border-white cursor-pointer">
                    <div className="relative link">
                        <PiShoppingCart className="w-10 h-10 mx-2 my-1" />
                        <span className="absolute top-0 right-0 bg-yellow-400 h-5 w-5 text-sm 
                        text-center rounded-full text-black ">{cartItems ? cartItems.length : '0'}</span>
                    </div>
                    {/* link is cutom ustility class created created by me in global.css */}
                    <div className="text-xl  hidden sm:block"> Cart
                    </div>
                </div>          
            </div>
            <div className="flex items-center justify-between md:justify-normal px-2 py-1 md:px-6 md:py-1 lg:px-8 lg:py-2 h-10 md:h-7 bg-sky-950 text-white text-xs">
                <div className="flex  px-3 py-1 cursor-pointer border-2 border-amaxon-blue hover:border-white">
                    <IoMenu  className="self-center"/>
                    <span>All</span>
                </div>
                <div className="px-2 md:px-6 py-1 cursor-pointer border-2 border-amaxon-blue hover:border-white"> Amazon miniTV</div>
                <div className="px-2 md:px-6 py-1 cursor-pointer border-2 border-amaxon-blue hover:border-white"> Sell</div>
                <div className="px-2 md:px-6 py-1 cursor-pointer border-2 border-amaxon-blue hover:border-white"> Best Seller</div>
                <div className="px-2 md:px-6 py-1 cursor-pointer border-2 border-amaxon-blue hover:border-white"> Today's deal</div>
                <div className="px-2 md:px-6 py-1 cursor-pointer border-2 border-amaxon-blue hover:border-white"> Prime</div>
            </div>
        </nav>
    )
}
