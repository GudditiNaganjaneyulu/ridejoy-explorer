
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarGrid from "@/components/CarGrid";
import BookingForm from "@/components/BookingForm";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { motion, useAnimation } from "framer-motion";

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CarGrid />
        <BookingForm />
        <AboutSection />
        <Testimonials />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
