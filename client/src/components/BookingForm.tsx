import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      eventDate: "",
      eventTime: "",
      eventType: "wedding",
      packageType: "premium",
      guestCount: 50,
      message: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      return apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted",
        description: "We'll respond to your inquiry within 24 hours.",
        variant: "default",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertBooking) => {
    setIsSubmitting(true);
    bookingMutation.mutate(data);
  };

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
                    Book Your Event
                  </h2>
                  <p className="text-white max-w-md mx-auto font-body">
                    Fill out the form to reserve our premium cocktail catering services for your special occasion.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text font-body font-medium">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text font-body font-medium">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text font-body font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text font-body font-medium">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text font-body font-medium">Event Date</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="date"
                              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="eventTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text font-body font-medium">Start Time</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="time"
                              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text font-body font-medium">Event Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary">
                              <SelectValue placeholder="Select Event Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="birthday">Birthday Celebration</SelectItem>
                            <SelectItem value="holiday">Holiday Party</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="packageType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text font-body font-medium">Package Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary">
                              <SelectValue placeholder="Select Package" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="essential">Essential</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="luxe">Luxe</SelectItem>
                            <SelectItem value="custom">Custom Package</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text font-body font-medium">Estimated Guest Count</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number"
                            min="10"
                            className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary" 
                            onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 10)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text font-body font-medium">Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary resize-none" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                  
                  <p className="text-sm text-gray-500 font-body italic text-center">
                    We'll respond to your inquiry within 24 hours.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
