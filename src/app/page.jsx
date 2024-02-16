import Navigation from "../component/navigation";
import Carousel from "../component/carousel";
import ProductsFeeds from "@/component/ProductsFeeds";

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

  return (
    <div className="bg-gray-100 ">
      <Navigation />
      <main className="mx-auto">
        <Carousel />
        <ProductsFeeds  products={products}  />
      </main>
    </div>
  );
}

