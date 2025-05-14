import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";

const BookingCTA = () => {
  const { openModal } = useBookingModal();

  return (
    <section id="booking" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <motion.div 
          className="bg-white rounded-md shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Luxury cocktail bar setup" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-40 flex items-center justify-center p-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                    Book Your Rocky Mountain Event
                  </h2>
                  <p className="text-white max-w-md mx-auto font-body">
                    Fill out our booking form to reserve Mountain Mixology's premium cocktail catering services for your special occasion.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6 text-center">
                Ready to Elevate Your Event?
              </h3>
              
              <p className="text-text mb-8 text-center max-w-md">
                Our team of expert mixologists will craft unforgettable cocktail experiences for your guests in the beautiful Canadian Rockies. From intimate gatherings to grand celebrations, we've got you covered.
              </p>
              
              <div className="flex flex-col gap-4 w-full max-w-md">
                <Button
                  onClick={openModal}
                  className="bg-secondary hover:bg-opacity-90 text-white font-medium py-6 px-8 rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                >
                  Open Booking Form
                </Button>
                
                <p className="text-sm text-gray-500 font-body italic text-center">
                  We'll respond to your inquiry within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCTA;