
import { useState, useRef, useEffect } from "react";
import { Calendar, Car, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Car catalog data
const cars = [
  {
    id: 1,
    name: "Tesla Model S",
    category: "Electric",
    price: 150,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
  },
  {
    id: 2,
    name: "BMW 5 Series",
    category: "Luxury",
    price: 180,
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Mercedes GLC",
    category: "SUV",
    price: 200,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    transmission: "Automatic",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Porsche 911",
    category: "Sports",
    price: 250,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f335e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 2,
    transmission: "Automatic",
    rating: 5.0,
  },
  {
    id: 5,
    name: "Range Rover Sport",
    category: "SUV",
    price: 220,
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Audi A5",
    category: "Luxury",
    price: 170,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    transmission: "Automatic",
    rating: 4.7,
  }
];

const categories = ["All", "Luxury", "SUV", "Sports", "Electric"];

const CarGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCars, setFilteredCars] = useState(cars);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter(car => car.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <section id="cars" className="py-20 bg-accent">
      <div className="container px-4 mx-auto">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Car Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our extensive fleet of premium vehicles for your next journey.
            All cars come with unlimited mileage and comprehensive insurance.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-primary/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cars grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
                  ${car.price}/day
                </div>
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-white">
                  {car.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{car.name}</h3>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-1" />
                    <span>{car.transmission}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium text-sm">{car.rating}</span>
                  </div>
                  <Button size="sm" variant="outline" className="font-medium">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View more button */}
        <div className="text-center mt-10">
          <Button size="lg" variant="outline">
            View All Cars
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarGrid;
