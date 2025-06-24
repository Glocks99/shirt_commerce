import { ShoppingCart } from "lucide-react";
import Carousel from "../components/Carousel";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

export type ProductType = {
  id: string;
  image: string;
  name: string;
  desc: string;
  priceCents: number;
  category: string[];
  flag: string;
};

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const bestSellers = products.filter((product) => product.flag === "Best");

  const getProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/products");
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Carousel />

      {/* New Arrivals */}
      <div className="px-[16px] sm:px-[40px]">
        <h1 className="mt-4 font-bold text-3xl">New Arrivals</h1>

        <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {products.map((product, index) => (
            <ProductCard tags={index} product={product} key={product.id} />
          ))}
        </div>
      </div>

      {/* Discount Section */}
      <div className="px-4 relative sm:px-10 py-6 mt-24 border rounded-lg bg-white shadow-sm">
        <div className="w-full sm:w-1/2 flex flex-col gap-4 z-10">
          <h1 className="text-2xl font-bold text-gray-800">On Discount</h1>
          <p className="text-sm text-gray-600 line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus, accusamus iusto. Pariatur culpa saepe, quae totam nisi
            quam enim earum cupiditate rem. Explicabo alias et autem adipisci
            suscipit, perferendis quisquam.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 w-fit bg-gray-800 text-white rounded hover:bg-gray-700 transition">
            Add to cart <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute h-full w-full top-0 right-0">
          <img
            src="/assets/disImg.png"
            className="h-full w-full object-contain  object-right"
            alt=""
          />
        </div>
      </div>

      {/* Best Sellers */}
      <div className="px-[16px] sm:px-[40px]">
        <h1 className="mt-4 font-bold text-3xl">Best Sellers</h1>

        <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {bestSellers.map((product, index) => (
            <ProductCard tags={index} product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
