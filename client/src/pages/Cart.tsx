import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import useGetProduct from "../hooks/useGetProduct";
import { formatCurrency } from "../util/Money";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useLocalStorage("cart", []);
  const products = useGetProduct();

  // Get full product info for items in cart
  const cartItems = cart
    .map((item: any) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const handleQuantityChange = (id: string, amount: number) => {
    setCart((prev: any) =>
      prev.map((item: any) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCart((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  const handleReset = () => setCart([]);

  const subtotal = cartItems.reduce(
    (acc, item: any) => acc + item.quantity * item.priceCents,
    0
  );
  const deliveryFee = 1500; // assuming 15.00 GHS
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-[16px] sm:px-[40px]">
        <div className="h-[200px] mt-2.5">
          <img
            src={"/assets/emptyCart.svg"}
            className="h-full w-full object-contain"
            alt="Empty cart"
          />
        </div>
        <p className="font-bold text-[#234] text-3xl text-center mt-2">
          Nothing can be found in cart!
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="flex text-center mt-5 gap-2.5 cursor-pointer bg-black text-white p-2 rounded"
        >
          <ArrowLeft /> Return to shop
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-10 py-6">
      <h1 className="text-5xl font-bold mb-6">Cart</h1>

      <div className="flex flex-col-reverse sm:flex-row gap-6">
        {/* Cart Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black text-white h-12">
              <tr>
                <th className="p-2 text-sm">Product</th>
                <th className="p-2 text-sm">Price (¢)</th>
                <th className="p-2 text-sm text-center">Quantity</th>
                <th className="p-2 text-sm">Sub Total (¢)</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item: any, index: number) => (
                <tr key={index} className="border-b border-b-gray-800/30">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleRemove(item.id)}>
                        <X className="text-red-600" />
                      </button>
                      <div className="w-[50px] h-[50px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  </td>

                  <td className="p-2 text-sm">
                    {formatCurrency(item.priceCents)}
                  </td>

                  <td className="p-2 text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 py-1 bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-2 text-sm">
                    {formatCurrency(item.quantity * item.priceCents)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={4}>
                  <button
                    onClick={handleReset}
                    className="py-2 mt-2 bg-red-600 text-white text-sm px-3.5 rounded cursor-pointer"
                  >
                    Reset cart
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Cart Totals Box */}
        <div className="w-full sm:w-[300px] h-fit border border-gray-800/30 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>

          <div className="space-y-2 text-sm">
            <p className="flex items-center justify-between">
              SubTotal <span>¢{formatCurrency(subtotal)}</span>
            </p>
            <p className="flex items-center justify-between">
              Delivery <span>¢{formatCurrency(deliveryFee)}</span>
            </p>
            <p className="flex items-center justify-between font-bold">
              Total <span>¢{formatCurrency(total)}</span>
            </p>
          </div>

          <button className="bg-black text-white skew-2 px-2.5 mt-4 text-sm py-1.5 cursor-pointer w-full">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
