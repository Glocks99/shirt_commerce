import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
      <AlertTriangle size={80} className="text-red-600 mb-6" />

      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you're looking for doesn't exist or an unexpected error
        occurred.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
