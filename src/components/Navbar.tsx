
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          PremiumRides
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            Home
          </Link>
          <a href="/#about" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            About
          </a>
          <a href="/#cars" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            Cars
          </a>
          <a href="/#booking" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            Book Now
          </a>
          <a href="/#testimonials" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            Testimonials
          </a>
          <Link to="/bookings" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            My Bookings
          </Link>
        </nav>
        
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className={cn(
              "text-foreground",
              isScrolled ? "hover:bg-muted" : "hover:bg-white/10"
            )}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
          >
            <div className="container mx-auto px-4 py-5 flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>
                PremiumRides
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-4 p-6">
              <Link 
                to="/" 
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="/#about" 
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="/#cars" 
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cars
              </a>
              <a 
                href="/#booking" 
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </a>
              <a 
                href="/#testimonials" 
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <Link 
                to="/bookings" 
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
