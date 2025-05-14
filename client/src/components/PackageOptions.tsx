import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Alpine",
    tagline: "Perfect for intimate gatherings",
    price: 55,
    isPopular: false,
    features: [
      "3 mountain-inspired signature cocktails",
      "4-hour service",
      "1 professional bartender",
      "Rustic bar setup & quality glassware",
      "Up to 50 guests"
    ]
  },
  {
    name: "Summit",
    tagline: "Ideal for special celebrations",
    price: 85,
    isPopular: true,
    features: [
      "5 signature cocktails with local ingredients",
      "5-hour service",
      "2 professional bartenders",
      "Complete bar setup & premium glassware",
      "Custom-printed Rocky Mountain themed menus",
      "Up to 100 guests"
    ]
  },
  {
    name: "Pinnacle",
    tagline: "For the ultimate mountain experience",
    price: 125,
    isPopular: false,
    features: [
      "Unlimited custom Rocky Mountain cocktails",
      "6-hour service",
      "3+ professional bartenders",
      "Elite bar setup with crystal glassware",
      "Local sparkling wine toast included",
      "Interactive mountain mixology demonstration",
      "Unlimited guests"
    ]
  }
];

const PackageCard = ({ pkg, index }: { pkg: typeof packages[0]; index: number }) => {
  return (
    <motion.div 
      className={`package-card bg-white border border-gray-200 rounded-md overflow-hidden shadow-md hover:border-secondary transition-all duration-300 ${pkg.isPopular ? 'transform scale-105 z-10 shadow-xl' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`${pkg.isPopular ? 'bg-secondary' : 'bg-primary'} p-6 text-center relative overflow-hidden`}>
        {pkg.isPopular && (
          <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-xs font-body">
            POPULAR
          </div>
        )}
        <h3 className="font-display text-2xl font-bold text-white">{pkg.name}</h3>
        <p className={`${pkg.isPopular ? 'text-white' : 'text-gray-300'} font-body text-sm mt-1`}>
          {pkg.tagline}
        </p>
      </div>
      <div className="p-6">
        <div className="text-center mb-6">
          <span className="text-4xl font-display font-bold text-primary">${pkg.price}</span>
          <span className="text-text font-body">/person</span>
        </div>
        <ul className="space-y-3 mb-8">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="text-secondary flex-shrink-0 mt-1 mr-3" size={16} />
              <span className="text-text font-body">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          asChild
          className={`w-full ${pkg.isPopular ? 'bg-secondary' : 'bg-primary'} hover:bg-opacity-90 text-white font-medium rounded-sm`}
        >
          <a href="#booking">Select Package</a>
        </Button>
      </div>
    </motion.div>
  );
};

const PackageOptions = () => {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 gold-underline">
            Catering Packages
          </h2>
          <p className="text-text max-w-3xl mx-auto font-body">
            Choose from our Rocky Mountain-inspired packages, or let us create a custom solution for your special event in the Canadian Rockies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-text font-body italic mb-6">
            All packages include premium spirits, locally-sourced ingredients, and professional Rocky Mountain service. Minimum guest counts apply for venues in Canmore, Banff, and surrounding areas.
          </p>
          <Button 
            asChild
            variant="outline"
            className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-medium rounded-sm"
          >
            <a href="#contact">Request Custom Quote</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageOptions;
