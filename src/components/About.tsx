import { motion } from "motion/react";
import { PERSONAL_INFO, EDUCATION } from "../constants";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl p-10"
        >
          <div className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 inline-block">Discovery</div>
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 tracking-[1.1] leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Me</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
            {PERSONAL_INFO.about}
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">🎯</div>
              <div>
                <div className="text-sm font-bold text-white tracking-tighter leading-none">Consistent</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Coding Practice</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">🚀</div>
              <div>
                <div className="text-sm font-bold text-white tracking-tighter leading-none">Self-Taught</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Developer</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h3 className="text-2xl font-bold tracking-tight mb-8">Educational Path</h3>
          <div className="relative border-l-2 border-white/5 pl-8 space-y-12">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.period}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-brand-blue border-4 border-bg-dark" />
                
                <div className="text-brand-blue font-mono text-sm mb-1">{edu.period}</div>
                <h4 className="text-xl font-bold leading-none mb-2">{edu.degree}</h4>
                <div className="text-white/60 font-medium">{edu.institution}</div>
                <div className="text-white/30 text-xs mt-1 uppercase tracking-widest">{edu.detail}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
