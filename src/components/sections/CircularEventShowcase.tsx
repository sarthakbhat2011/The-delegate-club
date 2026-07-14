"use client";

import { useRef, useState, Suspense, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Preload, Lightformer, Icosahedron, Sphere, Octahedron, Cone, MeshTransmissionMaterial, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const events = [
  { id: "hackathon", title: "Elite Hackathons", desc: "48 hours of intense coding, judged by top-tier VCs." },
  { id: "mun", title: "Model UN", desc: "High-level geopolitical debate with global delegates." },
  { id: "sharktank", title: "Shark Tank", desc: "Pitch revolutionary ideas and secure seed funding." },
  { id: "socials", title: "Premium Socials", desc: "Exclusive Sufi nights, galas, and photo booths." },
  { id: "auctions", title: "Charity Auctions", desc: "Exclusive bidding events where luxury meets philanthropy." }
];

// --- 3D Models ---

function HackathonModel({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const targetScale = active ? 1 : 0;
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Icosahedron args={[1.2, 1]}>
          <meshStandardMaterial color="#B8001F" wireframe />
        </Icosahedron>
        <Icosahedron args={[0.8, 0]}>
          <MeshTransmissionMaterial 
            background={new THREE.Color("#4A0010")}
            color="#FFFFFF"
            transmission={0.9}
            thickness={1}
            roughness={0}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

function MUNModel({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const targetScale = active ? 1 : 0;
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 32, 32]}>
          <meshStandardMaterial color="#4A0010" roughness={0.7} metalness={0.2} />
        </Sphere>
        <Sphere args={[1.52, 16, 16]}>
          <meshStandardMaterial color="#D4AF37" wireframe transparent opacity={0.3} />
        </Sphere>
      </Float>
    </group>
  );
}

function SharktankModel({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const targetScale = active ? 1 : 0;
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Cone args={[1, 2.5, 4]} rotation={[0, 0, Math.PI]}>
          <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
        </Cone>
      </Float>
    </group>
  );
}

function SocialsModel({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const targetScale = active ? 1 : 0;
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.4, 64, 64]}>
          <MeshDistortMaterial color="#B8001F" distort={0.4} speed={2} roughness={0} metalness={1} clearcoat={1} />
        </Sphere>
      </Float>
    </group>
  );
}

function AuctionsModel({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const targetScale = active ? 1 : 0;
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1;
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Octahedron args={[1.5, 0]}>
          <MeshTransmissionMaterial 
            background={new THREE.Color("#000000")}
            color="#D4AF37"
            transmission={0.9}
            thickness={2}
            roughness={0}
            chromaticAberration={0.1}
          />
        </Octahedron>
      </Float>
    </group>
  );
}

// --- Main Component ---

export function CircularEventShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate rotation for the circle
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const circleRotation = useTransform(smoothProgress, [0, 1], [0, -360]);

  // Framer Motion hook to track scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * events.length), events.length - 1);
    setActiveIndex(index);
  });

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-[var(--color-brand-deep-indigo)] border-t border-white/5">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Ambient Lighting based on active index */}
        <div className="absolute inset-0 z-0 transition-colors duration-1000" style={{
          background: activeIndex === 0 ? 'radial-gradient(circle at 50% 50%, rgba(255,153,51,0.15) 0%, transparent 70%)' :
                      activeIndex === 1 ? 'radial-gradient(circle at 50% 50%, rgba(255,195,0,0.12) 0%, transparent 70%)' :
                      activeIndex === 2 ? 'radial-gradient(circle at 50% 50%, rgba(19,136,8,0.15) 0%, transparent 70%)' :
                      activeIndex === 3 ? 'radial-gradient(circle at 50% 50%, rgba(193,92,61,0.18) 0%, transparent 70%)' :
                      'radial-gradient(circle at 50% 50%, rgba(255,153,51,0.2) 0%, transparent 70%)'
        }} />

        {/* 3D Canvas in the center */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
              <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#B8001F" />
              
              <HackathonModel active={activeIndex === 0} />
              <MUNModel active={activeIndex === 1} />
              <SharktankModel active={activeIndex === 2} />
              <SocialsModel active={activeIndex === 3} />
              <AuctionsModel active={activeIndex === 4} />
              
              <Environment resolution={256}>
                <group rotation={[-Math.PI / 4, -0.3, 0]}>
                  <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
                  <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#B8001F" />
                  <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[5, -1, -1]} scale={[10, 2, 1]} color="#D4AF37" />
                </group>
              </Environment>
              <Preload all />
            </Suspense>
          </Canvas>
        </div>

        {/* Circular Text UI */}
        <div className="absolute z-20 w-[150vw] h-[150vw] md:w-[70vw] md:h-[70vw] rounded-full border border-white/5 left-[-75vw] md:left-[-35vw] top-1/2 -translate-y-1/2">
          <motion.div 
            className="w-full h-full relative"
            style={{ rotate: circleRotation }}
          >
            {events.map((event, i) => {
              // Distribute items evenly around the circle
              const angle = (i / events.length) * 360;
              return (
                <div 
                  key={event.id}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    transform: `translate(0, -50%) rotate(${angle}deg)`,
                    width: '50%'
                  }}
                >
                  <div 
                    className="absolute right-0 translate-x-1/2 md:translate-x-full text-right pr-12 md:pr-16"
                    style={{ transform: `rotate(${-angle}deg)` }} // keep text upright relative to page
                  >
                    <motion.div 
                      initial={false}
                      animate={{ 
                        opacity: activeIndex === i ? 1 : 0.3,
                        scale: activeIndex === i ? 1.2 : 0.8,
                        color: activeIndex === i ? '#FFFFFF' : '#A0A0A0'
                      }}
                      transition={{ duration: 0.5 }}
                      className="font-serif italic font-bold text-3xl md:text-5xl whitespace-nowrap drop-shadow-lg"
                    >
                      {event.title}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Active Event Description Box */}
        <div className="absolute right-8 md:right-32 bottom-24 md:bottom-1/2 md:translate-y-1/2 z-30 w-[80vw] md:max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 rounded-2xl border-l-4 border-l-[var(--color-brand-primary)] shadow-2xl"
            >
              <h3 className="text-4xl font-serif text-white mb-4 bg-gradient-to-r from-white to-[#A0A0A0] text-transparent bg-clip-text">{events[activeIndex].title}</h3>
              <p className="text-[#C0C0C0] text-xl leading-relaxed">{events[activeIndex].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
