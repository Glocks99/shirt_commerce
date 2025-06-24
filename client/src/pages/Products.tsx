import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../util/Money";

type ProductType = {
  id: string;
  image: string;
  name: string;
  desc: string;
  priceCents: number;
  category: string[];
  flag: string;
};

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/products/${id}`);
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
      <div className="text-center py-20">
        <p className="text-lg">Loading product...</p>
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
          <p className="text-gray-600 mb-4">{product.desc}</p>
          <div className="text-sm my-2.5">
            <span>Quantity: </span>
            <input
              type="number"
              value={1}
              className="border border-black/30 rounded w-[50px] pl-1"
            />
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
