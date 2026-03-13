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
        className="pointer-events-auto flex justify-between items-center px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full w-full max-w-5xl"
      >
        <Link href="/">
          <div className="text-lg md:text-xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple cursor-pointer pr-6">
            PSK.SYS
          </div>
        </Link>

        <div className="hidden md:flex gap-6 lg:gap-8 items-center border-l border-white/10 pl-6 lg:pl-8">
          {navItems.map((item, idx) => (
            <Link key={idx} href={item.href}>
              <span className="text-xs lg:text-sm font-inter tracking-widest text-gray-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300 relative group cursor-pointer uppercase">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon-cyan transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              </span>
            </Link>
          ))}

          {/* Resume — highlighted separately */}
          <Link href="/resume">
            <span className="text-xs lg:text-sm font-orbitron tracking-widest text-neon-purple border border-neon-purple/50 px-3 py-1 rounded-full hover:bg-neon-purple hover:text-white hover:shadow-[0_0_12px_rgba(191,0,255,0.5)] transition-all duration-300 uppercase cursor-pointer">
              Resume
            </span>
          </Link>
        </div>

        <div className="hidden md:block ml-auto">
          <a
            href="#contact"
            className="px-5 py-2 rounded-full border border-neon-cyan text-neon-cyan font-orbitron text-xs hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] hover:bg-neon-cyan hover:text-black transition-all duration-300 uppercase tracking-widest relative overflow-hidden group inline-block"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 h-full w-0 bg-neon-cyan transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
