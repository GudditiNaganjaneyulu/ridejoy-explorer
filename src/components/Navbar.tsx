
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { name: "Cars", href: "#cars" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="relative z-10 text-xl font-semibold tracking-tight"
        >
          Ridejoy
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-primary/80 hover:text-primary transition-soft"
            >
              {item.name}
            </a>
          ))}
          <Button>
            Book Now <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-10 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-white/95 transition-transform duration-300 ease-in-out transform md:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="container h-full flex flex-col justify-center items-center">
            <nav className="flex flex-col space-y-6 text-center">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xl font-medium text-primary hover:text-secondary transition-soft"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              ))}
              <Button className="mt-4" onClick={closeMenu}>
                Book Now <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
