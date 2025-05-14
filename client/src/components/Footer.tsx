import { Link } from "wouter";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { FaPinterestP } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-block text-2xl font-display font-bold tracking-wide mb-6">
              Mountain<span className="text-secondary">Mixology</span>
            </Link>
            <p className="text-gray-300 font-body mb-6">
              Premium craft cocktail catering for exceptional events in Canmore, Alberta and throughout the Canadian Rockies.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/mountain.mixology" target="_blank" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                <Facebook size={20} />
              </a>
              {/* <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                <FaPinterestP size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                <Twitter size={20} />
              </a> */}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 font-body">
              {/* <li><a href="#home" className="text-gray-300 hover:text-secondary transition-colors duration-300">Home</a></li> */}
              <li><a href="#about" className="text-gray-300 hover:text-secondary transition-colors duration-300">About Us</a></li>
              <li><a href="#cocktails" className="text-gray-300 hover:text-secondary transition-colors duration-300">Signature Cocktails</a></li>
              <li><a href="#packages" className="text-gray-300 hover:text-secondary transition-colors duration-300">Packages</a></li>
              <li><a href="#booking" className="text-gray-300 hover:text-secondary transition-colors duration-300">Book Now</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-secondary transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Contact Info</h3>
            <ul className="space-y-3 font-body">
              <li className="flex items-start">
                <span className="text-secondary mr-3">📍</span>
                {/* <span className="text-gray-300">824 Main Street<br />Canmore, AB T1W 2B7</span> */}
                <span className="text-gray-300">Canmore, AB, Canada</span>
              </li>
              {/* <li className="flex items-start">
                <span className="text-secondary mr-3">📞</span>
                <span className="text-gray-300">+1 (403) 555-8765</span>
              </li> */}
              <li className="flex items-start">
                <span className="text-secondary mr-3">✉️</span>
                <span className="text-gray-300">reservations@mountainmixology.ca</span>
              </li>
            </ul>
          </div>
          
          <div className="ml-10">
            <h3 className="text-xl font-display font-bold mb-6">Business Hours</h3>
            <ul className="space-y-3 font-body">
              <li className="text-gray-300">Monday - Friday: 10am - 6pm</li>
              <li className="text-gray-300">Saturday: By appointment</li>
              <li className="text-gray-300">Sunday: Closed</li>
            </ul>
            <p className="mt-6 text-gray-300 text-sm">
              Event services available 7 days a week, based on availability.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-body mb-4 md:mb-0">
            &copy; {currentYear} Mountain Mixology. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-body">
            <a href="#" className="text-gray-400 hover:text-secondary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-secondary transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
