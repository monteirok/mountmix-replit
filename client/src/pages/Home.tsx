import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ParallaxBanner from "@/components/ParallaxBanner";
import SignatureCocktails from "@/components/SignatureCocktails";
import ServicesBanner from "@/components/ServicesBanner";
import Gallery from "@/components/Gallery";
import BookingCTA from "@/components/BookingCTA";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Mountain Mixology</title>
        <meta name="description" content="Elevate your gatherings with expertly crafted cocktails and bespoke service from Elixir, the premier cocktail catering service for exceptional events." />
      </Helmet>
      
      <Header />
      
      <main>
        <Hero />
        <About />
        <ParallaxBanner />
        <ServicesBanner />
        <SignatureCocktails />
        {/* <PackageOptions /> */}
        <Gallery />
        {/* <Testimonials /> */}
        <BookingCTA />
        <ContactSection />
        <FaqSection />
        <CtaSection />
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
