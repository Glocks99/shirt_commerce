import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const carouselData = [
  {
    image: "/assets/logo.png",
    desc: "Step into affordable fashion. Yolo's Collection brings you the latest trends without breaking the bank!",
  },
  {
    image: "/assets/disImg.png",
    desc: "Fresh drops weekly. Get exclusive discounts on premium outfits only at Yolo's.",
  },
  {
    image: "/assets/shoe.png",
    desc: "Find shoes that make a statement. Comfort, style, and price in perfect balance.",
  },
  {
    image: "/assets/hoddie2.png",
    desc: "Stay cozy, stay trendy. Discover hoodies made to impress and last.",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = carouselData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const goPrev = () => setCurrent(current === 0 ? length - 1 : current - 1);
  const goNext = () => setCurrent(current === length - 1 ? 0 : current + 1);

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-black">
      {carouselData.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col sm:flex-row items-center justify-center ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Left: Image */}
          <div className="w-full sm:w-1/2 flex items-center justify-center bg-black">
            <img
              src={item.image}
              alt="carousel item"
              className="max-h-[300px] object-contain drop-shadow-xl sm:scale-110 transition duration-500"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center text-center sm:text-left px-4 sm:px-16 py-10 z-20 bg-gradient-to-b sm:bg-gradient-to-r from-black/80 to-transparent">
            <h2 className="text-white text-xl sm:text-4xl font-extrabold mb-4 leading-snug drop-shadow">
              {item.desc}
            </h2>
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3 text-lg transition">
              Shop now <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Navigation controls */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center z-30 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={goPrev} className="p-4 bg-white/20 hover:bg-white/40 rounded-full">
            <ChevronLeft color="white" size={24} />
          </button>
          <button onClick={goNext} className="p-4 bg-white/20 hover:bg-white/40 rounded-full">
            <ChevronRight color="white" size={24} />
          </button>
        </div>

        {/* Dot progress bar */}
        <div className="w-full max-w-[300px] bg-white/30 rounded-full h-2 relative overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{
              width: `${((current + 1) / carouselData.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
