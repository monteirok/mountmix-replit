import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Mountain Mixology transformed our Banff corporate retreat into an unforgettable experience. Their mountain-inspired cocktails perfectly complemented our alpine venue, and their professional service exceeded all expectations.",
    name: "Jennifer Morgan",
    title: "Corporate Event Planner",
    initials: "JM"
  },
  {
    quote: "Our mountain wedding was made even more special by the incredible cocktails! The Mountain Mixology team created signature drinks using local ingredients that perfectly captured the spirit of the Rockies. Everyone was impressed!",
    name: "David & Sarah",
    title: "Newlyweds from Calgary",
    initials: "DS"
  },
  {
    quote: "I've worked with many catering companies throughout Alberta, but Mountain Mixology stands out for their creativity and execution. Their locally-inspired drinks were the highlight of our Canmore charity gala.",
    name: "Alexandra Wong",
    title: "Event Director, Bow Valley Foundation",
    initials: "AW"
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  return (
    <motion.div 
      className="bg-gray-50 p-8 rounded-md shadow-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, starIndex) => (
          <Star key={starIndex} className="text-secondary" size={18} fill="currentColor" />
        ))}
      </div>
      <p className="italic text-text mb-6 font-body">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center">
        <div className="mr-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
            {testimonial.initials}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-primary">{testimonial.name}</h4>
          <p className="text-sm text-text font-body">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 gold-underline">
            Client Testimonials
          </h2>
          <p className="text-text max-w-3xl mx-auto font-body">
            Don't just take our word for it—hear what our clients have to say about our exceptional service.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
