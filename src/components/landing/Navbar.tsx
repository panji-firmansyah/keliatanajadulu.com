import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    const form = document.getElementById("waitlist-form-top");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => form.querySelector("input")?.focus(), 500);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-sm" aria-label="Keliatan Aja Dulu — Kembali ke atas">
            <span className="font-display font-bold text-xl md:text-2xl text-secondary tracking-tight">
              <span className="relative inline-block">
                Keliatan
                <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/40 -z-10 rounded-sm transform -rotate-1 group-hover:bg-primary transition-colors duration-300"></span>
              </span>{" "}
              Aja Dulu
            </span>
          </a>
        </motion.div>

        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                onClick={scrollToWaitlist}
                className="bg-primary hover:bg-primary-hover text-secondary font-semibold rounded-full px-6 py-2 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                Gabung Waitlist
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
