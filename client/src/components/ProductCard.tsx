import { File, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../util/Money";
import { useAppContext } from "../context/AppContext";

type ProductType = {
  id: string;
  image: string;
  name: string;
  desc: string;
  priceCents: number;
  category: string[];
  flag: string;
};

export const ProductCard = ({
  product,
  tags,
}: {
  product: ProductType;
  tags: number;
}) => {
  const navigate = useNavigate();
  const { cart, setCart } = useAppContext();
  const [openTag, setOpenTag] = useState<number | null>(null);

  const toggleTag = () => {
    setOpenTag((prev) => (prev === tags ? null : tags));
  };

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { id: product.id, quantity: 1 }]);
    }
  };

  return (
    <div
      onClick={toggleTag}
      className="group relative flex flex-col min-h-[350px] sm:h-[350px] overflow-hidden rounded shadow hover:shadow-lg transition cursor-pointer"
    >
      {/* Product Tag */}
      <span className="absolute top-1.5 left-1.5 p-1 px-2.5 rounded bg-gray-500 text-white text-xs z-10">
        {product.flag}
      </span>

      {/* Action Panel */}
      <div
        className={`absolute left-0 transition-transform duration-500 ease-in-out ${
          openTag === tags ? "translate-y-[256px]" : "translate-y-[400px]"
        } border-b border-gray-700 bg-gray-200 w-full px-3.5 flex flex-col text-sm z-20`}
      >
        <button
          className="flex text-xs border-b border-gray-600/35 items-center gap-2 justify-end py-1.5"
          onClick={addToCart}
        >
          Add to cart <ShoppingCart size={16} />
        </button>

        <button
          className="flex text-xs border-b border-gray-600/35 items-center gap-2 justify-end py-1.5"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
        >
          View details <File size={16} />
        </button>

        <button
          className="flex text-xs items-center gap-2 justify-end py-1.5"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/wishlist");
          }}
        >
          Add to wishlist <Heart size={16} />
        </button>
      </div>

      {/* Product Image */}
      <div className="flex-1 z-0 overflow-hidden">
        <img
          src={product.image}
          className="h-full w-full object-cover"
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="h-fit p-3.5 bg-gray-200 z-20">
        <div className="flex items-center justify-between gap-1.5 font-semibold">
          <p>{product.name}</p>
          <p>¢{formatCurrency(product.priceCents)}</p>
        </div>
        <p className="text-xs text-gray-600">{product.desc}</p>
      </div>
    </div>
  );
};
