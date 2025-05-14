import { motion } from "framer-motion";
import { 
  GlassWater, UserRound, Truck, Gift, HandHelping, Martini 
} from "lucide-react";

const services = [
  {
    icon: <GlassWater className="text-white text-2xl" />,
    title: "Martini Design",
    description: "Custom cocktail creation tailored to your event theme, preferences, and season."
  },
  {
    icon: <UserRound className="text-white text-2xl" />,
    title: "Expert Bartenders",
    description: "Professional, friendly mixologists who create stunning drinks while engaging your guests."
  },
  {
    icon: <Truck className="text-white text-2xl" />,
    title: "Full Bar Setup",
    description: "Complete bar equipment, premium glassware, ice, and all necessary supplies."
  },
  {
    icon: <Gift className="text-white text-2xl" />,
    title: "Custom Branding",
    description: "Personalized menus, branded cocktails, and custom garnishes for your event."
  },
  {
    icon: <HandHelping className="text-white text-2xl" />,
    title: "Event Consultation",
    description: "Expert guidance on quantities, styles, and pairings to enhance your event."
  },
  {
    icon: <Martini className="text-white text-2xl" />,
    title: "Mixology Workshops",
    description: "Interactive cocktail classes and demonstrations for a unique experience."
  }
];

const ServicesBanner = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 gold-underline">
            Our Services
          </h2>
          <p className="text-white max-w-3xl mx-auto font-body">
            From intimate gatherings to grand celebrations, we provide comprehensive cocktail catering tailored to your event.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 font-body">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBanner;
