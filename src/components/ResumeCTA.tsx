import { motion } from "motion/react";
import { Download, Rocket, Linkedin } from "lucide-react";
import { PERSONAL_INFO } from "../constants";

export default function ResumeCTA({ onHireMeClick }: { onHireMeClick: () => void }) {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-white/5 border border-white/10 p-16 rounded-[3rem] relative overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto leading-tight text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 underline underline-offset-8">Build</span> Something Great Together
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <a 
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white text-black hover:bg-blue-400 font-bold rounded-2xl transition-all flex items-center gap-3 shadow-xl cursor-pointer"
            >
              <Download className="w-5 h-5" />
              View Resume
            </a>
            <button
              onClick={onHireMeClick}
              className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 font-bold rounded-2xl transition-all flex items-center gap-3 cursor-pointer"
            >
              <Rocket className="w-5 h-5" />
              Hire Me
            </button>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 font-bold rounded-2xl transition-all flex items-center gap-3"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
