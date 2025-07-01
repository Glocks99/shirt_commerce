import { Loader} from "lucide-react";
import Carousel from "../components/Carousel";
import { ProductCard } from "../components/ProductCard";
import Feat_Banner from "./Feat_Banner";
import useGetProduct from "../hooks/useGetProduct";


const Home = () => {

  const {products, loading} = useGetProduct({arg: ""})

  const filteredProd = products.filter(item => !item.isFeatured )

  return (
    <div>
      <Carousel />

      {/* New Arrivals */}
      <div className="px-[16px] sm:px-[40px]">
        <h1 className="mt-4 font-bold text-3xl">New Arrivals</h1>

        <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center col-span-4">
            <Loader className=" duration-100 animate-spin" />
            <p>Loading products...</p>
          </div>
          ): products.length === 0 ? (
            <div className="flex flex-col items-center gap-2.5 justify-center w-full col-span-4">
            <img src="/assets/void.svg" className="h-[200px]" alt="" />
            <p className="text-gray-600 text-xl text-center">No products found...</p>
          </div>
          ): (
            filteredProd.map((product, index) => (
              <ProductCard tags={index} product={product} key={product._id} />
            ))
          )}
        </div>
      </div>

      <Feat_Banner />
    </div>
  );
};

export default Home;
