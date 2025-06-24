import { Mail, User, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 py-10 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Contact Us
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <User className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Your full name"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="text-gray-500 mr-2" size={20} />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <div className="flex items-start border rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <MessageCircle className="text-gray-500 mt-1 mr-2" size={20} />
              <textarea
                placeholder="Type your message here..."
                rows={5}
                className="w-full outline-none bg-transparent resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
