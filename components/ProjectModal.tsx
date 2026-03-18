"use client";
import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Project } from "@/data/projectsData";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Corner bracket decoration
const CornerBracket = ({ position }: { position: string }) => {
  const base = "absolute w-5 h-5 pointer-events-none";
  const styles: Record<string, string> = {
    tl: `${base} top-0 left-0 border-t-2 border-l-2 border-neon-cyan/40`,
    tr: `${base} top-0 right-0 border-t-2 border-r-2 border-neon-cyan/40`,
    bl: `${base} bottom-0 left-0 border-b-2 border-l-2 border-neon-purple/40`,
    br: `${base} bottom-0 right-0 border-b-2 border-r-2 border-neon-purple/40`,
  };
  return (
    <motion.div
      className={styles[position]}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    />
  );
};

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.08, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-lg"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-5xl rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_80px_rgba(0,240,255,0.12),0_0_160px_rgba(191,0,255,0.06),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            {/* Animated scan line */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent pointer-events-none z-30"
              initial={{ top: "0%" }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Glass inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none z-0 rounded-2xl" />

            {/* Corner brackets */}
            <div className="absolute inset-4 pointer-events-none z-20">
              <CornerBracket position="tl" />
              <CornerBracket position="tr" />
              <CornerBracket position="bl" />
              <CornerBracket position="br" />
            </div>

            {/* Close button
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:bg-white/10 transition-all duration-300"
            >
              <FaTimes size={14} />
            </button> */}

            {/* Content */}
            <div className="p-8 md:p-10 lg:p-12">
              {/* Header with status indicator */}
              <motion.div
                custom={0}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                {/* Status bar */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{
                      boxShadow: [
                        "0 0 4px rgba(74,222,128,0.4)",
                        "0 0 12px rgba(74,222,128,0.8)",
                        "0 0 4px rgba(74,222,128,0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-orbitron text-green-400/80 tracking-[0.3em] uppercase">
                    Project Active
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-green-400/20 to-transparent" />
                </div>

                <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple mb-3 leading-tight">
                  {project.title}
                </h2>
                <p className="text-gray-400 font-inter text-sm leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </motion.div>

              {/* Tech tags with stagger */}
              <motion.div
                custom={1}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-2 mb-8"
              >
                {project.tech.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="text-[10px] font-orbitron tracking-wider text-neon-cyan bg-white/[0.06] backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 uppercase hover:bg-white/10 hover:border-neon-cyan/30 hover:shadow-[0_0_10px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>

              {/* 3-column grid */}
              <motion.div
                custom={2}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
              >
                {/* Overview */}
                <div className="group/card relative bg-white/[0.04] backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-neon-cyan/25 hover:bg-white/[0.06] transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/[0.03] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                  <h3 className="relative text-xs font-orbitron text-neon-cyan tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
                    Overview
                  </h3>
                  <p className="relative text-gray-300 font-inter text-sm leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* Problem */}
                <div className="group/card relative bg-white/[0.04] backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-red-400/25 hover:bg-white/[0.06] transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-red-400/[0.03] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                  <h3 className="relative text-xs font-orbitron text-red-400 tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]" />
                    Problem
                  </h3>
                  <p className="relative text-gray-300 font-inter text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="group/card relative bg-white/[0.04] backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-green-400/25 hover:bg-white/[0.06] transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-green-400/[0.03] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                  <h3 className="relative text-xs font-orbitron text-green-400 tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                    Solution
                  </h3>
                  <p className="relative text-gray-300 font-inter text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </motion.div>

              {/* Bottom bar: buttons + decorative line */}
              <motion.div
                custom={3}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="h-px bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-transparent mb-6" />
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 px-6 py-3 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl font-orbitron text-xs text-gray-300 hover:text-white hover:border-white/25 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-all duration-300 uppercase tracking-widest"
                  >
                    <FaGithub
                      size={16}
                      className="group-hover:drop-shadow-[0_0_8px_#fff] transition-all"
                    />
                    Source Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 px-6 py-3 bg-neon-cyan/[0.08] backdrop-blur-sm border border-neon-cyan/20 rounded-xl font-orbitron text-xs text-neon-cyan hover:bg-neon-cyan/15 hover:border-neon-cyan/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all duration-300 uppercase tracking-widest"
                  >
                    Live Demo
                    <FaExternalLinkAlt
                      size={10}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>

                  {/* Decorative system info */}
                  <div className="ml-auto hidden md:flex items-center gap-3 text-[9px] font-orbitron text-gray-600 tracking-widest uppercase">
                    <span>SYS.PROJECT</span>
                    <span className="text-neon-cyan/30">●</span>
                    <span>{project.tech.length} MODULES</span>
                    <span className="text-neon-purple/30">●</span>
                    <span>v1.0</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
