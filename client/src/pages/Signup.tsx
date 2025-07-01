import { Eye, EyeClosed, Key, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

type yupSchema = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  document.title = "Signup | YOLO's Collection";

  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    contact: yup
      .string()
      .matches(/^\d{10}$/, "Contact must be 10 digits")
      .required("Contact is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  })

  const {
    register,
    handleSubmit,
  } = useForm<yupSchema>({
    resolver: yupResolver(schema),
  });

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      toast.error(error.message)
    })
  }

  const navigate = useNavigate();
  const [see, setSee] = useState(false);

  const signupHandler = async(data: Omit<yupSchema, "confirmPassword">) => {
    setLoading(true)
    try {
      const res =  await  axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          contact: data.contact,
          password: data.password,
        },
        {withCredentials: true})

        if(res.data.success) {
          navigate("/login");

          setTimeout(() => {
            toast.success("Account created successfully! Please login.");
          }, 1000);
        }

    } catch (error) {
      console.error("Signup error:", error);
    }
    finally{
      setLoading(false)
    }
  }
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-white to-gray-500 z-50">
      {loading && <Loader />}
      <div className=" h-full flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-white to-gray-500 p-2.5 w-fit">
        <div
          onClick={() => navigate("/")}
          className="text-xl  text-center sm:text-3xl font-bold tracking-wide text-gray-800"
        >
          YOLO<span className="text-blue-600">'s</span> COLLECTION
        </div>

        <p className="text-center font-light">Create a new account</p>

        <form onSubmit={handleSubmit(signupHandler, onError)} className="flex flex-col gap-1.5">
          <label htmlFor="">Full name</label>
          <div className="flex gap-1">
            <div className="flex gap-1 bg-white border border-gray-800/20 p-1 rounded">
              <User />
              <input
                type="text"
                className="w-full outline-0 "
                placeholder="Enter first name"
                {...register("firstName", {required: "First name is required"})}
              />
            </div>
            <div className="flex gap-1 bg-white border border-gray-800/20 p-1 rounded">
              <User />
              <input
                type="text"
                className="w-full outline-0"
                placeholder="Enter last name"
                {...register("lastName", {required: "Last name is required"})}
              />
            </div>
          </div>

          <label htmlFor="">Email</label>
          <div className="flex gap-1 bg-white border border-gray-800/20 p-1 rounded">
            <Mail />{" "}
            <input
              type="email"
              className="w-full outline-0"
              placeholder="Email"
              {...register("email", {required: "Email is required"})}
            />
          </div>

          <label htmlFor="">Contact</label>
          <div className="flex gap-1 bg-white border border-gray-800/20 p-1 rounded">
            <div className="flex">
              <Phone /> +233
            </div>{" "}
            <input
              type="text"
              className="w-full outline-0"
              placeholder="Enter contact"
              {...register("contact", {required: "Contact is required"})}
            />
          </div>

          <label htmlFor="">Password</label>
          <div className="flex gap-1 bg-white border border-gray-800/20 p-1 rounded">
            <Key />
            <input
              type={see ? "text" : "password"}
              className="w-full outline-0"
              placeholder="Enter password"
              {...register("password", {required: "Password is required"})}
            />

            <div className="">
              {see ? (
                <Eye onClick={() => setSee(!see)} />
              ) : (
                <EyeClosed onClick={() => setSee(!see)} />
              )}
            </div>
          </div>

          <label htmlFor="">Confirm password</label>
          <div className="flex items-center bg-white gap-1 border border-gray-800/20 p-1 rounded">
            <Key />
            <input
              type={see ? "text" : "password"}
              className="w-full outline-0"
              placeholder="confirm password"
              {...register("confirmPassword", {required: "Confirm Password is required"})}
            />
          </div>

          <button className="bg-green-500 text-white py-2 rounded mt-2.5 cursor-pointer">
            Sign up
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account ? Then{" "}
          <Link to={"/login"} className="text-blue-600 underline">
            Login here !
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
