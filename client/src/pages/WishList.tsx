import { X, Heart } from "lucide-react";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const sampleWishlist: WishlistItem[] = [
  {
    id: 1,
    name: "Branded Shirt 1",
    price: 49.99,
    image: "/images/carousel/caro4.jpeg",
  },
  {
    id: 2,
    name: "Branded Shirt 2",
    price: 59.99,
    image: "/images/carousel/caro4.jpeg",
  },
];

const WishList = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Heart className="text-red-500" />
        Your Wishlist
      </h2>

      {sampleWishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-4">
          {sampleWishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <X />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
