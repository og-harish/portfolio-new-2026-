import { motion } from "motion/react";
import { EXPERIENCE, ACHIEVEMENTS } from "../constants";
import { Calendar, Building2, Award, ExternalLink } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* Experience Column */}
        <div>
          <div className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4">Journey</div>
          <h2 className="text-4xl font-bold mb-12 tracking-tighter">Experience</h2>
          
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
                
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Latest Experience</h3>
                
                <div className="border-l-2 border-blue-500 pl-6">
                  <h4 className="text-xl font-bold mb-1 leading-tight">{exp.role}</h4>
                  <p className="text-sm text-gray-400 mb-4">{exp.company} • {exp.duration}</p>
                  
                  <ul className="space-y-2">
                    {exp.highlights.map((point, i) => (
                      <li key={i} className="text-xs text-gray-500 leading-tight">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Column */}
        <div>
          <div className="text-brand-purple font-bold tracking-widest uppercase text-sm mb-4">Recognition</div>
          <h2 className="text-4xl font-bold mb-12 tracking-tighter">Certifications <span className="text-white/40">&</span> Wins</h2>
          
          <div className="grid gap-4">
            {ACHIEVEMENTS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-2xl flex items-start gap-5 hover:bg-white/5 transition-colors border-l-4 border-l-brand-purple"
              >
                <div className="p-3 rounded-xl bg-brand-purple/10 text-brand-purple">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1 leading-tight">{item.title}</h4>
                  <p className="text-sm text-white/40 mb-2">{item.event}</p>
                  <p className="text-xs text-brand-purple/60 font-medium italic">{item.topic}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
