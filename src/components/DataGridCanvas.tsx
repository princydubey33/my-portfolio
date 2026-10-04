"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;
  
  // Create a grid
  vec2 grid = fract(st * 20.0);
  
  // Points
  float dist = length(grid - 0.5);
  float circle = smoothstep(0.1, 0.05, dist);
  
  // Add some breathing motion
  float breath = (sin(uTime * 2.0 + random(floor(st * 20.0)) * 10.0) * 0.5 + 0.5);
  circle *= breath * 0.8;
  
  // Subtle horizontal connecting lines
  float lineX = smoothstep(0.02, 0.0, abs(grid.y - 0.5)) * 0.2 * (sin(uTime + st.x * 10.0) * 0.5 + 0.5);
  float lineY = smoothstep(0.02, 0.0, abs(grid.x - 0.5)) * 0.2 * (cos(uTime + st.y * 10.0) * 0.5 + 0.5);
  
  float intensity = circle + lineX + lineY;
  
  gl_FragColor = vec4(uColor * intensity, intensity * 0.5);
}
`;

function GridShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { theme } = useTheme();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(theme === "dark" ? "#ffffff" : "#000000") },
      uResolution: { value: new THREE.Vector2(typeof window !== "undefined" ? window.innerWidth : 1000, typeof window !== "undefined" ? window.innerHeight : 1000) },
    }),
    [theme]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function DataGridCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 2]}
      >
        <GridShader />
      </Canvas>
    </div>
  );
}
