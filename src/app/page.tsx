"use client";

import { useEffect, useRef } from "react";
import { DataGridCanvas } from "@/components/DataGridCanvas";
import { Header } from "@/components/Header";
import { motion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TrainDelayProject } from "@/components/TrainDelayProject";
import { BMWSalesProject } from "@/components/BMWSalesProject";
import { Mail, Linkedin, Github, Phone, MapPin, Download } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let mm = gsap.matchMedia();

    // Desktop Horizontal Scroll for Projects
    mm.add("(min-width: 1024px)", () => {
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
    });

    // Mobile Vertical Fallback - no specific GSAP needed, native CSS flex-col handles it.
    return () => mm.revert(); // cleanup
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
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
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
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <DataGridCanvas />
      <Header />
      
      {/* Hero Section */}
      <section id="about" className="min-h-screen w-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden pt-24 pb-12">
        <div ref={heroTextRef} className="absolute inset-0 flex items-center justify-center opacity-[0.02] dark:opacity-[0.04] pointer-events-none z-[-1] overflow-hidden hidden md:flex">
          <h1 className="text-[25vw] font-bold font-sans whitespace-nowrap leading-none tracking-tighter">DATA SCIENCE</h1>
        </div>

        <div className="w-full h-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:pt-16">
          <div className="flex-1 lg:flex-[0.65] flex flex-col space-y-6 md:space-y-8 z-10 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="inline-flex items-center gap-3 md:gap-4 border border-border px-3 md:px-4 py-1.5 md:py-2 rounded-full w-fit bg-background/50 backdrop-blur-sm"
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-foreground/70">Available for Work</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-[7rem] font-bold font-sans tracking-tighter uppercase leading-[0.9] -ml-1"
            >
              Princy Dubey
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-2xl xl:text-3xl font-mono text-foreground/60 uppercase tracking-widest max-w-3xl leading-relaxed md:leading-normal"
            >
              Data Analytics & <br className="hidden md:block"/> Business Intelligence
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base xl:text-lg text-foreground/70 max-w-2xl text-justify font-sans leading-relaxed"
            >
              Results-driven Computer Science undergraduate with expertise in data modeling, exploratory data analysis, and transforming raw business data into strategic operational decisions.
            </motion.p>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "circOut" }}
              className="h-[1px] w-full max-w-2xl bg-border origin-left hidden md:block"
            />

            {/* Quick Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4 md:pt-0"
            >
              <a href="#projects" className="px-8 py-4 bg-foreground text-background font-mono uppercase tracking-widest text-xs md:text-sm hover:bg-foreground/90 transition-colors text-center">
                View Projects
              </a>
              <a href="mailto:princy.dubey.core@gmail.com" className="px-8 py-4 border border-border bg-background hover:bg-foreground/5 font-mono uppercase tracking-widest text-xs md:text-sm transition-colors flex items-center justify-center gap-2">
                <Mail size={16} /> Contact Me
              </a>
            </motion.div>
          </div>

          {/* Right Side Info Panel (Desktop Only) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
            className="flex-1 lg:flex-[0.35] w-full h-full flex flex-col justify-center border-t md:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-12 lg:py-12 z-10"
          >
            <div className="space-y-8 md:space-y-12">
              <div>
                <h3 className="text-[10px] md:text-xs font-mono uppercase text-foreground/50 mb-3 md:mb-4 tracking-widest border-b border-border/50 pb-2 inline-block">Current Status</h3>
                <p className="text-xl md:text-2xl font-sans tracking-tight">B.Tech. Computer Science & Engineering</p>
                <p className="text-xs md:text-sm font-mono text-foreground/60 mt-2">Gyan Ganga Institute of Technology</p>
              </div>

              <div className="hidden md:block">
                <h3 className="text-[10px] md:text-xs font-mono uppercase text-foreground/50 mb-3 md:mb-4 tracking-widest border-b border-border/50 pb-2 inline-block">Connect</h3>
                <div className="flex flex-col gap-4 font-mono text-xs md:text-sm">
                  <a href="mailto:princy.dubey.core@gmail.com" className="flex items-center gap-3 hover:text-foreground/70 transition-colors group">
                    <Mail size={14} className="group-hover:scale-110 transition-transform"/> princy.dubey.core@gmail.com
                  </a>
                  <a href="tel:+917067270163" className="flex items-center gap-3 hover:text-foreground/70 transition-colors group">
                    <Phone size={14} className="group-hover:scale-110 transition-transform"/> +91 7067270163
                  </a>
                  <a href="https://www.linkedin.com/in/princy-dubey-49a2352a3" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-foreground/70 transition-colors group">
                    <Linkedin size={14} className="group-hover:scale-110 transition-transform"/> LinkedIn Profile
                  </a>
                  <a href="https://github.com/princydubey33" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-foreground/70 transition-colors group">
                    <Github size={14} className="group-hover:scale-110 transition-transform"/> GitHub Repository
                  </a>
                  <div className="flex items-center gap-3 text-foreground/70">
                    <MapPin size={14} /> Jabalpur, MP, India
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={horizontalSectionRef} className="lg:h-screen w-full bg-background relative z-10 border-t border-border">
        {/* On desktop, this w-[200vw] will scroll horizontally. On mobile, flex-col stacks them. */}
        <div ref={projectsWrapperRef} className="h-full flex flex-col lg:flex-row lg:w-[200vw] overflow-hidden">
          <div className="project-panel w-full lg:w-screen h-auto lg:h-full flex-shrink-0 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border bg-background pt-16 pb-16 lg:pb-0">
            <TrainDelayProject />
          </div>
          <div className="project-panel w-full lg:w-screen h-auto lg:h-full flex-shrink-0 flex items-center justify-center bg-background pt-16 pb-16 lg:pb-0">
            <BMWSalesProject />
          </div>
        </div>
      </section>

      {/* Skills Bento Grid */}
      <section id="skills" className="min-h-screen w-full py-20 md:py-32 px-6 md:px-12 flex flex-col items-center border-t border-border bg-background/50 backdrop-blur-md relative z-10">
        
        {/* Background Grid Lines Desktop */}
        <div className="hidden lg:flex absolute inset-0 pointer-events-none justify-between px-12 z-0 opacity-10">
          <div className="w-[1px] h-full bg-foreground" />
          <div className="w-[1px] h-full bg-foreground" />
          <div className="w-[1px] h-full bg-foreground" />
          <div className="w-[1px] h-full bg-foreground" />
        </div>

        <div className="w-full space-y-12 md:space-y-16 z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6 md:pb-8 gap-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold uppercase tracking-tighter">System.Skills</h2>
            <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase tracking-widest md:text-right">
              Technical Arsenal <br className="hidden md:block"/> Data Science & Analytics
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:auto-rows-[300px]">
            {/* Box 1 */}
            <motion.div 
              whileHover={{ scale: 0.98, y: -5 }}
              className="border border-border p-6 md:p-8 flex flex-col justify-between bg-background rounded-[2px] group relative overflow-hidden lg:col-span-2 min-h-[250px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 rounded-full blur-3xl group-hover:bg-foreground/10 transition-colors" />
              <div className="text-[10px] md:text-sm font-mono text-foreground/50 uppercase tracking-widest border-b border-border/50 pb-3 md:pb-4">01 / Analytics Platforms & Tools</div>
              <div className="flex flex-wrap gap-2 md:gap-4 mt-6 md:mt-8">
                {["Power BI", "DAX", "Microsoft Excel", "Jupyter Notebook", "Git", "GitHub"].map((t) => (
                  <span key={t} className="px-3 md:px-4 py-1.5 md:py-2 border border-border bg-background font-mono text-xs md:text-sm group-hover:border-foreground/50 group-hover:bg-foreground/5 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              whileHover={{ scale: 0.98, y: -5 }}
              className="border border-border p-6 md:p-8 flex flex-col justify-between bg-background rounded-[2px] group min-h-[250px]"
            >
              <div className="text-[10px] md:text-sm font-mono text-foreground/50 uppercase tracking-widest border-b border-border/50 pb-3 md:pb-4">02 / Core Languages</div>
              <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
                <div className="flex justify-between items-center group-hover:text-foreground transition-colors text-foreground/80">
                  <span className="font-mono text-xl md:text-2xl">Python</span>
                  <span className="font-mono text-[10px] md:text-xs border border-border px-2 py-1">Advanced</span>
                </div>
                <div className="flex justify-between items-center group-hover:text-foreground transition-colors text-foreground/80">
                  <span className="font-mono text-xl md:text-2xl">SQL</span>
                  <span className="font-mono text-[10px] md:text-xs border border-border px-2 py-1">Advanced</span>
                </div>
                <div className="flex justify-between items-center group-hover:text-foreground transition-colors text-foreground/80">
                  <span className="font-mono text-xl md:text-2xl">Java</span>
                  <span className="font-mono text-[10px] md:text-xs border border-border px-2 py-1">Basic</span>
                </div>
              </div>
            </motion.div>
            
            {/* Box 3 */}
            <motion.div 
              whileHover={{ scale: 0.98, y: -5 }}
              className="border border-border p-6 md:p-8 flex flex-col justify-between bg-foreground text-background rounded-[2px] group min-h-[250px]"
            >
              <div className="text-[10px] md:text-sm font-mono text-background/50 uppercase tracking-widest border-b border-background/20 pb-3 md:pb-4">03 / Libraries</div>
              <div className="flex flex-col space-y-3 md:space-y-4 mt-6 md:mt-8">
                <span className="font-mono text-xl md:text-2xl hover:translate-x-2 transition-transform">Pandas</span>
                <span className="font-mono text-xl md:text-2xl hover:translate-x-2 transition-transform">NumPy</span>
                <span className="font-mono text-xl md:text-2xl hover:translate-x-2 transition-transform">Matplotlib</span>
                <span className="font-mono text-xl md:text-2xl hover:translate-x-2 transition-transform">Seaborn</span>
              </div>
            </motion.div>
            
            {/* Box 4 */}
            <motion.div 
              whileHover={{ scale: 0.98, y: -5 }}
              className="border border-border p-6 md:p-8 flex flex-col justify-between bg-background rounded-[2px] group lg:col-span-4 min-h-[200px]"
            >
              <div className="text-[10px] md:text-sm font-mono text-foreground/50 uppercase tracking-widest border-b border-border/50 pb-3 md:pb-4">04 / Methodologies & Soft Skills</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-6 md:mt-8">
                <div className="space-y-1 md:space-y-2">
                  <div className="font-mono text-base md:text-lg font-bold">Data Analytics</div>
                  <p className="font-sans text-xs md:text-sm text-foreground/60">Exploratory Data Analysis (EDA), Data Cleaning, Basic Statistics.</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="font-mono text-base md:text-lg font-bold">Business Intel</div>
                  <p className="font-sans text-xs md:text-sm text-foreground/60">Data Visualization, Dashboard Engineering, Reporting Workflows.</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="font-mono text-base md:text-lg font-bold">Problem Solving</div>
                  <p className="font-sans text-xs md:text-sm text-foreground/60">Analytical Thinking, Root-cause resolution, Optimization.</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="font-mono text-base md:text-lg font-bold">Collaboration</div>
                  <p className="font-sans text-xs md:text-sm text-foreground/60">Team Collaboration, Adaptability, Technical Communication, Rapid Learning.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience / Education Timeline */}
      <section id="education" className="min-h-screen w-full py-20 md:py-32 px-6 md:px-12 flex flex-col items-center border-t border-border bg-background relative z-10">
        <div className="w-full space-y-16 md:space-y-24 z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6 md:pb-8 gap-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold uppercase tracking-tighter">Timeline.Log</h2>
            <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase tracking-widest md:text-right">
              Academic & Professional <br className="hidden md:block"/> Milestones
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
            
            {/* The Line - Desktop Center */}
            <div ref={timelineLineRef} className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2">
              <div ref={timelineProgressRef} className="absolute top-0 left-0 w-full bg-foreground h-0" />
            </div>

            {/* Column 1: Education */}
            <div className="space-y-8 md:space-y-16">
              <div className="text-lg md:text-xl font-mono uppercase tracking-widest text-foreground/50 mb-6 md:mb-12 border-b border-border pb-4">Education</div>
              
              <div className="relative group">
                <div className="hidden lg:block absolute right-[-48px] top-4 w-4 h-4 border-2 border-foreground bg-background rounded-full group-hover:scale-150 transition-transform" />
                <div className="border border-border p-6 md:p-8 bg-background/50 hover:bg-foreground/5 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <div className="text-[10px] md:text-sm font-mono text-foreground/50 border border-border px-3 py-1 rounded-full w-fit">2023 - 2027</div>
                    <div className="text-xs md:text-sm font-mono font-bold">CGPA: 8.03</div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-tight mb-2">B.Tech. Computer Science & Engineering (Data Science)</h3>
                  <p className="font-mono text-xs md:text-sm text-foreground/70 mb-4">Gyan Ganga Institute of Technology and Sciences | Jabalpur, MP</p>
                  <div className="font-sans text-xs md:text-sm text-foreground/60 space-y-1 border-t border-border pt-4">
                    <p><strong className="text-foreground">Relevant Coursework:</strong></p>
                    <p>Database Management Systems (DBMS), Data Structures & Algorithms, Object-Oriented Programming, Data Mining, Probability & Statistics, Operating Systems.</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="hidden lg:block absolute right-[-48px] top-4 w-4 h-4 border-2 border-foreground bg-background rounded-full group-hover:scale-150 transition-transform" />
                <div className="border border-border p-6 md:p-8 bg-background/50 hover:bg-foreground/5 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <div className="text-[10px] md:text-sm font-mono text-foreground/50 border border-border px-3 py-1 rounded-full w-fit">2020 - 2023</div>
                    <div className="text-xs md:text-sm font-mono font-bold">80.2% & 81.4%</div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-tight mb-2">Secondary Education (Class XII & X)</h3>
                  <p className="font-mono text-xs md:text-sm text-foreground/70">MP Board | Mandla, MP</p>
                </div>
              </div>
            </div>

            {/* Column 2: Certifications */}
            <div className="space-y-8 md:space-y-16 lg:pt-32">
              <div className="text-lg md:text-xl font-mono uppercase tracking-widest text-foreground/50 mb-6 md:mb-12 border-b border-border pb-4 lg:hidden">Certifications</div>
              
              <div className="relative group">
                <div className="hidden lg:block absolute left-[-48px] top-4 w-4 h-4 border-2 border-foreground bg-background rounded-full group-hover:scale-150 transition-transform" />
                <div className="border border-border p-6 md:p-8 bg-background/50 hover:bg-foreground/5 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[10px] md:text-sm font-mono text-foreground/50 border border-border px-3 py-1 rounded-full">Professional Training</div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-tight mb-2">Cisco Networking Academy</h3>
                  <p className="font-mono text-xs md:text-sm text-foreground/70 mb-6">Certified Essential Programs</p>
                  
                  <ul className="space-y-6 font-sans text-xs md:text-sm text-foreground/80 border-t border-border pt-6">
                    <li>
                      <strong className="block text-sm md:text-base font-mono mb-1 text-foreground">Data Analytics Essentials</strong>
                      <span className="text-foreground/60">Data transformation, analytics workflows, visualization standards, and data governance ethics.</span>
                    </li>
                    <li>
                      <strong className="block text-sm md:text-base font-mono mb-1 text-foreground">Python Essentials 1</strong>
                      <span className="text-foreground/60">Core algorithms, data structures, control flow, functions, and module integration.</span>
                    </li>
                    <li>
                      <strong className="block text-sm md:text-base font-mono mb-1 text-foreground">Python Essentials 2</strong>
                      <span className="text-foreground/60">Object-Oriented Programming (OOP), file processing, exception handling, and custom module packaging.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mega Footer */}
      <footer className="w-full border-t border-border flex flex-col bg-background z-10 relative">
        <div className="w-full px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 border-b border-border">
          <div className="space-y-4 lg:col-span-1">
            <h4 className="text-xl md:text-2xl font-sans font-bold uppercase tracking-tight">Princy Dubey</h4>
            <p className="font-mono text-xs md:text-sm text-foreground/50 max-w-xs leading-relaxed">Data Analytics & Business Intelligence Professional based in India.</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[10px] md:text-sm font-mono uppercase tracking-widest text-foreground/50">Contact</h4>
            <div className="flex flex-col space-y-3 font-mono text-xs md:text-sm">
              <a href="mailto:princy.dubey.core@gmail.com" className="hover:text-foreground/70 transition-colors flex items-center gap-2">
                <Mail size={14}/> princy.dubey.core@gmail.com
              </a>
              <a href="tel:+917067270163" className="hover:text-foreground/70 transition-colors flex items-center gap-2">
                <Phone size={14}/> +91 7067270163
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[10px] md:text-sm font-mono uppercase tracking-widest text-foreground/50">Social</h4>
            <div className="flex flex-col space-y-3 font-mono text-xs md:text-sm">
              <a href="https://www.linkedin.com/in/princy-dubey-49a2352a3" target="_blank" rel="noreferrer" className="hover:text-foreground/70 transition-colors flex items-center gap-2">
                <Linkedin size={14}/> LinkedIn Profile
              </a>
              <a href="https://github.com/princydubey33" target="_blank" rel="noreferrer" className="hover:text-foreground/70 transition-colors flex items-center gap-2">
                <Github size={14}/> GitHub Repository
              </a>
            </div>
          </div>
        </div>

        <div className="w-full py-6 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 text-[10px] md:text-xs font-mono uppercase tracking-widest text-foreground/40 gap-4">
          <span>End of Data Stream</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
