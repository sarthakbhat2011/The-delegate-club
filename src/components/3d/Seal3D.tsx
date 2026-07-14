"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere, Lightformer, Preload } from "@react-three/drei";
import * as THREE from "three";

function LiquidSeal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#B8001F"
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </Sphere>
      
      {/* Golden accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={2.2}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
      </mesh>
      
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={2.4}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} opacity={0.5} transparent />
      </mesh>
    </Float>
  );
}

export function Seal3D() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#D4AF37" />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#B8001F" />
          
          <LiquidSeal />
          
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} color="#ffffff" />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} color="#B8001F" />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={2} color="#D4AF37" />
              <Lightformer form="ring" color="#B8001F" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
            </group>
          </Environment>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
