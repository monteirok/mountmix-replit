import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import { BookingModalProvider } from "./hooks/use-booking-modal";
import BookingModal from "./components/BookingModal";
import { useBookingModal } from "./hooks/use-booking-modal";

function Router() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Account for fixed header
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ModalContainer() {
  const { isOpen, closeModal } = useBookingModal();
  return <BookingModal open={isOpen} onOpenChange={closeModal} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BookingModalProvider>
          <Toaster />
          <Router />
          <ModalContainer />
        </BookingModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
