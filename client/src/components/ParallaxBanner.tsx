import { useParallax } from "@/lib/parallax";
import { motion } from "framer-motion";

const ParallaxBanner = () => {
  const { ref } = useParallax<HTMLDivElement>();

  return (
    <section 
      ref={ref}
      className="parallax h-[50vh] flex items-center justify-center" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1591243315780-978fd00ff9db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800')"
      }}
    >
      <div className="bg-primary bg-opacity-50 absolute inset-0"></div>
      <motion.div 
        className="container mx-auto px-6 relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
          "From mountain peaks to perfect peaks of foam"
        </h2>
        <p className="text-white text-xl font-body font-light italic">
          — Crafting the spirit of the Rockies in every glass
        </p>
      </motion.div>
    </section>
  );
};

export default ParallaxBanner;
