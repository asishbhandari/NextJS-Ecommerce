import Navigation from "@/component/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import db from "../../../firebase";
import { collection, getDocs, doc, query, orderBy, limit } from 'firebase/firestore/lite';
import moment from "moment";
import OrderComp from "@/component/OrderComp";

async function getData(){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await getServerSession(authOptions)

    // firebase data fetching
    const querrySnapshot= await getDocs(query(collection(db, 'users',`${session.user.email}`,'orders'), 
            orderBy('timestamp','desc'), 
        )
        )

    //  stripe data matching with firebase
    const orders = await Promise.all(querrySnapshot.docs.map(async (snap)=> ({
        id: snap.id,
        amount: snap.data().amount,
        images: snap.data().images,
        timestamp: moment(snap.data().timestamp.toDate()).unix(),
        items: (
            await stripe.checkout.sessions.listLineItems(snap.id,{limit : 100})
        ).data,
    }))
    )
 
    return orders
}

export default async function Orders(){

    const session = await getServerSession(authOptions)
    let orders;
    if(session) {
        orders=  await getData()
    }

    return(
        <div>
            <Navigation />
            <main className="max-w-screen-lg mx-auto p-8">
                <h1 className="text-3xl border-b-2 mb-2 pb-1 border-yellow-400">
                    Your Orders
                </h1>
                {session ? (
                    <>
                        <h2>
                            {`${orders.length} orders`}
                        </h2>
                        <div className="mt-5 space-y-4">
                            {orders?.map(order =>(
                                <OrderComp key={order.id} order={order}/>
                            ))}
                        </div>
                    </>
                ) : (
                    <h2 className="text-xl p-4">
                        Please sigin to see your orders
                    </h2>
                )}
            </main>
        </div>
    )
}

