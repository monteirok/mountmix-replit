import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Target } from "lucide-react";
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
import { insertContactSchema, type InsertContactMessage } from "@shared/schema";

const ContactIcon = ({ icon, title, content, link }: { 
  icon: JSX.Element; 
  title: string; 
  content: string;
  link?: string;
}) => {
  return (
    <div className="bg-gray-50 p-8 rounded-md shadow-md flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold text-primary mb-3">{title}</h3>
      <p className="text-text font-body mb-4">Our team is available to answer your questions</p>
      {link ? (
        <a href={link} className="text-secondary font-body font-medium hover:underline">
          {content}
        </a>
      ) : (
        <address className="not-italic text-secondary font-body font-medium">
          {content.split("<br>").map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </address>
      )}
    </div>
  );
};

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you shortly.",
        variant: "default",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 gold-underline">
            Get In Touch
          </h2>
          <p className="text-text max-w-3xl mx-auto font-body">
            Questions about our Rocky Mountain cocktail services? Contact us directly or submit an inquiry below.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ContactIcon 
              icon={<Phone className="text-white text-xl" />} 
              title="Visit us on Instagram" 
              content="@mountain.mixology"
              link="https://www.instagram.com/mountain.mixology/"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactIcon 
              icon={<Mail className="text-white text-xl" />} 
              title="Email Us" 
              content="reservations@mountainmixology.ca"
              link="mailto:reservations@mountainmixology.ca"
            />
          </motion.div>
          
        </div>
        
        <motion.div 
          className="mt-16 bg-gray-50 rounded-md shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-display font-bold text-primary mb-6 gold-underline left-underline">
                Send Us a Message
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text font-body font-medium">Full Name</FormLabel>
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text font-body font-medium">Subject</FormLabel>
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text font-body font-medium">Your Message</FormLabel>
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
                    className="bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="relative min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Craft cocktail preparation" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
