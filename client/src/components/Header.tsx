import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingModal } from "@/hooks/use-booking-modal";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useBookingModal();

  // Handle scrolling effects for the header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-white/90 dark:bg-primary/95 backdrop-blur-md shadow-lg"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="focus:outline-none"
          aria-label="Scroll to top"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-display font-bold tracking-tight"
          >
            <span
              className={`${isScrolled ? "text-primary dark:text-white" : "text-white"}`}
            >
              Mountain
            </span>
            <span className="bg-gradient-to-r from-secondary to-amber-400 bg-clip-text text-transparent">
              Mixology
            </span>
          </motion.div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {/* {["Cocktails", "Services", "Packages", "Contact"].map((item, index) => ( */}
          {["About", "Cocktails", "Services", "Contact"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.querySelector(
                  `#${item.toLowerCase()}`,
                );
                if (targetElement) {
                  window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.querySelector(
                  `#${item.toLowerCase()}`,
                );
                if (targetElement) {
                  window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
              className={`navbar-link relative px-[.6rem] lg:px-4 py-2 ${isScrolled ? "text-foreground/90 hover:text-foreground" : "text-white hover:text-white/90"} transition-colors duration-300 rounded-full hover:bg-secondary/10`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {item}
            </motion.a>
          ))}

          <motion.button
            onClick={openModal}
            className="ml-2 bg-gradient-to-r from-secondary to-amber-500 text-white font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Now
          </motion.button>
        </nav>

        {/* Mobile menu button */}
        <motion.button
          type="button"
          className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"} p-2 rounded-full hover:bg-secondary/10 focus:outline-none`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bg-white/95 dark:bg-primary/95 backdrop-blur-md py-6 px-6 md:hidden overflow-hidden shadow-lg border-t border-gray-100 dark:border-gray-800"
          >
            <motion.div
              className="flex flex-col space-y-5"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {[
                { name: "About", icon: "✨" },
                { name: "Services", icon: "🍸" },
                { name: "Cocktails", icon: "🌿" },
                { name: "Contact", icon: "📩" },
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  className="flex items-center space-x-3 text-foreground/90 hover:text-foreground py-2 px-3 rounded-lg hover:bg-secondary/5 transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    const targetElement = document.querySelector(
                      `#${item.name.toLowerCase()}`,
                    );
                    if (targetElement) {
                      closeMobileMenu();
                      window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth",
                      });
                    }
                  }}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 },
                }}
                className="pt-2"
              >
                <motion.button
                  onClick={() => {
                    closeMobileMenu();
                    openModal();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-secondary to-amber-500 text-white font-medium py-3 px-6 rounded-lg shadow-md"
                >
                  Book Your Event
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
