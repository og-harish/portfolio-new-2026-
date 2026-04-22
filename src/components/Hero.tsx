import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../constants";

const ROTATING_TEXTS = [
  "Data Analytics Engineer",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "AI Problem Solver"
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen pt-32 pb-20 relative flex items-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 inline-block">
            Available for Opportunities
          </div>

          <h1 className="text-6xl lg:text-7xl font-display font-extrabold mb-4 tracking-tighter leading-[1.1]">
            Harish <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">V</span>
          </h1>

          <div className="h-12 mb-6">
            <AnimatePresence mode="wait">
              <motion.h2
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl lg:text-3xl text-gray-400 font-bold"
              >
                {ROTATING_TEXTS[index]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="text-gray-400 text-lg lg:text-xl max-w-md mb-8 leading-relaxed">
            {PERSONAL_INFO.summary}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2"
            >
              View Projects
              <ExternalLink className="w-5 h-5" />
            </a>
            <button className="border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-white/5 transition-all flex items-center gap-2">
              Resume
              <Download className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden glass border-2 border-white/10 p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-purple/20" />
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
              alt="Developer Illustration"
              className="w-full h-full object-cover rounded-2xl opacity-80"
              referrerPolicy="no-referrer"
            />
            {/* Overlay tech elements */}
            <div className="absolute top-10 right-10 glass p-4 rounded-2xl animate-float">
               <div className="text-brand-cyan text-sm font-mono tracking-tighter">const dev = "Harish"</div>
            </div>
            <div className="absolute bottom-10 left-10 glass p-4 rounded-2xl animate-float delay-700">
               <div className="text-brand-purple text-sm font-mono tracking-tighter">buildSuccess: true</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer flex flex-col items-center gap-2"
        onClick={() => document.getElementById('about')?.scrollIntoView()}
      >
        <span className="text-white/40 text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown className="text-white/40 w-5 h-5" />
      </motion.div>
    </section>
  );
}
