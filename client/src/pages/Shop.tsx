import { ProductCard } from "../components/ProductCard";
import { useState } from "react";
import useGetCategories from "../hooks/useGetCategories";
import useGetProduct from "../hooks/useGetProduct";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [categories] = useGetCategories();
  const {products, loading} = useGetProduct({arg: ""});

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) =>
          p.category.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="px-4 sm:px-10 py-10">
      {/* Heading */}
      <h1 className="font-bold text-4xl mb-6">Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => {
            setSelectedCategory("All");
            setCurrentPage(1);
          }}
          className={`px-4 py-1.5 border rounded-full ${
            selectedCategory === "All"
              ? "bg-black text-white"
              : "bg-white border-gray-300 text-gray-800"
          } hover:bg-gray-200 transition`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => {
              setSelectedCategory(cat.name);
              setCurrentPage(1);
            }}
            className={`px-4 py-1.5 border rounded-full ${
              selectedCategory === cat.name
                ? "bg-black text-white"
                : "bg-white border-gray-300 text-gray-800"
            } hover:bg-gray-200 transition`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product,i) => (
            <ProductCard tags={i} product={product} key={i} />
          ))
        ) : (
          <div className="flex flex-col items-center gap-2.5 justify-center w-full col-span-4">
            <img src="/assets/void.svg" className="h-[200px]" alt="" />
            <p className="text-gray-600 text-xl text-center">No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Shop;
