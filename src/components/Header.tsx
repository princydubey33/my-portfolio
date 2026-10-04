"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Mail, Phone, Menu, X } from "lucide-react";

const Github = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76 0-1.4-.5-2.5-1.4-3.4.1-.4.6-1.6-.1-3.4 0 0-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C7 1 6 1 6 1c-.7 1.8-.2 3-.1 3.4A5.4 5.4 0 0 0 4 7.8c0 5.2 3 6.4 6 6.76-.9.8-1.3 2-1.4 3.24V22" />
    <path d="M9 18c-4.5 1.5-5-2.5-7-3" />
  </svg>
);

const Linkedin = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="text-sm font-mono font-bold tracking-tight uppercase md:border-r md:border-border md:pr-8">
              [ Princy Dubey ]
            </div>
            <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-foreground/70">
              <a href="mailto:princy.dubey.core@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors"><Mail size={12}/> princy.dubey.core@gmail.com</a>
              <a href="tel:+917067270163" className="flex items-center gap-2 hover:text-foreground transition-colors"><Phone size={12}/> +91 7067270163</a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-mono uppercase tracking-wide">
            <div className="flex items-center gap-6 mr-4 border-r border-border pr-6">
              <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
              <a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a>
              <a href="#skills" className="hover:opacity-70 transition-opacity">Skills</a>
              <a href="#education" className="hover:opacity-70 transition-opacity">Edu & Certs</a>
            </div>
            
            <div className="flex items-center gap-4 border-r border-border pr-6">
              <a href="https://github.com/princydubey33" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity" aria-label="GitHub"><Github size={16}/></a>
              <a href="https://www.linkedin.com/in/princy-dubey-49a2352a3" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn"><Linkedin size={16}/></a>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 border border-border flex items-center justify-center rounded-[4px] hover:bg-foreground hover:text-background transition-colors"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                theme === "dark" ? <Sun size={14} /> : <Moon size={14} />
              ) : (
                <div className="w-3.5 h-3.5" />
              )}
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 border border-border flex items-center justify-center rounded-[4px]"
            >
              {mounted ? (theme === "dark" ? <Sun size={14} /> : <Moon size={14} />) : <div className="w-3.5 h-3.5" />}
            </button>
            <button 
              className="w-8 h-8 flex items-center justify-center border border-border rounded-[4px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 flex flex-col space-y-8 font-mono uppercase tracking-widest text-lg">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">About</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">Projects</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">Skills</a>
          <a href="#education" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">Edu & Certs</a>
          <div className="flex gap-6 pt-4">
            <a href="https://github.com/princydubey33" target="_blank" rel="noreferrer"><Github size={24}/></a>
            <a href="https://www.linkedin.com/in/princy-dubey-49a2352a3" target="_blank" rel="noreferrer"><Linkedin size={24}/></a>
            <a href="mailto:princy.dubey.core@gmail.com"><Mail size={24}/></a>
          </div>
        </div>
      )}
    </>
  );
}
