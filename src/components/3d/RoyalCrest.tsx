"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Icosahedron, ContactShadows, Lightformer, Preload } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register useGSAP
gsap.registerPlugin(useGSAP);

function CrestMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Base rotation
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.z += delta * 0.1;

    // React to mouse
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.05);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX * 0.5, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY * 0.5, 0.05);
  });

  return (
    <Float floatIntensity={1.5} rotationIntensity={1} speed={1.5}>
      <Icosahedron ref={meshRef} args={[1.5, 0]} castShadow>
        <MeshTransmissionMaterial 
          background={new THREE.Color("#4A0010")}
          color="#E8E8E8"
          transmission={0.9}
          thickness={1.5}
          roughness={0.1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
        />
      </Icosahedron>
      
      {/* Outer Golden Wireframe for that "Royal" feel */}
      <Icosahedron args={[1.55, 0]}>
        <meshStandardMaterial 
          color="#D4AF37" 
          wireframe 
          transparent 
          opacity={0.3} 
          roughness={0.2}
          metalness={0.8}
        />
      </Icosahedron>
    </Float>
  );
}

export function RoyalCrest() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#FFFFFF" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#C0C0C0" />
          <directionalLight position={[0, 0, 10]} intensity={1.5} color="#D4AF37" />
          
          <CrestMesh />
          
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
              <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[5, -1, -1]} scale={[10, 2, 1]} />
              <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
            </group>
          </Environment>
          
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            color="#000000"
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
