"use client";

import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";

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
  vec3 finalColor = isEdge ? uColor : uColor * (0.1 + scanline);
  
  gl_FragColor = vec4(finalColor, 0.95);
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

  // More data points to fill the expanded space
  const data = [1.2, 2.5, 1.8, 3.2, 2.1, 4.0, 2.8, 4.5, 3.1, 1.9, 5.2, 3.8, 2.4, 4.1];

  return (
    <group position={[-6.5, -3, 0]}>
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
  return (
    <div className="w-full h-[85vh] px-12 flex flex-col xl:flex-row-reverse gap-12 relative">
      <div className="flex-[0.4] flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <div className="text-xs font-mono text-foreground/50 uppercase border-b border-border pb-2 inline-flex items-center gap-2">
            Project.02 <span className="w-2 h-2 rounded-full bg-foreground inline-block animate-pulse" />
          </div>
          <h3 className="text-5xl lg:text-7xl font-sans font-bold leading-tight tracking-tighter">
            BMW Sales <br /> Analysis
          </h3>
        </div>
        <p className="font-mono text-sm lg:text-base text-foreground/70 leading-relaxed text-justify">
          Evaluated vehicle sales performance across 1,000+ BMW transaction records. Architected a multi-page interactive analytics platform mapping revenue patterns and channel performance across diverse vehicle classes and regional territories, reducing reporting latency by 40%.
        </p>
        
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5, borderColor: "var(--foreground)" }}
            className="border border-border p-6 bg-background/50 backdrop-blur-md transition-colors relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} className="text-foreground/50" />
            </div>
            <div className="text-xs font-mono text-foreground/50 uppercase mb-3">Total Revenue</div>
            <div className="text-4xl lg:text-5xl font-mono text-foreground tracking-tighter">$133.91<span className="text-lg lg:text-xl text-foreground/50">M</span></div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -5, borderColor: "var(--foreground)" }}
            className="border border-border p-6 bg-background/50 backdrop-blur-md transition-colors relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} className="text-foreground/50" />
            </div>
            <div className="text-xs font-mono text-foreground/50 uppercase mb-3">Total Claims</div>
            <div className="text-4xl lg:text-5xl font-mono text-foreground/70 tracking-tighter">$16.91<span className="text-lg lg:text-xl text-foreground/40">M</span></div>
          </motion.div>
        </div>

        <div className="flex gap-4 font-mono text-xs text-foreground/50 uppercase mt-4">
          <span className="px-3 py-1 border border-border rounded-full">Power BI</span>
          <span className="px-3 py-1 border border-border rounded-full">Excel</span>
          <span className="px-3 py-1 border border-border rounded-full">DAX</span>
        </div>
      </div>
      
      {/* Visualization Container */}
      <div className="flex-[0.6] h-full min-h-[400px] border border-border relative overflow-hidden bg-background group">
        <div className="absolute top-4 left-4 z-10 font-mono text-xs text-foreground/50">
          [ R3F GLSL Render : Data Metrics ]
        </div>

        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-foreground/30 m-4 transition-transform group-hover:scale-110" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-foreground/30 m-4 transition-transform group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-foreground/30 m-4 transition-transform group-hover:scale-110" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-foreground/30 m-4 transition-transform group-hover:scale-110" />

        <Canvas camera={{ position: [3, 4, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <BarChart3D />
        </Canvas>
      </div>
    </div>
  );
}
