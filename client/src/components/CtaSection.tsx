import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary">
      <motion.div 
        className="container mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
          Ready to Elevate Your Rocky Mountain Event?
        </h2>
        <p className="text-white max-w-2xl mx-auto mb-10 font-body">
          From intimate gatherings in Canmore to grand celebrations in Banff, our premium mountain-inspired cocktail catering will create an unforgettable Rocky Mountain experience for you and your guests.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            asChild
            size="lg"
            className="bg-secondary hover:bg-opacity-90 text-white font-medium rounded-sm shadow-lg hover:shadow-xl"
          >
            <a href="#booking">Book Your Event</a>
          </Button>
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 rounded-sm"
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
