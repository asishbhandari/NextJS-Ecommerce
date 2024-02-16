'use client'
// import { useRef } from 'react'
// import { useAppSelector, useAppDispatch, useAppStore } from '../lib/hooks';
import {addToCart} from "../lib/features/cartSlice"

import { FaStar } from "react-icons/fa6";
import { PiCurrencyInrBold } from "react-icons/pi";
import { useDispatch } from 'react-redux';

export default function Product({product}){
    const dispatch = useDispatch();

    const addItemToCart=()=> {
        dispatch(addToCart(product))
    }

    return(
        <div className=" relative flex flex-col p-4 bg-white m-2 z-30 ">
            <p className="absolute top-2 right-2 text-xs text-slate-300 ">{product.category}</p>
            <img src={product.image} alt={product.title} className="mx-auto object-contain h-52 w-52 mt-4"/>
            <p className="text-md text-center line-clamp-1 mt-2"> {product.title}</p>
            <p className="flex items-center">
                <span><PiCurrencyInrBold /></span> 
                <span>{product.price*50}</span>
            </p>
            <div className="flex mb-2"> {Array(Math.floor(product.rating.rate)).fill().map((a,i) =>(
                    <FaStar className="text-yellow-500" key={i}/>  
                ))}
            </div> 
            <p className="line-clamp-2">{product.description}</p>
            <button 
                onClick={addItemToCart}
                className="button">Add To Cart</button>
        </div>
    )
}