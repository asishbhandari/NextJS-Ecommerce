
export default function Carousel(){
    return(
        <div className="w-full h-[420px] mb-3 relative">
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent z-20 "></div>
            <div id="carouselExampleAutoplaying" className="carousel slide h-full" data-bs-ride="carousel">
                <div className="carousel-inner h-full">
                    <div className="carousel-item active h-full">
                    <img src="/amazon.jpg" className="d-block w-full object-contain " alt="Sale1"/>
                    </div>
                    <div className="carousel-item h-full">
                    <img src="/amaprime.png" className="d-block w-full object-contain " alt="Sale2"/>
                    </div>
                    <div className="carousel-item h-full">
                    <img src="/sale8.jpg" className="d-block w-full object-contain " alt=".Sale3"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}