import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react"; // Import necessary icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-gray-950 transition-colors duration-300 py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            {/* Replace with your actual logo image */}
            <img
              src="/logo1.jpg"
              alt="RUDRAKSH GREEN VISTA Solutions"
              className="h-24 w-auto mb-6"
            />
            <p className="text-4xl font-bold text-white mb-6">RUDRAKSH GREEN VISTA</p> {/* Placeholder for logo text */}

            <p className="text-gray-400 leading-relaxed mb-6 max-w-lg text-lg">
              RUDRAKSH GREEN VISTA Solutions Infra is a trusted real estate leader with 25+ years of unparalleled experience. We've proudly served over 5,000 clients and facilitated sales exceeding 1,000,000 sq. ft. of prime property. Your property journey, our expert guidance.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="inline-flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="inline-flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="inline-flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="inline-flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <a
                  href="tel:+917771832778"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  +91 7771832778
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <a
                  href="tel:+918815265430"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  +91 8815265430
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <a href="mailto:info@RUDRAKSH GREEN VISTAsolutions.com" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  info@RUDRAKSH GREEN VISTAsolutions.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <address className="not-italic text-gray-400">
                  Shop No. 8, Kolar Plaza, Near <br />D Mart, Kolar Road, Bhopal
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} RUDRAKSH GREEN VISTA Solutions Real Estate. All rights Reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.facebook.com/RUDRAKSH GREEN VISTASolutions.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/RUDRAKSH GREEN VISTASolutions.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/RUDRAKSH GREEN VISTASolutionsInfra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/RUDRAKSH GREEN VISTASolutionsRealEstate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
