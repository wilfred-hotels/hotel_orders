import Link from "next/link";
import AdvertMarquee from "./AdvertMarquee";

const Footer = () => {
  return (
    <footer className="bg-orange-50 border-t border-orange-200 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          {/* Left: Copyright */}
          <div className="text-sm sm:text-base text-center md:text-left">
            © {new Date().getFullYear()} FoodHub — Fresh & Delicious — Fast
            Delivery
          </div>

          {/* Right: Quick links or social */}
          <div className="flex gap-4 text-sm sm:text-base">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link
              href="/menu"
              className="hover:text-orange-600 transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/orders"
              className="hover:text-orange-600 transition-colors"
            >
              Orders
            </Link>
          </div>
        </div>

        {/* Marquee for promos / messages */}
        <AdvertMarquee
          message1="📞 Need help? Contact our support team anytime."
          message2="📧 Subscribe to our newsletter for updates and offers."
        />
      </div>
    </footer>
  );
};

export default Footer;
