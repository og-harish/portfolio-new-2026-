import { motion } from "motion/react";
import { PROJECTS } from "../constants";
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4">Portfolio</div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">
              Featured <span className="text-white/40">Creations</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm">
            A selection of my best work, spanning from frontend designs to full-stack applications and AI experiments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-blue-900/40 to-black p-4 relative overflow-hidden">
                 <div className="absolute top-4 right-4 bg-blue-500 text-[10px] px-3 py-1 rounded-full font-bold z-20">LIVE</div>
                 <img
                   src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"}
                   alt={project.title}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors tracking-tight">{project.title}</h3>
                  <div className="flex gap-2">
                    <a href={project.github} className="text-gray-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                    <a href={project.link} className="text-gray-500 hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /></a>
                  </div>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[9px] font-bold uppercase tracking-wider text-blue-400/60">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
