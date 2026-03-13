"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function InteractiveCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Base mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring (follows with normal speed)
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  // Inner dot (follows fast/snappy)
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 400, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 400, mass: 0.1 });

  // Ambient glow (follows slow/laggy)
  const glowX = useSpring(mouseX, { damping: 50, stiffness: 100, mass: 2 });
  const glowY = useSpring(mouseY, { damping: 50, stiffness: 100, mass: 2 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <>
      {/* Outer Glowing Ring (32x32 centered) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-neon-cyan pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        style={{ x: ringX, y: ringY, opacity: isVisible ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-[4px]"></div>
      </motion.div>
      
      {/* Inner Dot (6x6 centered) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-white rounded-full pointer-events-none z-[10000] mix-blend-screen hidden md:block shadow-[0_0_10px_#fff]"
        style={{ x: dotX, y: dotY, opacity: isVisible ? 1 : 0 }}
      />
      
      {/* Follower ambient glow (256x256 centered) */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 -ml-32 -mt-32 bg-neon-purple/10 rounded-full blur-[60px] pointer-events-none z-[9998] mix-blend-screen hidden md:block"
        style={{ x: glowX, y: glowY, opacity: isVisible ? 0.6 : 0 }}
      />
    </>
  );
}
