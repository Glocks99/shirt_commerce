import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type catType = {
  _id: string,
  name: string
}

const useGetCategories = () => {
  const [cat, setCat] = useState<catType[]>([]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/categories/");
      
      if(data){
        setCat(data)
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return [cat, setCat] as const;
};

export default useGetCategories;
