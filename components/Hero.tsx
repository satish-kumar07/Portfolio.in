"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import DecryptText from "@/components/fonts/DecryptText";

// Magnetic Hover Wrapper
const MagneticWrap = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Quick Glitch Hover Component
const HoverGlitchText = ({ text }: { text: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            if (letter === " ") return " ";
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-crosshair inline-block hover:text-white transition-colors duration-300"
    >
      {displayText}
    </span>
  );
};

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Normalized mouse position (-1 to 1) for 3D parallax
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  // Parallax Tilt values
  const rotateX = useTransform(normY, [-1, 1], [15, -15]);
  const rotateY = useTransform(normX, [-1, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      normX.set((e.clientX / window.innerWidth - 0.5) * 2);
      normY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, normX, normY]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.setAttribute("download", "Satish_Kumar_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20 perspective-1000">
      {/* Dynamic Cursor Glow for Hero */}
      <motion.div
        className="absolute pointer-events-none z-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="absolute pointer-events-none z-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-70%",
          translateY: "-30%",
        }}
      />
      
      <div className="relative z-10 px-4 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-24 w-full">
        {/* Left Side: Information */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-neon-cyan font-orbitron tracking-[0.3em] uppercase text-xs md:text-sm mb-6 opacity-80 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              System Online // Access Granted
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black font-orbitron mb-4 leading-[1.1] tracking-tight text-white drop-shadow-md cursor-crosshair">
              <span className="block hover:text-white/80 transition-colors duration-300">
                <DecryptText
                  text="PRAJAPATI"
                  speed={35}
                  revealFrames={10}
                  startDelay={600}
                  className="block"
                />
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple relative inline-block transition-all duration-500 hover:brightness-125" style={{ filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.4))' }}>
                <DecryptText
                  text="SATISH KUMAR"
                  speed={35}
                  revealFrames={12}
                  startDelay={1200}
                />
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg md:text-xl font-inter text-gray-400 mb-6 font-medium tracking-wide">
              <HoverGlitchText text="AI Developer" /> <span className="text-neon-cyan/50 mx-2">|</span> <HoverGlitchText text="Full Stack Developer" /> <span className="text-neon-cyan/50 mx-2">|</span> <HoverGlitchText text="Problem Solver" />
            </p>
            <p className="text-base md:text-lg font-inter text-gray-500 mb-12 italic tracking-wide max-w-2xl leading-relaxed cursor-default selection:bg-neon-purple/30 selection:text-white">
              &quot;Building intelligent systems and futuristic digital experiences that bridge the gap between imagination and execution.&quot;
            </p>
          </motion.div>

          {/* Action Buttons with Magnetic Physics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 mb-16 justify-center lg:justify-start"
          >
            <MagneticWrap>
              <a href="#projects" className="group relative px-8 py-3.5 bg-neon-cyan/10 text-neon-cyan font-orbitron text-sm tracking-widest uppercase rounded-sm border border-neon-cyan/50 hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center">
                <span className="relative z-10 font-bold">View Projects</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </a>
            </MagneticWrap>

            <MagneticWrap>
              <a href="#contact" className="group relative px-8 py-3.5 bg-transparent text-gray-300 font-orbitron text-sm tracking-widest uppercase rounded-sm border border-white/20 hover:border-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 overflow-hidden flex items-center justify-center shadow-[inset_0_0_0_rgba(255,255,255,0)] hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]">
                <span className="relative z-10">Contact Me</span>
              </a>
            </MagneticWrap>

            <MagneticWrap>
              <button onClick={handleDownload} className="group relative px-8 py-3.5 bg-transparent text-neon-purple font-orbitron text-sm tracking-widest uppercase rounded-sm border border-neon-purple/50 hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_rgba(191,0,255,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center">
                <span className="relative z-10 font-bold">Download Resume</span>
                <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
            </MagneticWrap>
          </motion.div>

          {/* Magnetic Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex gap-10 items-center justify-center lg:justify-start"
          >
            <MagneticWrap>
              <a href="https://github.com/satish-kumar07" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 group inline-block p-2">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs font-orbitron tracking-widest uppercase">GitHub</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                </div>
              </a>
            </MagneticWrap>

            <MagneticWrap>
              <a href="https://www.linkedin.com/in/satish-kumar-prajapati/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 group inline-block p-2">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs font-orbitron tracking-widest uppercase">LinkedIn</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-blue scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(0,123,255,0.8)]" />
                </div>
              </a>
            </MagneticWrap>

            <MagneticWrap>
              <a href="https://medium.com/@prajapatisatishkumar792" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 group inline-block p-2">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs font-orbitron tracking-widest uppercase">Medium</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                </div>
              </a>
            </MagneticWrap>
          </motion.div>
        </div>

        {/* Right Side: 3D Parallax Photo Container */}
        <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto relative" style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ rotateX, rotateY }}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full border border-white/10 shadow-[0_0_60px_rgba(0,240,255,0.15)] group transform-gpu preserve-3d"
          >
            {/* Subtle rotating glow ring behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan via-transparent to-neon-purple opacity-30 animate-[spin_8s_linear_infinite] rounded-full -z-10 translate-z-[-20px]" />

            <div className="absolute inset-2 md:inset-4 rounded-full overflow-hidden bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/5 z-10 translate-z-[20px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-photo.jpg"
                alt="Prajapati Satish Kumar"
                className="w-full h-full object-cover object-[center_top] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
              />
              {/* Holographic sweep on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/0 via-neon-cyan/20 to-neon-purple/0 opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none opacity-80 z-20"></div>
            </div>
            
            {/* Foreground floating particles/glow on hover */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-z-[50px] shadow-[inset_0_0_50px_rgba(0,240,255,0.2)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
