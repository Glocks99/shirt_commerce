import { Eye, EyeClosed, Key, Loader, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

type yupSchema = {
  email: string;
  password: string;
};

const Login = () => {
  document.title = "Login | YOLO's Collection";
  const navigate = useNavigate();
  const [see, setSee] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {register, handleSubmit} = useForm<yupSchema>({
    resolver: yupResolver(schema)});

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      toast.error(error)
    })
  }

  const {setUser, isLoading, setIsLoading} = useAppContext()

  const handleLogin = async (data: yupSchema) => {
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, data, {
          withCredentials: true
        }
      )

      if(res.status === 200) {
        if (res.data.user.isAdmin) {
          toast.success("Admin login successful");
          setUser({
            isLoggedIn: true,
            userData: res.data.user});
          localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data in localStorage
          navigate("/admin/dashboard");
        } else {
        toast.success("Login successful");
        setUser({
          isLoggedIn: true,
          userData: res.data.user});
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data in localStorage
        // Store user data in localStorage or context if needed
        navigate("/");
        }
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data as { message: string };
        toast.error(err.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    finally{
      setIsLoading(false)
    }
  }


  return (
    <div className="fixed flex items-center justify-center inset-0 bg-gradient-to-b from-white to-gray-500 bg-white z-50">
      <div className="h-full flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-white to-gray-500 p-2.5 w-fit">
        <div
          onClick={() => navigate("/")}
          className="text-xl  text-center sm:text-3xl font-bold tracking-wide text-gray-800"
        >
          YOLO<span className="text-blue-600">'s</span> COLLECTION
        </div>

        <p className="text-center font-light">Log into your account</p>

        <form onSubmit={handleSubmit(handleLogin, onError)} className="flex flex-col gap-1.5">
          <label htmlFor="">Email</label>
          <div className="flex gap-1 border bg-white border-gray-800/20 p-1 rounded">
            <Mail />{" "}
            <input
              type="text"
              className="w-full outline-0"
              placeholder="Email"
              {...register("email")}
            />
          </div>

          <label htmlFor="">Password</label>
          <div className="flex gap-1 border bg-white border-gray-800/20 p-1 rounded">
            <Key />
            <input
              type={see ? "text" : "password"}
              className="w-full outline-0"
              placeholder="Enter password"
              {...register("password")}
            />

            <div className="">
              {see ? (
                <Eye onClick={() => setSee(!see)} />
              ) : (
                <EyeClosed onClick={() => setSee(!see)} />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-1.5 text-sm">
            <div className="flex items-center gap-1">
              <input type="checkbox" id="rm" />

              <label htmlFor="rm">Remember me</label>
            </div>

            <p className="text-blue-600 cursor-pointer">Forgot Password ?</p>
          </div>

          <button className="bg-green-500 flex items-center gap-1.5 justify-center text-white py-2 rounded mt-2.5 cursor-pointer">
            Login
            {isLoading && <span><Loader className="duration-300 animate-spin" /></span>}
          </button>
        </form>

        <p className="text-center text-sm">
          Dont have an account ? Then{" "}
          <Link to={"/signup"} className="text-blue-600 underline">
            Signup here !
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
