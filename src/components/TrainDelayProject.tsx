"use client";

import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function TrainDelayProject() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);
    
    if (trainRef.current && containerRef.current) {
      // Train slides in from the left
      gsap.fromTo(trainRef.current, 
        { x: -300, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
      
      // Floating animation
      gsap.to(trainRef.current, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    if (statsRef.current && containerRef.current) {
      gsap.fromTo(statsRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
          }
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full md:h-[85vh] px-6 md:px-12 flex flex-col xl:flex-row gap-8 xl:gap-12 relative overflow-y-auto overflow-x-hidden md:overflow-hidden pb-24 md:pb-0">
      <div className="flex-[0.5] xl:flex-[0.4] flex flex-col justify-center space-y-6 md:space-y-8 h-full min-h-max z-20 relative">
        <div className="space-y-4">
          <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase border-b border-border pb-2 inline-flex items-center gap-2">
            Project.01 <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-foreground inline-block animate-pulse" />
          </div>
          <h3 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold leading-[1.1] tracking-tighter">
            Indian Train <br className="hidden md:block" /> Delay Analysis
          </h3>
        </div>
        <p className="font-mono text-xs sm:text-sm lg:text-base text-foreground/70 leading-relaxed text-justify">
          Spearheaded end-to-end data processing and Exploratory Data Analysis (EDA) using Python (Pandas) across a massive logistics dataset of 1,900+ train delay records, 90 trains, and 480 stations. Achieved 100% data consistency and engineered optimized SQL queries to analyze regional bottleneck patterns.
        </p>
        
        {/* KPI Grid */}
        <div ref={statsRef} className="grid grid-cols-2 gap-4 md:gap-6 mt-2 md:mt-4">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="border border-border p-4 md:p-6 bg-background/50 backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              <ArrowUpRight size={16} className="text-foreground/50" />
            </div>
            <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase mb-2 md:mb-3">Avg Delay</div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-mono text-red-500 tracking-tighter">40.70<span className="text-sm lg:text-xl text-red-500/50">m</span></div>
            <div className="mt-3 md:mt-4 h-1 w-full bg-border rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "70%" }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-red-500" />
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="border border-border p-4 md:p-6 bg-background/50 backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              <ArrowUpRight size={16} className="text-foreground/50" />
            </div>
            <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase mb-2 md:mb-3">On-Time Base</div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-mono text-emerald-500 tracking-tighter">50.41%</div>
            <div className="mt-3 md:mt-4 h-1 w-full bg-border rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "50.41%" }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-emerald-500" />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 font-mono text-[10px] md:text-xs text-foreground/50 uppercase pt-2">
          <span className="px-3 py-1 border border-border rounded-full">Power BI</span>
          <span className="px-3 py-1 border border-border rounded-full">Python</span>
          <span className="px-3 py-1 border border-border rounded-full">SQL</span>
          <span className="px-3 py-1 border border-border rounded-full hidden sm:inline-block">Excel</span>
        </div>
      </div>
      
      {/* Visualization Container */}
      <div className="flex-[0.5] xl:flex-[0.6] w-full min-h-[300px] md:min-h-[400px] h-full border border-border relative overflow-hidden bg-background group mt-6 xl:mt-0">
        <div className="absolute top-4 right-4 z-20 font-mono text-[10px] md:text-xs text-foreground/50 pointer-events-none bg-background/50 px-2 py-1 backdrop-blur-sm rounded">
          [ HS-DATA TRAIN : NETWORK OPTIMIZATION ]
        </div>
        
        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-foreground/30 m-4 transition-transform group-hover:scale-110 z-20" />
        <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-foreground/30 m-4 transition-transform group-hover:scale-110 z-20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-foreground/30 m-4 transition-transform group-hover:scale-110 z-20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-foreground/30 m-4 transition-transform group-hover:scale-110 z-20" />

        {/* Futuristic Train Glow Image */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none p-4 md:p-8">
          <img 
            ref={trainRef}
            src="/train_neon.jpg" 
            alt="Futuristic Data Train" 
            className="w-full h-auto max-w-[900px] mix-blend-screen dark:mix-blend-screen mix-blend-multiply opacity-90 filter contrast-125 saturate-150"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>

        {/* Background Data Flow Animation */}
        {mounted && (
          <svg className="absolute inset-0 w-full h-full opacity-30 z-0 group-hover:opacity-60 transition-opacity duration-700">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M -50 ${50 + i * 30} Q ${150 + i * 20} ${100 + (i % 3) * 80} ${1000} ${200 - i * 10}`}
                fill="transparent"
                stroke={`rgba(${i % 2 === 0 ? '0,200,255' : '100,150,255'}, ${0.1 + (i % 5)*0.1})`}
                strokeWidth={1 + (i % 3)}
                strokeDasharray={`${5 + i * 5} ${10 + i * 5}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, strokeDashoffset: [0, -1000] }}
                transition={{ 
                  duration: 4 + (i % 4) * 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 0.1
                }}
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
