const Footer = () => {
  return (
    <div className="relative bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 sm:grid-cols-2 gap-10">
        {/* Logo & About */}
        <div>
          <div className="h-[50px] w-[50px] flex items-center gap-2 text-white text-xl font-bold mb-3">
            <p>Yolo's Collection</p>
          </div>
          <p className="text-sm leading-relaxed">
            Your ultimate hub for quality cloths, designers, and fashion waears
            from all around Ghana 🇬🇭.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Community
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter/X
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Email Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-sm text-center py-4 px-4">
        © {new Date().getFullYear()} Yolo's collections. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
