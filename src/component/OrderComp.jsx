import { PiCurrencyInrBold } from "react-icons/pi";
import moment from "moment";

const OrderComp = ({order})=> {
    return(
        <div className="relative border rounded-md">
            <div className="flex item-center space-x-10 p-3 bg-gray-100 text-sm text-gray-600">
                <div >
                    <p className="font-bold text-sm">ORDER PLACED</p>
                    <p>{moment.unix(order.timestamp).format("DD MMM YYYY")}</p>
                </div>
                <div>
                    <p className="text-sm font-bold">TOTAL</p>
                    <p className="flex items-center "><PiCurrencyInrBold /> {order.amount}</p>
                </div>
                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    {`${order.items.length} items`}</p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
                    ORDER # {order.id}</p>
            </div>
            <div className="p-4 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {order.images.map((image,i) => (
                        <img src={image} key={i} alt="img" className="h-20 w-20 object-contain sm:h-32 sm:w-32" />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default OrderComp