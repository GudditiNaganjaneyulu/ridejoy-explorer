
import { motion } from "framer-motion";
import { Car, Calendar, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: <Car className="h-5 w-5" />,
    title: "Premium Vehicles",
    description: "Our fleet consists of the latest luxury models, maintained to the highest standards."
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: "Flexible Booking",
    description: "Easy booking process with flexible pickup and return options to suit your schedule."
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "24/7 Support",
    description: "Our customer service team is available around the clock to assist with any questions."
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Comprehensive Insurance",
    description: "Drive with peace of mind knowing you're covered with our comprehensive insurance."
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury car on a coastal road" 
                className="rounded-2xl shadow-lg w-full object-cover h-[400px] sm:h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg hidden sm:block">
                <div className="text-sm font-medium">Premium Experience</div>
                <div className="text-xs text-muted-foreground mt-1">Since 2010</div>
              </div>
            </div>
          </motion.div>
          
          {/* Content column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <div className="max-w-lg">
              <h2 className="text-3xl font-semibold mb-4">About Ridejoy</h2>
              <p className="text-muted-foreground mb-6">
                At Ridejoy, we believe that every journey should be extraordinary. 
                Founded in 2010, we've been providing premium car rental services 
                with a focus on exceptional customer experience and high-quality vehicles.
              </p>
              
              <p className="text-muted-foreground mb-8">
                Our mission is to make luxury accessible, offering you the chance to 
                experience the thrill of driving premium cars without the commitment of ownership.
                Whether it's a business trip, vacation, or special occasion, we've got the perfect vehicle for you.
              </p>
              
              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                    key={feature.title} 
                    className="flex"
                  >
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
