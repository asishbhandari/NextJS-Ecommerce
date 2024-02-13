import Navigation from "../component/navigation";
import Carousel from "../component/carousel";
import ProductsFeeds from "@/component/ProductsFeeds";
// import { getServerSession } from "next-auth";
// import {authOptions} from "./api/auth/[...nextauth]/route"

async function getData(){
  const res = await fetch("https://fakestoreapi.com/products")
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const data = await res.json();
  return data;
}

export default async function Home() {
  const products = await getData()
  // used getServerSession for server side components to get authorized user data
  // const session = await getServerSession(authOptions)
  // console.log(session)
  return (
    <div className="bg-gray-100 ">
      <Navigation />
      <main className="mx-auto">
        <Carousel />
        <ProductsFeeds products={products}  />
      </main>
      <footer>footer part</footer>
    </div>
  );
}

