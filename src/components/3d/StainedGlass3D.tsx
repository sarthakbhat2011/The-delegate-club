"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import * as THREE from "three";

// Individual Stained Glass Panel (Used for PC/Laptop 3D view)
interface GlassPanelProps {
  position: [number, number, number];
  color: string;
  args: [number, number, number];
  rotation: [number, number, number];
  scrollProgress: { current: number };
  index: number;
}

function GlassPanel({ position, color, args, rotation, scrollProgress, index }: GlassPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use target values for lerping
  const initialZ = position[2];
  const initialY = position[1];
  const initialX = position[0];

  useFrame((state) => {
    if (!meshRef.current) return;

    const progress = scrollProgress.current;
    
    // As user scrolls, panels float outwards in Z, rotate around Y, and offset slightly in Y
    // Different panels float differently based on their index (creates an explosion/assembly effect)
    const floatOffsetZ = progress * 6 * (index % 2 === 0 ? 1 : -0.7);
    const floatOffsetY = progress * 1.5 * Math.sin(index * 2);
    const floatOffsetX = progress * 2.5 * Math.cos(index * 1.5);
    const scrollRotY = progress * Math.PI * 0.8 * (index % 2 === 0 ? 1 : -1);
    const scrollRotX = progress * Math.PI * 0.25;

    // Mouse influence (tactile hover response)
    const mouseX = (state.pointer.x * Math.PI) / 8;
    const mouseY = (state.pointer.y * Math.PI) / 8;

    // Apply lerped values
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, initialZ + floatOffsetZ, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, initialY + floatOffsetY, 0.08);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, initialX + floatOffsetX, 0.08);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotation[0] + scrollRotX + mouseY, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation[1] + scrollRotY + mouseX, 0.08);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, rotation[2] + (progress * 0.2), 0.08);
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshPhysicalMaterial
        color={color}
        transmission={0.9}
        thickness={1.2}
        roughness={0.05}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        ior={1.5}
        metalness={0.1}
        transparent
      />
    </mesh>
  );
}

// Stained Glass Window Assembly Group (Used for PC/Laptop 3D view)
function GlassAssembly() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);

  // Sync scroll height progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollProgress.current = window.scrollY / totalScroll;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Standard Stained Glass Panels configuration
  const panels = useMemo(() => [
    // Left Tall Panels (Sapphire Blue, Ruby Red)
    { position: [-2.1, 0, 0], color: "#2563eb", args: [0.6, 5, 0.15], rotation: [0, 0, 0] },
    { position: [-1.4, 0.5, 0.1], color: "#e11d48", args: [0.6, 4, 0.15], rotation: [0, 0.05, 0.05] },
    
    // Central Gothic Arch style panels (Amethyst Purple, Amber Gold, Rose Ruby)
    { position: [-0.7, -0.2, -0.1], color: "#7c3aed", args: [0.6, 4.4, 0.15], rotation: [0, -0.05, -0.05] },
    { position: [0, 0.8, 0.2], color: "#d97706", args: [0.6, 3.2, 0.15], rotation: [0, 0, 0] },
    { position: [0.7, -0.2, -0.1], color: "#7c3aed", args: [0.6, 4.4, 0.15], rotation: [0, 0.05, 0.05] },

    // Right Tall Panels (Ruby Red, Sapphire Blue)
    { position: [1.4, 0.5, 0.1], color: "#e11d48", args: [0.6, 4, 0.15], rotation: [0, -0.05, -0.05] },
    { position: [2.1, 0, 0], color: "#2563eb", args: [0.6, 5, 0.15], rotation: [0, 0, 0] },
    
    // Central circular rose window piece floating in front
    { position: [0, -1.5, 0.4], color: "#059669", args: [1.2, 1.2, 0.2], rotation: [0, 0, Math.PI / 4] }
  ], []);

  // Structural dark "Lead Lines" (creating the mosaic frame)
  const leadLines = useMemo(() => [
    // Outer Vertical Borders
    { position: [-2.45, 0, 0], args: [0.1, 5.2, 0.22] },
    { position: [2.45, 0, 0], args: [0.1, 5.2, 0.22] },
    
    // Inner vertical separators
    { position: [-1.75, 0.2, 0.05], args: [0.1, 4.8, 0.22] },
    { position: [-1.05, 0.1, 0], args: [0.1, 4.6, 0.22] },
    { position: [-0.35, 0.3, 0.05], args: [0.1, 4.2, 0.22] },
    { position: [0.35, 0.3, 0.05], args: [0.1, 4.2, 0.22] },
    { position: [1.05, 0.1, 0], args: [0.1, 4.6, 0.22] },
    { position: [1.75, 0.2, 0.05], args: [0.1, 4.8, 0.22] },

    // Top horizontal arch caps
    { position: [0, 2.45, 0.1], args: [5, 0.1, 0.22] },
    { position: [0, -2.45, 0.1], args: [5, 0.1, 0.22] }
  ], []);

  // Animating the lead frames
  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollProgress.current;

    // Frame slowly expands and rotates as a whole
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, progress * 4, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, progress * 0.3, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, progress * -0.15, 0.08);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
        {/* Render individual glass panels */}
        {panels.map((p, idx) => (
          <GlassPanel
            key={idx}
            index={idx}
            position={p.position as [number, number, number]}
            color={p.color}
            args={p.args as [number, number, number]}
            rotation={p.rotation as [number, number, number]}
            scrollProgress={scrollProgress}
          />
        ))}

        {/* Render Lead Lines (Black Metallic Framing) */}
        {leadLines.map((l, idx) => (
          <mesh key={`lead-${idx}`} position={l.position as [number, number, number]} castShadow receiveShadow>
            <boxGeometry args={l.args as [number, number, number]} />
            <meshStandardMaterial
              color="#09090b"
              roughness={0.65}
              metalness={0.9}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export function StainedGlass3D() {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile first during SSR/hydration
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      // Treat touch devices and screen widths below 768px as mobile
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 1. Mobile specific rendering: High-performance, clean, hardware-accelerated animated SVG mosaic
  // Render this immediately on initial render/SSR/hydration to prevent Three.js flashes
  if (!mounted || isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-transparent z-0 pointer-events-none select-none transition-opacity duration-700 ease-out">
        <svg className="w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Custom color shifting glass polygon panels */}
          <polygon points="0,0 30,0 20,30 0,20" className="mobile-glass-pane fill-rose-500/25" style={{ animationDuration: "8s" }} />
          <polygon points="30,0 70,0 60,35 20,30" className="mobile-glass-pane fill-amber-500/25" style={{ animationDuration: "10s", animationDelay: "1s" }} />
          <polygon points="70,0 100,0 100,25 60,35" className="mobile-glass-pane fill-blue-500/25" style={{ animationDuration: "12s", animationDelay: "2s" }} />
          
          <polygon points="0,20 20,30 15,60 0,55" className="mobile-glass-pane fill-purple-500/25" style={{ animationDuration: "9s", animationDelay: "0.5s" }} />
          <polygon points="20,30 60,35 50,70 15,60" className="mobile-glass-pane fill-emerald-500/25" style={{ animationDuration: "11s", animationDelay: "1.5s" }} />
          <polygon points="60,35 100,25 100,60 50,70" className="mobile-glass-pane fill-rose-500/25" style={{ animationDuration: "8s", animationDelay: "2.5s" }} />
          
          <polygon points="0,55 15,60 10,100 0,100" className="mobile-glass-pane fill-amber-500/25" style={{ animationDuration: "11s", animationDelay: "1s" }} />
          <polygon points="15,60 50,70 45,100 10,100" className="mobile-glass-pane fill-blue-500/25" style={{ animationDuration: "9s", animationDelay: "3s" }} />
          <polygon points="50,70 100,60 100,100 45,100" className="mobile-glass-pane fill-purple-500/25" style={{ animationDuration: "10s", animationDelay: "2s" }} />
          
          {/* Mosaic leaded framing grid overlay */}
          <line x1="30" y1="0" x2="20" y2="30" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="70" y1="0" x2="60" y2="35" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="20" y1="30" x2="0" y2="20" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="60" y1="35" x2="20" y2="30" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="100" y1="25" x2="60" y2="35" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="15" y1="60" x2="0" y2="55" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="50" y1="70" x2="15" y2="60" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="100" y1="60" x2="50" y2="70" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="15" y1="60" x2="10" y2="100" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
          <line x1="50" y1="70" x2="45" y2="100" stroke="currentColor" className="text-black/35 dark:text-white/35" strokeWidth="0.4" />
        </svg>

        {/* Soft rotating colored light overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 via-transparent to-blue-500/5 mix-blend-overlay animate-[spin_40s_infinite_linear] pointer-events-none" />
      </div>
    );
  }

  // 2. Desktop/Laptop specific rendering: Interactive 3D WebGL Canvas
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none opacity-90 dark:opacity-85 transition-opacity duration-700 ease-in">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          
          {/* Main Backlighting casting colored glass rays */}
          <directionalLight position={[0, 0, -10]} intensity={4.5} color="#ffffff" castShadow />
          <spotLight position={[5, 10, -5]} angle={0.25} penumbra={1} intensity={3.5} color="#d97706" />
          <spotLight position={[-5, 10, -5]} angle={0.25} penumbra={1} intensity={3.5} color="#e11d48" />
          <spotLight position={[0, -10, 5]} angle={0.4} penumbra={1} intensity={2} color="#2563eb" />
          
          <GlassAssembly />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
