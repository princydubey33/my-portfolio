"use client";

import { useEffect, useRef } from "react";
import { DataGridCanvas } from "@/components/DataGridCanvas";
import { Header } from "@/components/Header";
import { motion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TrainDelayProject } from "@/components/TrainDelayProject";
import { BMWSalesProject } from "@/components/BMWSalesProject";
import { Mail, Phone, MapPin, Download } from "lucide-react";

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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (horizontalSectionRef.current && projectsWrapperRef.current) {
      const projects = gsap.utils.toArray(".project-panel");
      const scrollTween = gsap.to(projects, {
        xPercent: -100 * (projects.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + projectsWrapperRef.current?.offsetWidth,
        }
      });
      return () => { scrollTween.kill(); };
    }
  }, []);

  useEffect(() => {
    if (timelineLineRef.current && timelineProgressRef.current) {
      gsap.to(timelineProgressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineLineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
    }
  }, []);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.to(heroTextRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <DataGridCanvas />
      <Header />
      
      {/* Hero Section */}
      <section id="about" className="h-screen w-full flex flex-col justify-center px-12 relative overflow-hidden pt-16">
        <div ref={heroTextRef} className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-5 pointer-events-none z-[-1]">
          <h1 className="text-[25vw] font-bold font-sans whitespace-nowrap leading-none tracking-tighter">DATA SCIENCE</h1>
        </div>

        <div className="w-full h-full flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12 pt-20">
          <div className="flex-[0.6] flex flex-col space-y-8 z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="inline-flex items-center gap-4 border border-border px-4 py-2 rounded-full w-fit bg-background/50 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-foreground/70">Available for Work</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-bold font-sans tracking-tighter uppercase leading-[0.9]"
            >
              Princy Dubey
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-3xl font-mono text-foreground/60 uppercase tracking-widest max-w-3xl"
            >
              Data Analytics & <br/> Business Intelligence
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-foreground/70 max-w-2xl text-justify font-sans leading-relaxed"
            >
              Results-driven Computer Science undergraduate with expertise in data modeling, exploratory data analysis, and transforming raw business data into strategic operational decisions.
            </motion.p>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "circOut" }}
              className="h-[1px] w-full max-w-2xl bg-border origin-left"
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="px-8 py-4 bg-foreground text-background font-mono uppercase tracking-widest text-sm hover:bg-foreground/90 transition-colors">
                View Projects
              </a>
              <a href="mailto:princy.dubey.core@gmail.com" className="px-8 py-4 border border-border bg-background hover:bg-foreground/5 font-mono uppercase tracking-widest text-sm transition-colors flex items-center gap-2">
                <Mail size={16} /> Contact Me
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
            className="flex-[0.4] w-full xl:w-auto h-full flex flex-col justify-center border-l border-border pl-12 py-12 z-10 hidden xl:flex"
          >
            <div className="space-y-12">
              <div>
                <h3 className="text-xs font-mono uppercase text-foreground/50 mb-4 tracking-widest">Current Status</h3>
                <p className="text-2xl font-sans tracking-tight">B.Tech. Computer Science & Engineering</p>
                <p className="text-sm font-mono text-foreground/60 mt-2">Gyan Ganga Institute of Technology</p>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase text-foreground/50 mb-4 tracking-widest">Connect</h3>
                <div className="flex flex-col gap-4 font-mono text-sm">
                  <a href="mailto:princy.dubey.core@gmail.com" className="flex items-center gap-3 hover:text-foreground/70 transition-colors group">
                    <Mail size={16} className="group-hover:scale-110 transition-transform"/> princy.dubey.core@gmail.com
                  </a>
                  <a href="tel:+917067270163" className="flex items-center gap-3 hover:text-foreground/70 transition-colors group">
                    <Phone size={16} className="group-hover:scale-110 transition-transform"/> +91 7067270163
                  </a>
                  <a href="https://www.linkedin.com/in/princy-dubey-49a2352a3" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-foreground/70 transition-colors group">
                    <Linkedin size={16} className="group-hover:scale-110 transition-transform"/> LinkedIn Profile
                  </a>
                  <a href="https://github.com/princydubey33" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-foreground/70 transition-colors group">
                    <Github size={16} className="group-hover:scale-110 transition-transform"/> GitHub Repository
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Horizontal Section */}
      <section id="projects" ref={horizontalSectionRef} className="h-screen w-full overflow-hidden bg-background">
        <div ref={projectsWrapperRef} className="h-full flex w-[200vw]">
          <div className="project-panel w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-border bg-background pt-16">
            <TrainDelayProject />
          </div>
          <div className="project-panel w-screen h-full flex-shrink-0 flex items-center justify-center bg-background pt-16">
            <BMWSalesProject />
          </div>
        </div>
      </section>

      {/* Skills Bento Grid - Full Width */}
      <section id="skills" className="min-h-screen w-full py-32 px-12 flex flex-col items-center border-t border-border bg-background/50 backdrop-blur-md relative">
        <div className="w-full space-y-16 z-10">
          <div className="flex items-center justify-between border-b border-border pb-8">
            <h2 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter">System.Skills</h2>
            <div className="hidden md:block text-xs font-mono text-foreground/50 uppercase tracking-widest text-right">
              Technical Arsenal
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
            <motion.div whileHover={{ scale: 0.98, y: -5 }} className="border border-border p-8 flex flex-col justify-between bg-background rounded-[2px] group col-span-1 md:col-span-2">
              <div className="text-sm font-mono text-foreground/50 uppercase tracking-widest border-b border-border/50 pb-4">01 / Analytics Platforms & Tools</div>
              <div className="flex flex-wrap gap-4 mt-8">
                {["Power BI", "DAX", "Microsoft Excel", "Jupyter Notebook", "Git", "GitHub"].map((t) => (
                  <span key={t} className="px-4 py-2 border border-border bg-background font-mono text-sm group-hover:border-foreground/50 transition-colors">{t}</span>
                ))}
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 0.98, y: -5 }} className="border border-border p-8 flex flex-col justify-between bg-background rounded-[2px] group col-span-1">
              <div className="text-sm font-mono text-foreground/50 uppercase tracking-widest border-b border-border/50 pb-4">02 / Core Languages</div>
              <div className="space-y-4 mt-8">
                <div className="flex justify-between items-center group-hover:text-foreground text-foreground/80">
                  <span className="font-mono text-2xl">Python</span><span className="font-mono text-xs border border-border px-2 py-1">Advanced</span>
                </div>
                <div className="flex justify-between items-center group-hover:text-foreground text-foreground/80">
                  <span className="font-mono text-2xl">SQL</span><span className="font-mono text-xs border border-border px-2 py-1">Advanced</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 0.98, y: -5 }} className="border border-border p-8 flex flex-col justify-between bg-foreground text-background rounded-[2px] group col-span-1">
              <div className="text-sm font-mono text-background/50 uppercase tracking-widest border-b border-background/20 pb-4">03 / Libraries</div>
              <div className="flex flex-col space-y-4 mt-8">
                <span className="font-mono text-2xl">Pandas</span>
                <span className="font-mono text-2xl">NumPy</span>
                <span className="font-mono text-2xl">Matplotlib</span>
                <span className="font-mono text-2xl">Seaborn</span>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 0.98, y: -5 }} className="border border-border p-8 flex flex-col justify-between bg-background rounded-[2px] group md:col-span-4 min-h-[200px]">
              <div className="text-sm font-mono text-foreground/50 uppercase tracking-widest border-b border-border/50 pb-4">04 / Methodologies</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                <div className="space-y-2"><div className="font-mono text-lg font-bold">Data Analytics</div><p className="font-sans text-sm text-foreground/60">EDA, Data Cleaning, Stats.</p></div>
                <div className="space-y-2"><div className="font-mono text-lg font-bold">Business Intel</div><p className="font-sans text-sm text-foreground/60">Data Visualization, Dashboards.</p></div>
                <div className="space-y-2"><div className="font-mono text-lg font-bold">Problem Solving</div><p className="font-sans text-sm text-foreground/60">Analytical Thinking, Root-cause.</p></div>
                <div className="space-y-2"><div className="font-mono text-lg font-bold">Collaboration</div><p className="font-sans text-sm text-foreground/60">Team Collaboration, Adaptability.</p></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience / Education Timeline - Full Width 2 Column */}
      <section id="experience" className="min-h-screen w-full py-32 px-12 flex flex-col items-center border-t border-border bg-background relative">
        <div className="w-full space-y-24 z-10">
          <div className="flex items-center justify-between border-b border-border pb-8">
            <h2 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter">Timeline.Log</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative">
            <div ref={timelineLineRef} className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2">
              <div ref={timelineProgressRef} className="absolute top-0 left-0 w-full bg-foreground h-0" />
            </div>

            <div className="space-y-24">
              <div className="text-xl font-mono uppercase tracking-widest text-foreground/50 mb-12 border-b border-border pb-4">Education</div>
              <div className="relative group border border-border p-8 bg-background/50 hover:bg-foreground/5 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm font-mono text-foreground/50 border border-border px-3 py-1 rounded-full">2023 - 2027</div>
                  <div className="text-sm font-mono font-bold">CGPA: 8.03</div>
                </div>
                <h3 className="text-3xl font-bold font-sans tracking-tight mb-2">B.Tech. Computer Science (Data Science)</h3>
                <p className="font-mono text-sm text-foreground/70 mb-4">Gyan Ganga Institute of Technology</p>
              </div>
            </div>

            <div className="space-y-24 lg:pt-32">
              <div className="text-xl font-mono uppercase tracking-widest text-foreground/50 mb-12 border-b border-border pb-4 lg:hidden">Certifications</div>
              <div className="relative group border border-border p-8 bg-background/50 hover:bg-foreground/5 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm font-mono text-foreground/50 border border-border px-3 py-1 rounded-full">Certification</div>
                </div>
                <h3 className="text-3xl font-bold font-sans tracking-tight mb-2">Cisco Networking Academy</h3>
                <p className="font-mono text-sm text-foreground/70 mb-6">Professional Training Programs</p>
                <ul className="space-y-6 font-sans text-sm text-foreground/80 border-t border-border pt-6">
                  <li><strong className="block text-base font-mono mb-1 text-foreground">Data Analytics Essentials</strong></li>
                  <li><strong className="block text-base font-mono mb-1 text-foreground">Python Essentials 1 & 2</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mega Footer */}
      <footer className="w-full border-t border-border flex flex-col bg-background">
        <div className="w-full px-12 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-border">
          <div className="space-y-4">
            <h4 className="text-2xl font-sans font-bold uppercase tracking-tight">Princy Dubey</h4>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-mono uppercase tracking-widest text-foreground/50">Contact</h4>
            <div className="flex flex-col space-y-2 font-mono text-sm">
              <a href="mailto:princy.dubey.core@gmail.com" className="hover:text-foreground/50 transition-colors">princy.dubey.core@gmail.com</a>
              <a href="tel:+917067270163" className="hover:text-foreground/50 transition-colors">+91 7067270163</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
