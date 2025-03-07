
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    model: "Tesla Model S",
    price: "$150/day"
  },
  {
    url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    model: "BMW i8",
    price: "$200/day"
  },
  {
    url: "https://images.unsplash.com/photo-1592853598064-23f282d2f1b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    model: "Porsche 911",
    price: "$250/day"
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoSlide();
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    resetInterval();
  };

  const currentImage = images[currentIndex];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image.url})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16 md:pb-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            Premium Cars, Exceptional Experience
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
            Discover the freedom of the open road with our luxury car rental service. 
            Premium vehicles for your every need.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Button size="lg" className="md:w-auto">
              Browse Cars <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 md:w-auto">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Model Info */}
      <div className="absolute bottom-8 left-0 right-0 md:bottom-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-white border border-white/20">
              <p className="text-sm font-medium">{currentImage.model}</p>
              <p className="text-xs opacity-80">{currentImage.price}</p>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-white w-8" 
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  onClick={() => handleIndicatorClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
