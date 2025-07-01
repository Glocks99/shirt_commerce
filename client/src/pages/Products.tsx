import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../util/Money";
import type { ProductType } from "../components/ProductCard";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
      if (data) {
        setProduct(data);
      }
    } catch (error) {
      console.log("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px]">
          <Loader className=" duration-300 animate-spin" />
          <p>Loading products...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link
          to="/shop"
          className="inline-flex items-center px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/shop"
        className="inline-flex items-center text-sm text-gray-600 hover:underline mb-4"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
          <div className="text-sm my-2.5">
            <span>Quantity: </span>
            <input
              type="number"
              value={1}
              className="border border-black/30 rounded h-[30px] w-[50px] pl-1"
            />
            <button className="bg-green-500 text-white rounded h-[30px] ml-2.5 px-1 cursor-pointer">update</button>
          </div>
          <div className="flex flex-col gap-1 border border-black/25 p-1.5 rounded h-[200px]">
            <p className="text-sm text-gray-500">Description</p>
            {product.richDescription === "" && (
              <div className=" border-t border-t-black/25 w-full flex-1">
                  <p className="text-red-600 text-sm p-2">No description available for this product.</p>
              </div>
            )}
          </div>
          <p className="text-xl font-semibold mb-4">
            GHC {formatCurrency(product.priceCents)}
          </p>

          <button className="inline-flex items-center px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
