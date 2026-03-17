"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
// @ts-expect-error - maath does not have perfect TS definitions for this submodule
import * as random from "maath/random/dist/maath-random.esm";
import dynamic from "next/dynamic";
import { hyperspeedPresets } from "./HyperSpeedPresets";

// Dynamically import Hyperspeed with SSR disabled (it uses DOM APIs directly)
const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false });

function StarBackground(props: React.ComponentProps<typeof Points>) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none bg-[#050505] overflow-hidden">

      {/* ── Layer 1: Hyperspeed Road Lights (bottom) ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: 0.35,
          mixBlendMode: "screen",
        }}
      >
        <Hyperspeed
          effectOptions={{
            ...(hyperspeedPresets.one as any),
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0x131318,
              brokenLines: 0x131318,
              // Neon purple + cyan to match the portfolio theme
              leftCars: [0xbf00ff, 0x6750a2, 0xc247ac],
              rightCars: [0x00f0ff, 0x0e5ea5, 0x0033ff],
              sticks: 0x00f0ff,
            },
          }}
        />
      </div>

      {/* ── Layer 2: Colorful Orbs for Glassmorphism Refraction ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/20 blur-[120px] z-[2]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-cyan/20 blur-[120px] z-[2]" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-neon-blue/10 blur-[120px] z-[2]" />

      {/* ── Layer 3: Star Particles (top) ── */}
      <div className="absolute inset-0 z-[3]">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarBackground />
          <Preload all />
        </Canvas>
      </div>
    </div>
  );
}
