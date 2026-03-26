"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <Link href="/">
          <motion.div
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-neon-cyan font-orbitron text-sm cursor-pointer group"
          >
            <FaArrowLeft className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            <span className="tracking-widest uppercase">Back to Base</span>
          </motion.div>
        </Link>

        <div className="text-xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
          RESUME.PDF
        </div>

        <a
          href="/resume.pdf"
          download="Satish_Kumar_Resume.pdf"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/50 text-neon-purple font-orbitron text-xs hover:bg-neon-purple hover:text-white transition-all duration-300 uppercase tracking-widest shadow-[0_0_15px_rgba(191,0,255,0.2)]"
        >
          <FaDownload />
          <span>Download</span>
        </a>
      </nav>

      {/* PDF Viewer Container */}
      <main className="relative z-10 w-full h-[calc(100vh-73px)] p-4 md:p-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm relative"
        >
          {/* Futuristic Border Glow */}
          <div className="absolute inset-0 border border-neon-cyan/20 pointer-events-none rounded-2xl" />

          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            className="w-full h-full border-none"
            title="Resume Viewer"
          />
        </motion.div>
      </main>

      {/* Footer Branding */}
      <div className="fixed bottom-4 left-4 z-20 pointer-events-none opacity-20 hidden md:block">
        <div className="text-[10px] font-orbitron tracking-[0.5em] text-neon-cyan">
          PSK.SYS_RESUME_VIEWER_V1.0
        </div>
      </div>
    </div>
  );
}
