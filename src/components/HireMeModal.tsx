import { motion, AnimatePresence } from "motion/react";
import { X, Send, Mail, Linkedin, Globe, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { PERSONAL_INFO } from "../constants";

type HireMeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function HireMeModal({ isOpen, onClose }: HireMeModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", project: "", message: "" });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden glass"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-5 h-full">
              {/* Left Sidebar - Info */}
              <div className="md:col-span-2 bg-blue-600 p-10 flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tighter mb-4 leading-tight">Let's Work Together</h3>
                  <p className="text-blue-100 text-sm leading-relaxed mb-8">
                    I'm currently available for freelance projects and full-time opportunities.
                  </p>
                  
                  <div className="space-y-4">
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-3 text-sm hover:text-blue-200 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      Email Me
                    </a>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-blue-200 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      LinkedIn
                    </a>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <Globe className="w-4 h-4" />
                      </div>
                      Chengalpattu,TN
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                   <div className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Availability</div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-bold">Open for Proposals</span>
                   </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="md:col-span-3 p-10 bg-neutral-900">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Inquiry Sent!</h3>
                      <p className="text-gray-400 text-sm">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form">
                      <h4 className="text-xl font-bold mb-8 tracking-tight">Project Inquiry</h4>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1.5 block">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1.5 block">Work Email</label>
                          <input
                            required
                            type="email"
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1.5 block">Project Interest</label>
                          <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                            value={formData.project}
                            onChange={(e) => setFormData({...formData, project: e.target.value})}
                          >
                            <option value="">Select Project Type</option>
                            <option value="ML Project">Machine Learning / Data Analytics</option>
                            <option value="Full Stack">Full Stack Web App</option>
                            <option value="Freelance">Freelance Inquiry</option>
                            <option value="Hiring">Employment Opportunity</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1.5 block">Message</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Tell me about your project..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl mt-4"
                        >
                          <Send className="w-5 h-5" />
                          Send Inquiry
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
