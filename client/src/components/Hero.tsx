import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";

const Hero = () => {
  const { openModal } = useBookingModal();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Hero Background with Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/80 mix-blend-multiply"></div>
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Mountain landscape at dusk with cocktails" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Ambient Moving Gradient Overlay */}
      <div className="absolute inset-0 opacity-40 -z-10 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30 mix-blend-overlay"></div>
      
      {/* Glass Particles - Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full glass-dark opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 10 + Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">Premium Cocktail Service</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Mountain-Inspired <br />
              <span className="bg-gradient-to-r from-secondary to-amber-400 bg-clip-text text-transparent">Craft Cocktails</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-xl font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Elevate your Rocky Mountain events with expertly crafted cocktails and bespoke service designed specifically for the Canadian Rockies experience.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={openModal}
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-amber-500 hover:from-secondary/90 hover:to-amber-500/90 text-white px-8 rounded-full transition-all shadow-xl hover:shadow-secondary/20 hover:shadow-2xl border-0"
                >
                  Book Your Event
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 rounded-full transition-all"
                >
                  <a href="#cocktails">Explore Cocktails</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Display */}
            {/* <motion.div 
              className="grid grid-cols-3 gap-4 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "300+", label: "Events Catered" },
                { value: "50+", label: "Signature Drinks" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div> */}
          
          {/* Image or Visual Component */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative h-[500px] w-full">
              <motion.div 
                className="absolute right-0 top-0 w-80 h-80 rounded-2xl overflow-hidden shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500" 
                  alt="Craft cocktail being prepared" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="absolute left-0 bottom-0 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500" 
                  alt="Mountain landscape with cocktail" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="absolute left-20 top-20 w-72 h-72 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl"
                animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500" 
                  alt="Signature cocktail" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
          <a href="#about" className="text-white p-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            <ChevronDown size={20} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
