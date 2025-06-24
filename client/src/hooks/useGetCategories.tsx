import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategories = () => {
  const [cat, setCat] = useState<string[] | []>([]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/products");
      const newCat: string[] = [];
      if (data) {
        data.map((item: any) => newCat.push(...item.category));
        setCat([...new Set(newCat)].sort());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return [cat, setCat] as const;
};

export default useGetCategories;
