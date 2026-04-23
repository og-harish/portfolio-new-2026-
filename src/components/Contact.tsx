import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import { PERSONAL_INFO } from "../constants";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      alert("Something went wrong. Please check your connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-brand-cyan font-bold tracking-widest uppercase text-sm mb-4">Connect</div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tighter">
              Get In <span className="text-white/40">Touch</span>
            </h2>
            <p className="text-white/60 mb-12 max-w-sm text-lg leading-relaxed">
              Have a project in mind? Or just want to say hi? I'm always open to discussing new opportunities.
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, label: "Phone", value: PERSONAL_INFO.phone, color: "text-brand-blue" },
                { icon: Mail, label: "Email", value: PERSONAL_INFO.email, color: "text-brand-purple" },
                { icon: MapPin, label: "Location", value: PERSONAL_INFO.location, color: "text-brand-cyan" }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-6 group">
                  <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-lg font-bold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-white/5">
              <a
                href={`https://wa.me/91${PERSONAL_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#25D366]/20"
              >
                <MessageSquare className="w-5 h-5" />
                WhatsApp Me
              </a>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 p-10 lg:p-14 rounded-[3rem] relative"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6 glass">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/40 max-w-xs">Thanks for reaching out, Harish. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-brand-blue font-bold text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Subject</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Message</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all resize-none"
                      placeholder="Let's talk about..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                </div>
                <button
                  disabled={isSending}
                  type="submit"
                  className="w-full py-5 bg-brand-blue hover:bg-brand-blue/80 text-white font-bold rounded-2xl transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSending ? "Sending..." : "Send Message"}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
