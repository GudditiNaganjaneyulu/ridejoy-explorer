
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The booking process was seamless, and the car was in immaculate condition. Definitely using Ridejoy for my next trip!",
    author: "Sarah Johnson",
    position: "Marketing Executive",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    quote: "Exceptional service from start to finish. The team went above and beyond to accommodate my last-minute changes.",
    author: "Michael Chen",
    position: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    quote: "As someone who appreciates luxury cars, I was impressed by the quality and condition of their fleet. Highly recommended!",
    author: "David Rodriguez",
    position: "Architect",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    quote: "The attention to detail and customer service is unmatched. My go-to car rental service whenever I'm traveling for business.",
    author: "Emily Parker",
    position: "Financial Analyst",
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 500);
    resetInterval();
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 500);
    resetInterval();
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }, 8000);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoSlide();
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-primary text-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">What Our Customers Say</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with Ridejoy.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white/30">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-white/70">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-3">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetInterval();
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-6 bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
