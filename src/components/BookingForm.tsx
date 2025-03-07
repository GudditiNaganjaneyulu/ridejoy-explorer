
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";

const locations = [
  "New York City Airport",
  "Los Angeles Airport",
  "Chicago Downtown",
  "San Francisco Airport",
  "Miami Beach",
  "Las Vegas Strip",
];

const BookingForm = () => {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [sameLocation, setSameLocation] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupDate || !returnDate || !pickupLocation || (!sameLocation && !returnLocation)) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Booking request submitted successfully!", {
      description: "We'll get back to you shortly with available cars.",
    });
  };

  return (
    <section id="booking" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-border/50"
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">Ready to Hit the Road?</h2>
              <p className="text-muted-foreground">Book your premium ride in just a few clicks</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? format(pickupDate, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Return Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                        disabled={(date) => date < (pickupDate || new Date())}
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Pickup Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Location</label>
                  <Select value={pickupLocation} onValueChange={setPickupLocation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select location">
                        {pickupLocation ? (
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{pickupLocation}</span>
                          </div>
                        ) : (
                          "Select location"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Return Location */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Return Location</label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setSameLocation(!sameLocation)}
                        className="text-xs flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <div className={`w-4 h-4 rounded-sm border mr-1 flex items-center justify-center ${sameLocation ? 'bg-primary border-primary' : 'border-input'}`}>
                          {sameLocation && <Check className="h-3 w-3 text-white" />}
                        </div>
                        Same as pickup
                      </button>
                    </div>
                  </div>
                  
                  {sameLocation ? (
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left opacity-70 cursor-not-allowed"
                      disabled
                    >
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      {pickupLocation || "Same as pickup location"}
                    </Button>
                  ) : (
                    <Select 
                      value={returnLocation} 
                      onValueChange={setReturnLocation}
                      disabled={sameLocation}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select location">
                          {returnLocation ? (
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{returnLocation}</span>
                            </div>
                          ) : (
                            "Select location"
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full md:w-auto md:px-8" size="lg">
                Find Available Cars
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
