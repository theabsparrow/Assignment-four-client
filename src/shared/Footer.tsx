import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* 🔹 Brand Section */}
          <div>
            <div>
              <img className="w-36 lg:w-56 " src={logo} alt="logo" />
            </div>
            <p className="mt-2 text-gray-400">
              Your trusted car rental service for a seamless journey.
            </p>
          </div>

          {/* 🔹 Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 🔹 Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-3 flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-white transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* 🔹 Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Lambo Car. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
