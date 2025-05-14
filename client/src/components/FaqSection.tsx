import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 4-6 weeks in advance for smaller events and 2-3 months for larger events or peak season dates (May-September and December). For last-minute bookings, please contact us directly to check availability."
  },
  {
    question: "Is there a minimum guest count?",
    answer: "Yes, our standard packages have a minimum of 25 guests. For smaller gatherings, we offer custom solutions with adjusted pricing. Please contact us for a tailored quote for intimate events."
  },
  {
    question: "Can you create custom cocktails for my event?",
    answer: "Absolutely! Custom cocktail creation is one of our specialties. We can design signature drinks based on your event theme, color scheme, flavor preferences, or personal story. This service is included in our Premium and Luxe packages, and available as an add-on for the Essential package."
  },
  {
    question: "Do you provide non-alcoholic options?",
    answer: "Yes, we offer sophisticated non-alcoholic cocktails (mocktails) that receive the same attention to detail as our alcoholic beverages. We believe all guests should enjoy a premium drink experience regardless of their preferences."
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Canmore, Banff, and the Bow Valley region. For events beyond this region, such as Calgary or other parts of Alberta, additional travel fees may apply. We also cater select destination events in other parts of the Canadian Rockies—please inquire for more information."
  }
];

const FaqItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-md shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button 
        className="w-full flex justify-between items-center p-6 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-display font-bold text-primary">{faq.question}</span>
        <ChevronDown 
          className={`text-secondary transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
          size={20}
        />
      </button>
      <div 
        className={`px-6 pb-6 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}
      >
        <p className="text-text font-body">
          {faq.answer}
        </p>
      </div>
    </motion.div>
  );
};

const FaqSection = () => {
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
            Frequently Asked Questions
          </h2>
          <p className="text-text max-w-3xl mx-auto font-body">
            Find answers to common questions about our craft cocktail catering services.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
