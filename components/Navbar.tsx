import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Tech", href: "#tech" },
  { name: "Achievements", href: "#achievements" },
  { name: "Projects", href: "#projects" },
  { name: "Github", href: "#stats" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-auto relative flex justify-between items-center px-6 md:px-8 py-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full w-full max-w-[1200px]"
      >
        {/* Left Side: Logo */}
        <Link href="/" className="z-20 shrink-0">
          <div className="text-xl md:text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple cursor-pointer whitespace-nowrap">
            PSK.SYS
          </div>
        </Link>

        {/* Middle: Navigation Links (Absolutely Centered) */}
        <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none z-10 w-full overflow-hidden">
          <div className="flex gap-4 lg:gap-8 items-center pointer-events-auto px-4">
            {navItems.map((item, idx) => (
              <Link key={idx} href={item.href}>
                <span className="text-[11px] lg:text-sm font-inter tracking-widest text-gray-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300 relative group cursor-pointer uppercase whitespace-nowrap">
                  {item.name}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-neon-cyan transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Actions (Resume & Hire Me) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 z-20 shrink-0">
          <Link href="/resume">
            <span className="flex items-center justify-center font-orbitron tracking-widest text-neon-purple border border-neon-purple/50 px-5 lg:px-6 h-9 lg:h-10 rounded-full hover:bg-neon-purple hover:text-white hover:shadow-[0_0_15px_rgba(191,0,255,0.6)] transition-all duration-300 uppercase cursor-pointer text-xs lg:text-sm group relative overflow-hidden whitespace-nowrap">
              <span className="relative z-10">Resume</span>
              <div className="absolute inset-0 h-full w-0 bg-neon-purple transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </span>
          </Link>

          <a
            href="#contact"
            className="flex items-center justify-center font-orbitron tracking-widest text-neon-cyan border border-neon-cyan/50 px-5 lg:px-6 h-9 lg:h-10 rounded-full hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-300 uppercase cursor-pointer text-xs lg:text-sm group relative overflow-hidden whitespace-nowrap"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 h-full w-0 bg-neon-cyan transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
