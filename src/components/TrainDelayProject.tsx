"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function TrainDelayProject() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[85vh] px-12 flex flex-col xl:flex-row gap-12 relative">
      <div className="flex-[0.4] flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <div className="text-xs font-mono text-foreground/50 uppercase border-b border-border pb-2 inline-flex items-center gap-2">
            Project.01 <span className="w-2 h-2 rounded-full bg-foreground inline-block animate-pulse" />
          </div>
          <h3 className="text-5xl lg:text-7xl font-sans font-bold leading-tight tracking-tighter">
            Indian Train <br /> Delay Analysis
          </h3>
        </div>
        <p className="font-mono text-sm lg:text-base text-foreground/70 leading-relaxed text-justify">
          Spearheaded end-to-end data processing and Exploratory Data Analysis (EDA) using Python (Pandas) across a massive logistics dataset of 1,900+ train delay records, 90 trains, and 480 stations. Achieved 100% data consistency and engineered optimized SQL queries to analyze regional bottleneck patterns.
        </p>
        
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="border border-border p-6 bg-background/50 backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} className="text-foreground/50" />
            </div>
            <div className="text-xs font-mono text-foreground/50 uppercase mb-3">Avg Delay</div>
            <div className="text-4xl lg:text-5xl font-mono text-red-500 tracking-tighter">40.70 <span className="text-lg lg:text-xl text-red-500/50">mins</span></div>
            <div className="mt-4 h-1 w-full bg-border rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-red-500" />
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="border border-border p-6 bg-background/50 backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} className="text-foreground/50" />
            </div>
            <div className="text-xs font-mono text-foreground/50 uppercase mb-3">On-Time</div>
            <div className="text-4xl lg:text-5xl font-mono text-emerald-500 tracking-tighter">50.41%</div>
            <div className="mt-4 h-1 w-full bg-border rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "50.41%" }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-emerald-500" />
            </div>
          </motion.div>
        </div>

        <div className="flex gap-4 font-mono text-xs text-foreground/50 uppercase mt-4">
          <span className="px-3 py-1 border border-border rounded-full">Power BI</span>
          <span className="px-3 py-1 border border-border rounded-full">Python</span>
          <span className="px-3 py-1 border border-border rounded-full">SQL</span>
        </div>
      </div>
      
      {/* Visualization Container */}
      <div className="flex-[0.6] h-full min-h-[400px] border border-border relative overflow-hidden bg-foreground/5 group">
        <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-foreground/50 z-10 pointer-events-none mix-blend-difference">
          [ Deck.gl Map & D3 Data Flow Rendering ]
        </div>
        
        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-foreground/30 m-4 transition-transform group-hover:scale-110" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-foreground/30 m-4 transition-transform group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-foreground/30 m-4 transition-transform group-hover:scale-110" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-foreground/30 m-4 transition-transform group-hover:scale-110" />

        {/* Simulated data flow lines for vibe check */}
        {mounted && (
          <svg className="absolute inset-0 w-full h-full opacity-60">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Multiple paths to fill the space */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M -100 ${100 + i * 40} Q ${300 + i * 50} ${100 + (i % 3) * 150} ${1200} ${300 - i * 20}`}
                fill="transparent"
                stroke={`rgba(${i % 2 === 0 ? '255,100,100' : '255,255,255'}, ${0.1 + (i % 5)*0.1})`}
                strokeWidth={1 + (i % 3)}
                strokeDasharray={`${10 + i * 5} ${20 + i * 10}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, strokeDashoffset: [0, -1000] }}
                transition={{ 
                  duration: 8 + (i % 5) * 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 0.2
                }}
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
