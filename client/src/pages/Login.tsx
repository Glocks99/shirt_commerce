import { Eye, EyeClosed, Key, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);

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

        <form action="" className="flex flex-col gap-1.5">
          <label htmlFor="">Email</label>
          <div className="flex gap-1 border bg-white border-gray-800/20 p-1 rounded">
            <Mail />{" "}
            <input
              type="text"
              className="w-full outline-0"
              placeholder="Email"
            />
          </div>

          <label htmlFor="">Password</label>
          <div className="flex gap-1 border bg-white border-gray-800/20 p-1 rounded">
            <Key />
            <input
              type={see ? "text" : "password"}
              className="w-full outline-0"
              placeholder="Enter password"
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

          <button className="bg-green-500 text-white py-2 rounded mt-2.5 cursor-pointer">
            Login
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
