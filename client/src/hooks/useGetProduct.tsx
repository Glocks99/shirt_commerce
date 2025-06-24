import { useEffect, useState } from "react";
import type { ProductType } from "../pages/Home";
import axios from "axios";

export default function useGetProduct() {
  const [products, setProducts] = useState<ProductType[]>([]);

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

  return products;
}
