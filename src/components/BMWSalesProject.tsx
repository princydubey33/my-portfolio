"use client";

import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const barShaderVertex = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const barShaderFragment = `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  float edge = 0.05;
  bool isEdge = (vUv.x < edge || vUv.x > 1.0 - edge || vUv.y < edge || vUv.y > 1.0 - edge);
  float scanline = sin(vPosition.y * 30.0 - uTime * 10.0) * 0.15;
  vec3 finalColor = isEdge ? uColor : uColor * (0.05 + scanline);
  gl_FragColor = vec4(finalColor, 0.6);
}
`;

function BarChart3D() {
  const { theme } = useTheme();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(theme === "dark" ? "#ffffff" : "#000000") },
    }),
    [theme]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const data = [1.2, 2.5, 1.8, 3.2, 2.1, 4.0, 2.8, 4.5, 3.1, 1.9, 5.2, 3.8, 2.4];

  return (
    <group position={[-6, -3, 0]} scale={[0.8, 0.8, 0.8]}>
      {data.map((h, i) => (
        <mesh key={i} position={[i * 1.0, h / 2, 0]}>
          <boxGeometry args={[0.7, h, 0.7]} />
          <shaderMaterial
            ref={i === 0 ? materialRef : undefined}
            vertexShader={barShaderVertex}
            fragmentShader={barShaderFragment}
            uniforms={uniforms}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

export function BMWSalesProject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (carRef.current && containerRef.current) {
      // Car slides in from the right when scrolling into view
      gsap.fromTo(carRef.current, 
        { x: 300, opacity: 0 },
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
      
      // Floating animation for the car
      gsap.to(carRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    if (statsRef.current && containerRef.current) {
      gsap.fromTo(statsRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
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
    <div ref={containerRef} className="w-full h-full md:h-[85vh] px-6 md:px-12 flex flex-col xl:flex-row-reverse gap-8 xl:gap-12 relative overflow-y-auto overflow-x-hidden md:overflow-hidden pb-24 md:pb-0">
      <div className="flex-[0.5] xl:flex-[0.4] flex flex-col justify-center space-y-6 md:space-y-8 h-full min-h-max z-10 relative">
        <div className="space-y-4">
          <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase border-b border-border pb-2 inline-flex items-center gap-2">
            Project.02 <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-foreground inline-block animate-pulse" />
          </div>
          <h3 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold leading-[1.1] tracking-tighter">
            BMW Sales <br className="hidden md:block"/> Analysis
          </h3>
        </div>
        <p className="font-mono text-xs sm:text-sm lg:text-base text-foreground/70 leading-relaxed text-justify">
          Evaluated vehicle sales performance across 1,000+ BMW transaction records. Architected a multi-page interactive analytics platform mapping revenue patterns, reducing manual reporting latency by 40% and optimizing executive decision-making.
        </p>
        
        {/* KPI Grid */}
        <div ref={statsRef} className="grid grid-cols-2 gap-4 md:gap-6 mt-2 md:mt-4">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5, borderColor: "var(--foreground)" }}
            className="border border-border p-4 md:p-6 bg-background/50 backdrop-blur-md transition-colors relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              <ArrowUpRight size={16} className="text-foreground/50" />
            </div>
            <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase mb-2 md:mb-3">Total Revenue</div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-mono text-foreground tracking-tighter">$133.91<span className="text-sm lg:text-xl text-foreground/50">M</span></div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -5, borderColor: "var(--foreground)" }}
            className="border border-border p-4 md:p-6 bg-background/50 backdrop-blur-md transition-colors relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              <ArrowUpRight size={16} className="text-foreground/50" />
            </div>
            <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase mb-2 md:mb-3">Total Claims</div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-mono text-foreground/70 tracking-tighter">$16.91<span className="text-sm lg:text-xl text-foreground/40">M</span></div>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 font-mono text-[10px] md:text-xs text-foreground/50 uppercase pt-2">
          <span className="px-3 py-1 border border-border rounded-full">Power BI</span>
          <span className="px-3 py-1 border border-border rounded-full">Excel</span>
          <span className="px-3 py-1 border border-border rounded-full">DAX</span>
          <span className="px-3 py-1 border border-border rounded-full hidden sm:inline-block">Data Viz</span>
        </div>
      </div>
      
      {/* Visualization Container */}
      <div className="flex-[0.5] xl:flex-[0.6] w-full min-h-[300px] md:min-h-[400px] h-full border border-border relative overflow-hidden bg-background group mt-6 xl:mt-0">
        <div className="absolute top-4 left-4 z-20 font-mono text-[10px] md:text-xs text-foreground/50 pointer-events-none bg-background/50 px-2 py-1 backdrop-blur-sm rounded">
          [ R3F GLSL Render : Data Metrics ]
        </div>

        {/* Floating BMW Wireframe Image using mix-blend-mode to drop the black background */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none p-4 md:p-8">
          <img 
            ref={carRef}
            src="/bmw_neon_hud.jpg" 
            alt="BMW Wireframe" 
            className="w-full h-auto max-w-[900px] mix-blend-screen dark:mix-blend-screen mix-blend-multiply opacity-90 filter contrast-125 saturate-150"
            style={{ mixBlendMode: 'screen' }} 
          />
        </div>

        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-foreground/30 m-4 transition-transform group-hover:scale-110 z-20" />
        <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-foreground/30 m-4 transition-transform group-hover:scale-110 z-20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-foreground/30 m-4 transition-transform group-hover:scale-110 z-20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-foreground/30 m-4 transition-transform group-hover:scale-110 z-20" />

        {/* Background Network Nodes Animation */}
        <svg className="absolute inset-0 w-full h-full opacity-30 z-0 group-hover:opacity-60 transition-opacity duration-700">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M ${800 + i * 20} ${50 + i * 30} Q ${500 - i * 20} ${100 + (i % 3) * 80} -50 ${200 - i * 10}`}
              fill="transparent"
              stroke={`rgba(${i % 2 === 0 ? '0,255,200' : '100,200,255'}, ${0.1 + (i % 5)*0.1})`}
              strokeWidth={1 + (i % 3)}
              strokeDasharray={`${5 + i * 5} ${10 + i * 5}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1, strokeDashoffset: [0, 1000] }}
              transition={{ 
                duration: 4 + (i % 4) * 2, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.1
              }}
            />
          ))}
        </svg>

        <Canvas camera={{ position: [2, 3, 9], fov: 50 }} className="z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
          <ambientLight intensity={0.5} />
          <BarChart3D />
        </Canvas>
      </div>
    </div>
  );
}
