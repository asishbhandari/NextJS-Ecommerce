import Product from "./Product";
const ProductsFeeds = ({ products }) => {
    return (
        <div className="container mx-auto grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -mt-56 md:-mt-40 lg:-mt-24 xl:-mt-20 ">
            {products.slice(0, 4).map((product) => (
                <Product product={product} key={product.id} />
            ))}
            <img src="/sale3.png" className="md:col-span-full py-2 " alt="Sale1" />
            {products.slice(4).map((product) => (
                <Product product={product} key={product.id} />
            ))}

            {/* {products.slice(5).map((product) => (
                    <Product product={product} key={product.id}/>
                ))} */}
        </div>
    )
}

export default ProductsFeeds;