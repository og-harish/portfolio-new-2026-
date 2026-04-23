import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'cyber' | 'midnight' | 'paper';
type Layout = 'modern' | 'minimal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  layout: Layout;
  setLayout: (layout: Layout) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as Theme) || 'default';
  });

  const [layout, setLayout] = useState<Layout>(() => {
    const saved = localStorage.getItem('portfolio-layout');
    return (saved as Layout) || 'modern';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-default', 'theme-cyber', 'theme-midnight', 'theme-paper');
    if (theme !== 'default') {
      root.classList.add(`theme-${theme}`);
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio-layout', layout);
  }, [layout]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, layout, setLayout }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
