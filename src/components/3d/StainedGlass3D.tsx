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
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!mounted || !isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      // Scale scroll translation offset (0.12 parallax speed)
      el.style.setProperty("--scroll-offset", `${window.scrollY * 0.12}px`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, isMobile]);

  // 1. Mobile specific rendering: High-performance, highly detailed Gothic Rose window SVG illustration with parallax
  // Render this immediately on initial render/SSR/hydration to prevent Three.js flashes
  if (!mounted || isMobile) {
    return (
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-[120%] overflow-hidden bg-transparent z-0 pointer-events-none select-none flex items-center justify-center"
        style={{ 
          transform: "translate3d(0, calc(-1 * var(--scroll-offset, 0px)), 0)",
          transition: "transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)"
        }}
      >
        <svg 
          className="w-[90%] max-w-lg h-[95vh] opacity-25 dark:opacity-15 drop-shadow-[0_0_30px_rgba(225,29,72,0.1)] text-black dark:text-white" 
          viewBox="0 0 100 150" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gothic Cathedral Window Pointer Outer Arch */}
          <path d="M10,140 L10,65 Q10,10 50,10 Q90,10 90,65 L90,140 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />

          {/* Central Rose Window Medallion */}
          <circle cx="50" cy="42" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
          
          {/* Rose Window Petal Wedges */}
          <polygon points="50,42 50,26 56,29 50,42" fill="#e11d48" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="50,42 66,42 63,48 50,42" fill="#2563eb" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="50,42 50,58 44,55 50,42" fill="#d97706" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="50,42 34,42 37,36 50,42" fill="#059669" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="50,42 61,31 66,36 50,42" fill="#7c3aed" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="50,42 61,53 56,58 50,42" fill="#e11d48" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="50,42 39,53 34,48 50,42" fill="#2563eb" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="50,42 39,31 44,26 50,42" fill="#d97706" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />

          {/* Lancet 1 (Left window pane) */}
          <path d="M15,135 L15,75 Q15,55 25,55 Q35,55 35,75 L35,135 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M15,135 L15,115 L35,115 L35,135 Z" fill="#2563eb" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />
          <path d="M15,115 L15,95 L35,95 L35,115 Z" fill="#e11d48" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />
          <path d="M15,95 L15,75 Q15,55 25,55 Q35,55 35,75 L35,95 Z" fill="#7c3aed" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />

          {/* Lancet 2 (Center tall window pane) */}
          <path d="M40,138 L40,70 Q40,48 50,48 Q60,48 60,70 L60,138 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M40,138 L40,118 L60,118 L60,138 Z" fill="#d97706" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />
          <path d="M40,118 L40,98 L60,98 L60,118 Z" fill="#059669" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />
          <path d="M40,98 L40,70 Q40,48 50,48 Q60,48 60,70 L60,98 Z" fill="#e11d48" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />

          {/* Lancet 3 (Right window pane) */}
          <path d="M65,135 L65,75 Q65,55 75,55 Q85,55 85,75 L85,135 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M65,135 L65,115 L85,115 L85,135 Z" fill="#2563eb" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />
          <path d="M65,115 L65,95 L85,95 L85,115 Z" fill="#e11d48" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />
          <path d="M65,95 L65,75 Q65,55 75,55 Q85,55 85,75 L85,95 Z" fill="#7c3aed" className="opacity-60" stroke="currentColor" strokeWidth="0.4" />

          {/* Traceries & Geometric Fillers */}
          <circle cx="25" cy="50" r="3" fill="#d97706" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="75" cy="50" r="3" fill="#d97706" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
          <path d="M36,55 Q50,45 64,55" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <polygon points="50,15 47,24 53,24" fill="#059669" className="opacity-70" stroke="currentColor" strokeWidth="0.4" />
        </svg>
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
