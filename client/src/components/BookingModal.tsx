import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type InsertBooking } from "@shared/schema";
import { insertBookingSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Extended schema with client-side validation
  const extendedBookingSchema = insertBookingSchema.extend({
    guestCount: z.number().min(10, "Minimum guest count is 10"),
    email: z.string().email("Please provide a valid email address"),
    phone: z.string().min(10, "Please provide a valid phone number"),
  });

  // React Hook Form with Zod validation
  const form = useForm<z.infer<typeof extendedBookingSchema>>({
    resolver: zodResolver(extendedBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      eventDate: "",
      eventTime: "",
      guestCount: 10,
      message: "",
    },
  });

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Received",
        description: "We'll be in touch within 24 hours to confirm your event.",
        duration: 5000,
      });
      form.reset();
      setIsSubmitting(false);
      // Close the modal after successful submission
      onOpenChange(false);
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["/api/booking"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem submitting your booking request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      setIsSubmitting(false);
      console.error("Booking error:", error);
    },
  });

  const onSubmit = (data: InsertBooking) => {
    setIsSubmitting(true);
    bookingMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-sm" />
      <DialogContent 
        className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 rounded-xl glass border-0 shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
        aria-label="Booking Form"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full overflow-hidden rounded-l-xl">
            <motion.img 
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
              alt="Luxury cocktail bar setup" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-accent/50 backdrop-blur-sm flex items-center justify-center p-8">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                    Book Your Mountain Event
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-secondary to-amber-400 mx-auto my-4 rounded-full"></div>
                  <p className="text-white/90 max-w-md mx-auto font-body">
                    Fill out the form to reserve our premium cocktail catering services for your special occasion in the Canadian Rockies.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-8 md:p-12 bg-white/95 dark:bg-gray-900/90 rounded-r-xl">
            <Form {...form}>
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-foreground font-medium text-sm">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm" 
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-foreground font-medium text-sm">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm" 
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-foreground font-medium text-sm">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm" 
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-foreground font-medium text-sm">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm" 
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-foreground font-medium text-sm">Event Date</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="date"
                            className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm" 
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eventTime"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-foreground font-medium text-sm">Start Time</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="time"
                            className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm" 
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-foreground font-medium text-sm">Event Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm">
                            <SelectValue placeholder="Select Event Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg border-0 shadow-lg">
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="birthday">Birthday Celebration</SelectItem>
                          <SelectItem value="holiday">Holiday Party</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="packageType"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-foreground font-medium text-sm">Package Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm">
                            <SelectValue placeholder="Select Package" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg border-0 shadow-lg">
                          <SelectItem value="essential">Alpine</SelectItem>
                          <SelectItem value="premium">Summit</SelectItem>
                          <SelectItem value="luxe">Pinnacle</SelectItem>
                          <SelectItem value="custom">Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-foreground font-medium text-sm">Estimated Guest Count</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          min="10"
                          className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm" 
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 10)}
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-foreground font-medium text-sm">Additional Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className="w-full p-3 rounded-lg border-0 bg-gray-50/80 dark:bg-gray-800/50 focus:ring-2 ring-secondary/50 shadow-sm resize-none" 
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-secondary to-amber-500 hover:from-secondary/90 hover:to-amber-500/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-muted-foreground font-body text-center"
                >
                  We'll respond to your inquiry within 24 hours.
                </motion.p>
              </motion.form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;