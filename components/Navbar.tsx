"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Tech", href: "#tech" },
  { name: "Achievements", href: "#achievements" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Github", href: "#stats" },
  { name: "Contact", href: "#contact" },
];

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

// Glitch Logo text
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
      setDisplayText(() =>
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
      iteration += 1 / 2;
    }, 40);
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-crosshair transition-colors duration-300"
    >
      {displayText}
    </span>
  );
};

export default function Navbar() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  
  // Mouse tracking for glowing border
  const navRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-auto relative rounded-full w-full max-w-[1200px] group shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        ref={navRef}
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic Glow Border Layer */}
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.8), transparent 100%)`,
          }}
        />

        {/* Inner Content Layer */}
        <div className="relative flex justify-between items-center px-6 md:px-8 py-3 bg-black/70 backdrop-blur-xl rounded-full m-[1px] z-10">
          
          {/* Left Side: Logo */}
          <Link href="/" className="z-20 shrink-0">
            <div className="text-xl md:text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple cursor-pointer whitespace-nowrap">
              <HoverGlitchText text="PSK.SYS" />
            </div>
          </Link>

          {/* Middle: Navigation Links with Sliding Pill */}
          <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none z-10 w-full">
            <ul 
              className="flex items-center gap-1 pointer-events-auto"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {navItems.map((item, idx) => {
                const isHovered = hoveredNav === item.name;
                
                return (
                  <li
                    key={idx}
                    className="relative px-3 py-2 cursor-pointer"
                    onMouseEnter={() => setHoveredNav(item.name)}
                  >
                    <Link href={item.href} className={`relative z-10 text-[11px] lg:text-sm font-inter tracking-widest uppercase transition-colors duration-300 ${isHovered ? 'text-black font-bold' : 'text-gray-300 hover:text-white'}`}>
                      {item.name}
                    </Link>
                    
                    {/* The sliding pill background */}
                    {isHovered && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-neon-cyan rounded-full shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Side: Actions (Resume & Hire Me) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 z-20 shrink-0">
            <MagneticWrap>
              <Link href="/resume">
                <span className="flex items-center justify-center font-orbitron tracking-widest text-neon-purple border border-neon-purple/50 px-5 lg:px-6 h-9 lg:h-10 rounded-full hover:bg-neon-purple hover:text-white hover:shadow-[0_0_15px_rgba(191,0,255,0.6)] transition-all duration-300 uppercase cursor-pointer text-xs lg:text-[13px] group relative overflow-hidden whitespace-nowrap bg-black/50">
                  <span className="relative z-10 font-bold">Resume</span>
                </span>
              </Link>
            </MagneticWrap>

            <MagneticWrap>
              <a
                href="#contact"
                className="flex items-center justify-center font-orbitron tracking-widest text-neon-cyan border border-neon-cyan/50 px-5 lg:px-6 h-9 lg:h-10 rounded-full hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-300 uppercase cursor-pointer text-xs lg:text-[13px] group relative overflow-hidden whitespace-nowrap bg-black/50"
              >
                <span className="relative z-10 font-bold">Hire Me</span>
              </a>
            </MagneticWrap>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
