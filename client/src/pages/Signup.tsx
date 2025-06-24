import { Eye, EyeClosed, Key, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-white to-gray-500 z-50">
      <div className=" h-full flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-white to-gray-500 p-2.5 w-fit">
        <div
          onClick={() => navigate("/")}
          className="text-xl  text-center sm:text-3xl font-bold tracking-wide text-gray-800"
        >
          YOLO<span className="text-blue-600">'s</span> COLLECTION
        </div>

        <p className="text-center font-light">Create a new account</p>

        <form action="" className="flex flex-col gap-1.5">
          <label htmlFor="">Full name</label>
          <div className="flex gap-1">
            <div className="flex gap-1 bg-white border border-gray-800/20 p-1 rounded">
              <User />
              <input
                type="text"
                className="w-full outline-0 "
                placeholder="Enter first name"
              />
            </div>
            <div className="flex gap-1 bg-white border border-gray-800/20 p-1 rounded">
              <User />
              <input
                type="text"
                className="w-full outline-0"
                placeholder="Enter last name"
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
            />
          </div>

          <label htmlFor="">Password</label>
          <div className="flex gap-1 bg-white border border-gray-800/20 p-1 rounded">
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

          <label htmlFor="">Confirm password</label>
          <div className="flex items-center bg-white gap-1 border border-gray-800/20 p-1 rounded">
            <Key />
            <input
              type={see ? "text" : "password"}
              className="w-full outline-0"
              placeholder="confirm password"
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
