import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
  "/images/carousel/caro1.jpeg",
  "/images/carousel/caro2.jpeg",
  "/images/carousel/caro3.jpeg",
  "/images/carousel/caro4.jpeg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [length]);

  const goPrev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goNext = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <div className="flex h-[calc(100vh-180px)] sm:h-[calc(100vh-100px)] overflow-hidden relative">
      {/* Slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        </div>
      ))}

      {/* Navigation buttons */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center z-20 px-4 sm:px-10">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={goPrev} className="p-3 bg-gray-600/70 rounded-full">
            <ChevronLeft color="white" />
          </button>
          <button onClick={goNext} className="p-3 bg-gray-600/70 rounded-full">
            <ChevronRight color="white" />
          </button>
        </div>

        {/* Dot Indicator */}
        <div className="w-full max-w-[300px] bg-white/60 rounded-full h-2 relative overflow-hidden">
          <div
            className="h-full bg-gray-800 rounded-full transition-all duration-500"
            style={{
              width: `${((current + 1) / images.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
