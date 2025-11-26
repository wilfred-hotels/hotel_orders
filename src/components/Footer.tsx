import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="text-[#FF5722]">Food</span>Express
            </h3>
            <p className="text-gray-400 text-sm">
              Your favorite food delivered fast to your doorstep. Order from the
              best restaurants in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-[#FF5722] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-gray-400 hover:text-[#FF5722] transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF5722] transition-colors"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF5722] transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF5722] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF5722] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF5722] transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF5722] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-[#FF5722] transition-colors"
              >
                <FacebookIcon className="fab fa-facebook-f text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#FF5722] transition-colors"
              >
                <TwitterIcon className="fab fa-twitter text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#FF5722] transition-colors"
              >
                <InstagramIcon className="fab fa-instagram text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#FF5722] transition-colors"
              >
           
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 FoodExpress. All rights reserved. Made with ❤️ in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
