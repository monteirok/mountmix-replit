import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Cocktail } from "@shared/schema";

const CocktailCard = ({ cocktail, index }: { cocktail: Cocktail; index: number }) => {
  return (
    <motion.div 
      className="cocktail-card bg-white rounded-md overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <img 
        src={cocktail.imageUrl} 
        alt={`${cocktail.name} Cocktail`} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-primary mb-2">{cocktail.name}</h3>
        <p className="text-text mb-4 font-body text-sm">{cocktail.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-secondary font-body font-medium">{cocktail.baseSpirit}</span>
          <Star className="text-secondary" size={18} fill="currentColor" />
        </div>
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = () => (
  <>
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-white rounded-md overflow-hidden shadow-md">
        <Skeleton className="w-full h-64" />
        <div className="p-6">
          <Skeleton className="h-7 w-3/4 mb-2" />
          <Skeleton className="h-20 w-full mb-4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </>
);

const SignatureCocktails = () => {
  const { data: cocktails, isLoading } = useQuery({
    queryKey: ['/api/cocktails'],
  });

  return (
    <section id="cocktails" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 gold-underline">
            Signature Cocktails
          </h2>
          <p className="text-text max-w-3xl mx-auto font-body">
            Our mountain-inspired cocktails blend premium spirits, locally-foraged ingredients, and innovative techniques to create unforgettable Rocky Mountain taste experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            cocktails?.map((cocktail: Cocktail, index: number) => (
              <CocktailCard key={cocktail.id} cocktail={cocktail} index={index} />
            ))
          )}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-text mb-6 font-body italic">
            Our mountain-inspired cocktail menu can be customized for your Canmore or Banff event. Let us create a bespoke Rocky Mountain experience that matches your theme and preferences.
          </p>
          <Button 
            asChild
            className="bg-secondary hover:bg-opacity-90 text-white font-medium rounded-sm shadow-lg hover:shadow-xl"
          >
            <a href="#booking">Customize Your Menu</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureCocktails;
