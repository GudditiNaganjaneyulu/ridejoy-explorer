
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ridejoy</h3>
            <p className="text-white/80 mb-6 text-sm">
              Premium car rental service offering exceptional vehicles and customer experience since 2010.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#cars" className="text-white/80 hover:text-white transition-colors">
                  Our Fleet
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Booking Process
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-white/70 mt-0.5" />
                <span className="text-white/80">
                  123 Luxury Drive<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-white/70" />
                <a href="tel:+14155550123" className="text-white/80 hover:text-white transition-colors">
                  (415) 555-0123
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-white/70" />
                <a href="mailto:info@ridejoy.com" className="text-white/80 hover:text-white transition-colors">
                  info@ridejoy.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-white/80 mb-4 text-sm">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded-l-lg py-2 px-3 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 w-full"
              />
              <button 
                type="submit" 
                className="bg-white text-primary px-4 rounded-r-lg font-medium text-sm hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/20 text-sm text-white/70 flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Ridejoy. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="mr-4 hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
