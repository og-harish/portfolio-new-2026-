import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.2 }}
      onAnimationComplete={() => {
        document.body.style.overflow = "auto";
      }}
      className="fixed inset-0 z-[100] bg-bg-dark flex flex-col items-center justify-center p-6"
    >
      <div className="relative">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-8"
        >
           Harish <span className="text-brand-blue">V</span>
        </motion.div>
        
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan"
          />
        </div>
        
        <div className="mt-4 flex justify-between text-[10px] uppercase tracking-widest font-bold text-white/20">
          <span>Initializing Portfolio</span>
          <span>{percent}%</span>
        </div>
      </div>

      <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.4em] font-bold text-white/10">
        Premium Experience © 2026
      </div>
    </motion.div>
  );
}
