import { motion, AnimatePresence } from "motion/react";
import { Palette, Terminal, Moon, Sun, Layout as LayoutIcon, Zap } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeContext";

type Theme = 'default' | 'cyber' | 'midnight' | 'paper';
type Layout = 'modern' | 'minimal';

export default function ThemeSwitcher() {
  const { theme, setTheme, layout, setLayout } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { id: Theme; name: string; icon: any; color: string }[] = [
    { id: 'default', name: 'Starting', icon: Moon, color: '#2563eb' },
    { id: 'cyber', name: 'Cyber Nexus', icon: Terminal, color: '#00f2ff' },
    { id: 'midnight', name: 'Midnight', icon: Palette, color: '#D4AF37' },
    { id: 'paper', name: 'Paper', icon: Sun, color: '#1a365d' },
  ];

  const layouts: { id: Layout; name: string; icon: any }[] = [
    { id: 'modern', name: 'Modern', icon: Zap },
    { id: 'minimal', name: 'Minimal', icon: LayoutIcon },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 left-0 glass p-4 rounded-2xl w-56 flex flex-col gap-4 shadow-2xl"
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2 px-2">Aesthetic Theme</p>
              <div className="flex flex-col gap-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                      theme === t.id 
                        ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/20' 
                        : 'hover:bg-white/5 text-text-muted hover:text-text-main border border-transparent'
                    }`}
                  >
                    <t.icon size={16} />
                    <span className="text-sm font-medium">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2 px-2">Layout Template</p>
              <div className="flex flex-col gap-1">
                {layouts.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                      layout === l.id 
                        ? 'bg-brand-purple/20 text-brand-purple border border-brand-purple/20' 
                        : 'hover:bg-white/5 text-text-muted hover:text-text-main border border-transparent'
                    }`}
                  >
                    <l.icon size={16} />
                    <span className="text-sm font-medium">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 glass flex items-center justify-center rounded-full text-brand-blue shadow-2xl hover:shadow-brand-blue/20"
      >
        <Palette size={24} />
      </motion.button>
    </div>
  );
}
