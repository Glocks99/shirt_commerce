import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { ProductType } from "./Home";
import axios from "axios";
import useGetCategories from "../hooks/useGetCategories";

export const categories = ["All", "Caps", "Shoes", "Shirts"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [products, setProducts] = useState<ProductType[]>([]);

  const [cat] = useGetCategories();

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

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="px-4 sm:px-10 py-10">
      {/* Heading */}
      <h1 className="font-bold text-4xl mb-6">Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {cat.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-1.5 border rounded-full ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white border-gray-300 text-gray-800"
            } hover:bg-gray-200 transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {paginated.map((product, index) => (
          <ProductCard tags={index} product={product} key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 text-sm rounded-full ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shop;
