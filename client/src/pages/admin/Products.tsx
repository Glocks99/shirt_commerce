import { Edit, Loader, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import useGetCategories from "../../hooks/useGetCategories";
import useGetProduct from "../../hooks/useGetProduct";

type ProductFormData = {
  name: string;
  priceCents: number;
  brand?: string;
  category: string;
  image: FileList;
  images?: FileList;
  isFeatured?: boolean;
  description: string;
  richDescription?: string;
  discount: boolean;
  discountPercentage: number;
};

const schema = yup.object({
  name: yup.string().required("product name is required"),
  priceCents: yup.number().min(1, "Price must be positive").required("priceCents is required"),
  category: yup.string().required("category is required"),
  brand: yup.string().notRequired(),
  image: yup
    .mixed<FileList>()
    .test("required", "product image is required", (value) => value && value.length > 0),
  images: yup
    .mixed<FileList>()
    .notRequired()
    .nullable(),
  isFeatured: yup.boolean().notRequired(),
  description: yup.string().required("description is required"),
  richDescription: yup.string().notRequired().nullable(),
  discount: yup.boolean().notRequired(),
  discountPercentage: yup.number().notRequired()
});


const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<ProductFormData>({ resolver: yupResolver(schema) as any });

  const onSubmit = async (data: ProductFormData) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("priceCents", data.priceCents.toString());
  formData.append("category", data.category);
  formData.append("description", data.description);

  if (data.brand) formData.append("brand", data.brand);
  if (data.isFeatured !== undefined) formData.append("isFeatured", data.isFeatured.toString());
  if (data.discount !== undefined) formData.append("discount", data.discount.toString());
  if (data.richDescription) formData.append("richDescription", data.richDescription);

  // Required single image
  if (data.image && data.image.length > 0) {
    formData.append("image", data.image[0]); // ⬅️ correct name matching multer field "image"
  }

  // Optional multiple images
  if (data.images && data.images.length > 0) {
    Array.from(data.images).forEach((file) => formData.append("images", file)); // ⬅️ correct name matching "images"
  }

  try {
    const res = await axios.post("http://localhost:3000/api/admin/addProduct", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Product added successfully!");
    console.log(res.data);
    setShowAddProduct(false); // close modal on success
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
  }
};


const onError = (errors: any) => {
  Object.values(errors).forEach((error: any) => {
    toast.error(error.message);
  });
};

const handleDelete = async(id: string) => {
  try {
    const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/${id}`)
    if(data.message){
      toast.success(data.message)
    }
  } catch (error: any) {
    toast.error(error.message)
  }
}

const [cat] = useGetCategories()
const {products, loading} = useGetProduct({arg: ""})
const [isDiscount, setIsDiscount] = useState(false)



  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="font-bold text-xl mb-6">Products Management</h2>

      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex flex-col items-center justify-center w-full sm:w-40 h-24 bg-gray-100 rounded hover:bg-gray-200 transition"
        >
          <Plus className="text-green-600 mb-2" size={28} />
          <p className="text-sm font-medium">Add New Product</p>
        </button>

        <button
          onClick={() => setShowAddCategory(true)}
          className="flex flex-col items-center justify-center w-full sm:w-40 h-24 bg-gray-100 rounded hover:bg-gray-200 transition"
        >
          <Plus className="text-blue-600 mb-2" size={28} />
          <p className="text-sm font-medium">Add New Category</p>
        </button>
      </div>

      {/* Nice Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <Loader className=" duration-300 animate-spin" />
          <p>Loading products...</p>
        </div>
      ): (
        <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-700 font-semibold">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {loading ? (
            <tr>
              <td className="py-4 px-4 text-center text-gray-500" colSpan={6}>
                <div className="flex flex-col items-center justify-center">
                <Loader className=" duration-300 animate-spin" />
                <p>Loading products...</p>
              </div>
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td className="py-4 px-4 text-center text-gray-500" colSpan={6}>
                No products found.
              </td>
            </tr>
          ) : (
            products.map((item, i) => (
              <tr key={item._id || i}>
                <td className="py-3 px-4">{i + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">GHC {(item.priceCents / 100).toFixed(2)}</td>
                <td className="py-3 px-4">{item.category?.name || "N/A"}</td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:underline mr-2"><Edit /></button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline"><Trash2 /></button>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
      )}
      

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 overflow-auto flex items-center justify-center bg-black/50 backdrop-blur z-50 px-4">
          <div className="bg-white p-2 rounded shadow max-w-md w-full relative">
            <button
              onClick={() => setShowAddProduct(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-4">Add New Product</h3>

            <form className="space-y-1" onSubmit={handleSubmit(onSubmit, onError)}>
              <div>
                <label className="text-xs font-bold">Product Name</label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
       
              </div>

              <div>
                <label className="text-xs font-bold">Price</label>
                <input
                  {...register("priceCents")}
                  type="number"
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
     
              </div>

              <div>
                <label className="text-xs font-bold">Category</label>
                <select
                  {...register("category")}
                  className="w-full border rounded h-10"
                >
                  <option value="">Select Category</option>
                  {cat.map((item,i) => (
                    <option key={i}>{item.name}</option>
                  ))}
                </select>

              </div>

              <div>
                <label className="text-xs font-bold">Image</label>
                <input
                  {...register("image")}
                  type="file"
                  name="image"
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
             
              </div>

              <div>
                <label className="text-xs font-bold">Brand</label>
                <input
                  {...register("brand")}
                  type="text"
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
             
              </div>
              
              <div className="flex gap-1 items-center">
                  <div className="w-full">
                  <label htmlFor="" className="text-xs font-bold">Discount</label>
                  <select className="w-full border border-black/25 py-1" name="" id="" onChange={() => setIsDiscount(!isDiscount)}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>

              </div>
                  {isDiscount && (
                      <div>
                <label className="text-xs font-bold">Discount Percentage</label>
                <input
                  {...register("discountPercentage")}
                  type="number"
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
                </div>
                  )}
              </div>
              
              <div>
                <label className="text-xs font-bold">Images <span className="text-xs bg-green-500 text-white px-1 rounded">optional</span></label>
                <input
                  {...register("images")}
                  type="file"
                  multiple
                  name="images"
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold">Featured Product</label>
                <select {...register("isFeatured")} className="w-full h-10 border rounded">
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold">Description</label>
                <input
                  {...register("description")}
                  type="text"
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
              
              </div>

              <div>
                <label className="text-xs font-bold">Rich Description <span className="text-xs bg-green-500 text-white px-1 rounded">optional</span></label>
                <textarea
                  {...register("richDescription")}
                  className="w-full border rounded p-1 h-20 focus:outline-none"
                  placeholder="Write detailed description..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur z-50 px-4">
          <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
            <button
              onClick={() => setShowAddCategory(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Category</h3>
            <form className="space-y-3">
              <div>
                <label className="text-xs font-bold">Category Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
