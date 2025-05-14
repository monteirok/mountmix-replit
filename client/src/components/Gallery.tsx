import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1574096079513-d8259312b785?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Luxury bar setup at a wedding",
    size: "standard"
  },
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Professional bartender crafting cocktails",
    size: "standard"
  },
  {
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Elegant cocktail party in progress",
    size: "standard"
  },
  {
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Artistic cocktail with elegant presentation",
    size: "standard"
  },
  {
    src: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
    alt: "Luxury outdoor bar setup",
    size: "wide"
  },
  {
    src: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
    alt: "Elegant cocktail service at a gala",
    size: "wide"
  }
];

const GalleryImage = ({ image, index }: { image: typeof galleryImages[0]; index: number }) => {
  return (
    <motion.div 
      className={`overflow-hidden rounded-md shadow-md ${
        image.size === 'wide' ? 'lg:col-span-2' : ''
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <img 
        src={image.src} 
        alt={image.alt} 
        className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110" 
      />
    </motion.div>
  );
};

const Gallery = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 gold-underline">
            Event Gallery
          </h2>
          <p className="text-text max-w-3xl mx-auto font-body">
            A glimpse of our exceptional service and stunning cocktail creations at recent events.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <GalleryImage key={index} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
