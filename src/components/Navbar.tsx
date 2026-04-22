import { motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-4 glass border-b shadow-2xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">H</div>
          <span className="font-bold text-xl tracking-tight italic font-display">Harish V</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${link.name === 'Home' ? 'text-white' : 'hover:text-white'} transition-colors`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-black px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-400 transition-all shadow-sm"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full glass border-b p-6 flex flex-col space-y-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-white/80 hover:text-brand-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="w-full py-3 bg-brand-blue text-center text-white rounded-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Hire Me
          </a>
        </motion.div>
      )}
    </nav>
  );
}
