import { ChartNoAxesCombined, Coins, Dot, Globe2, Loader, ShieldCheckIcon } from "lucide-react"
import CheckMark from "../components/CheckMark"
import useGetProduct from "../hooks/useGetProduct"
import { ProductCard } from "../components/ProductCard"

const Featuring = () => {

  const {products, loading} = useGetProduct({arg: "featured"})

  return (
    <div className="relative flex flex-col bg-black h-[200vh]">
      <div className="h-[50vh] flex items-center justify-end fixed top-0 w-full bg-cover" style={{backgroundImage: `url("/images/carousel/caro1.jpeg")`}}>
        <img src="assets/feat_logo.png" className="w-[50%] h-full object-cover object-center" alt="" />
      </div>

      {/* texts */}
      <div className="absolute flex-1 h-full top-[100px] w-full z-20">
        <div className="flex flex-col gap-2.5 px-[16px] sm:px-[40px]">
          <div className=" flex items-center gap-1">
            <CheckMark />
            <p className="text-white">Verified Collection </p>
          </div>

          <div className=" h-[100px] invert-100">
            <img src="/assets/feat1.png" className="h-full w-full object-contain object-left" alt="" />
          </div>

          <div className="flex items-center">
            <div className="flex gap-1 items-center">
              <ChartNoAxesCombined color="white" />
              <span className="text-gray-300">56% Growth</span>
            </div>
            <Dot color="white" />
            <div className="flex items-center">
              <Coins color="white" />
              <span className="text-gray-300">very affordable</span>
            </div>
            <Dot  color="white"/>
            <div className="flex items-center">
              <ShieldCheckIcon color="white" />
              <span className="text-gray-300">Durable Quality</span>
            </div>
          </div>
        </div>

        <div className="mt-[30px] bg-white h-full px-[16px] sm:px-[40px] py-3">
          <div className="flex items-center gap-1.5">
            <Globe2 />
            <p>visit website <span className="border border-white text-white cursor-pointer px-1.5 py-1 rounded-full">NHTG.com</span></p>
          </div>

          <div className="">
            <p className="text-5xl font-bold pt-[30px]">Products</p>

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
            products.map((product, index) => (
              <ProductCard tags={index} product={product} key={product._id} />
            ))
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featuring