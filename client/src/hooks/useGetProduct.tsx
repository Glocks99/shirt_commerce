import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { ProductType } from "../components/ProductCard";


export default function useGetProduct({arg}: {arg: string}) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  let pathStore = ""

  const getProduct = async () => {
    try {
    if(arg === "featured"){
      pathStore = "http://localhost:3000/api/products/featured/"
    }
    else{
      pathStore ="http://localhost:3000/api/products/"
    }
      const { data } = await axios.get(pathStore);
        setProducts(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return {products, loading};
}
