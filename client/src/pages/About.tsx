import { Info } from "lucide-react";

const About = () => {
  return (
    <div className="px-4 sm:px-10 py-16 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col-reverse sm:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2 text-blue-600">
            <Info size={28} />
            <h2 className="text-3xl sm:text-4xl font-bold">About Us</h2>
          </div>

          <p className="text-lg text-gray-600">
            Welcome to our platform! We are passionate about providing
            high-quality products and outstanding customer service. Whether
            you're shopping, browsing, or just learning more about us, we aim to
            give you the best experience possible.
          </p>

          <p className="text-gray-600">
            Our team is made up of designers, developers, and support
            specialists dedicated to ensuring that every part of your
            interaction with us is smooth, friendly, and inspiring.
          </p>

          <p className="text-gray-600">
            Thank you for visiting us. We're glad you're here and we look
            forward to serving you!
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="/images/carousel/caro4.jpeg"
            alt="About us"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
