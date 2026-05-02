import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const LOADING_STEPS = [
  "Initializing Kernel...",
  "Caching Data Models...",
  "Synthesizing Neural Networks...",
  "Parsing Portfolio Data...",
  "Ready for Deployment"
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const totalDuration = 2500; // 2.5 seconds
    const intervalTime = totalDuration / 100;
    
    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Update step message based on percentage
    const stepPerPercent = 100 / LOADING_STEPS.length;
    const currentStep = Math.min(Math.floor(percent / stepPerPercent), LOADING_STEPS.length - 1);
    setStepIndex(currentStep);
  }, [percent]);

  return (
    <div className="fixed inset-0 z-[110] bg-[#030303] flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-sm px-6">
        
        {/* Core Logo Animation */}
        <div className="relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter text-white relative z-10"
          >
            H<span className="text-brand-blue drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">V</span>
          </motion.div>
          
          {/* Pulsing ring */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -m-10 border border-brand-blue/30 rounded-full blur-xl"
          />
        </div>

        {/* Progress System */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-end mb-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={stepIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-blue"
              >
                {LOADING_STEPS[stepIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="text-[14px] font-mono font-bold text-white/40">{percent}%</span>
          </div>

          {/* New Progress Bar Design */}
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              style={{ width: `${percent}%` }}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan shadow-[0_0_10px_rgba(37,99,235,0.5)]"
            />
            {/* Glossy overlay */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-[45deg]"
            />
          </div>
        </div>

        {/* Technical Data Stream (Ambient) */}
        <div className="absolute left-0 right-0 h-40 bottom-0 pointer-events-none opacity-10 overflow-hidden">
          <div className="text-[8px] font-mono text-white/50 leading-tight columns-4 gap-4 flex flex-col">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              >
                {Math.random().toString(16).substring(2, 50)}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Meta */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-20">
        <div className="text-[10px] uppercase font-bold tracking-[0.5em] text-white">System Environment</div>
        <div className="flex gap-4">
          <div className="text-[8px] font-mono text-white/50">CPU: STABLE</div>
          <div className="text-[8px] font-mono text-white/50">MEM: OPTIMIZED</div>
          <div className="text-[8px] font-mono text-white/50">UI: HARISH.V_PRO</div>
        </div>
      </div>

      {/* Scanning Line Effect */}
      <motion.div 
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent pointer-events-none z-20"
      />
    </div>
  );
}
