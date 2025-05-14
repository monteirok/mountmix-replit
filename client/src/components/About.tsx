import { motion } from "framer-motion";
import { GlassWater, UserRound, Leaf } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Bartender crafting a premium cocktail" 
              className="w-full h-auto rounded-md shadow-lg"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6 gold-underline left-underline">
              Mountain-Inspired Mixology
            </h2>
            <p className="text-text mb-6 font-body leading-relaxed">
              At Mountain Mixology, we transform ordinary events into extraordinary memories through the art of craft cocktails inspired by the Canadian Rockies. Our team of mixologists brings years of experience to create bespoke drinking experiences that capture the essence of mountain living.
            </p>
            <p className="text-text mb-8 font-body leading-relaxed">
              From intimate gatherings in Canmore to grand celebrations in Banff and beyond, we provide impeccable service with attention to every detail—from locally-sourced ingredients to premium spirits and professional presentation.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-4">
                  <GlassWater className="text-white" size={20} />
                </div>
                <span className="font-body font-medium">Bespoke Cocktails</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-4">
                  <UserRound className="text-white" size={20} />
                </div>
                <span className="font-body font-medium">Professional Service</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-4">
                  <Leaf className="text-white" size={20} />
                </div>
                <span className="font-body font-medium">Fresh Ingredients</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
