


const Featuring = () => {
  return (
    <div className="relative p-[16px] sm:px-[40px] min-h-[50vh] mt-[50px] mb-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white to-black"></div>

        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 items-center justify-center">
            <div className="h-[300px] relative w-[300px]">
                <div className="absolute inset-0 bg-amber-300 rounded-full -z-10"></div>
                <img
                    src="/assets/disImg.png"
                    alt="Featuring Background"
                    className="w-full h-full object-cover drop-shadow-xl drop-shadow-black object-center"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <h1 className="text-4xl font-bold line-through [text-decoration-color:red]">Discount</h1>
                
                <p className="text-lg text-center max-w-2xl">
                    Welcome to our exclusive featured collection! Enjoy premium quality shirts at unbeatable prices. Shop now and elevate your wardrobe with the latest styles.
                </p>
                <button className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition">
                    Shop Now
                </button>
            </div>
        </div>
    </div>
  )
}

export default Featuring