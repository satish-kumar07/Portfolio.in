"use client";
import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Project } from "@/data/projectsData";

/* ─── Accent colors (same as Projects.tsx) ── */
const ACCENTS = ["#00f0ff", "#a855f7", "#f97316", "#34d399", "#ec4899"];

/* ─── Tab data ── */
const TABS = [
  { key: "overview", label: "Overview", color: "#00f0ff" },
  { key: "problem", label: "Problem", color: "#f87171" },
  { key: "solution", label: "Solution", color: "#4ade80" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projectIdx, setProjectIdx] = useState(0);

  // Reset tab when project changes
  useEffect(() => {
    if (project) {
      setActiveTab("overview");
      // Get project index for accent color
      const idx = (() => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const allProjects = require("@/data/projectsData").default;
          return allProjects.findIndex((p: Project) => p.slug === project.slug);
        } catch {
          return 0;
        }
      })();
      setProjectIdx(idx >= 0 ? idx : 0);
    }
  }, [project]);

  const accent = ACCENTS[projectIdx % ACCENTS.length];

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ESC to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const getTabContent = (tab: TabKey): string => {
    if (!project) return "";
    const map: Record<TabKey, string> = {
      overview: project.overview,
      problem: project.problem,
      solution: project.solution,
    };
    return map[tab];
  };

  const currentTabStyle = TABS.find((t) => t.key === activeTab);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center pt-20 pb-4 px-4 sm:pt-20 sm:pb-8 sm:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-full max-w-4xl max-h-full overflow-y-auto rounded-2xl"
            initial={{ scale: 0.95, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            style={{
              background: "linear-gradient(180deg, rgba(15,15,20,0.98) 0%, rgba(8,8,12,0.99) 100%)",
              border: `1px solid ${accent}20`,
              boxShadow: `0 0 60px ${accent}08, 0 25px 50px rgba(0,0,0,0.5)`,
            }}
          >
            {/* ── Header ── */}
            <div className="sticky top-0 z-20 relative">
              {/* Accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <div className="flex justify-between items-start px-6 md:px-8 py-5 bg-black/60 backdrop-blur-md rounded-t-2xl">
                <div className="flex-1 min-w-0 pr-4">
                  {/* Project number + status */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className="text-xs font-orbitron font-bold opacity-50"
                      style={{ color: accent }}
                    >
                      #{String(projectIdx + 1).padStart(2, "0")}
                    </span>
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#4ade80" }}
                      animate={{
                        boxShadow: [
                          "0 0 3px rgba(74,222,128,0.4)",
                          "0 0 10px rgba(74,222,128,0.8)",
                          "0 0 3px rgba(74,222,128,0.4)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[9px] font-orbitron text-green-400/70 uppercase tracking-[0.2em]">
                      Active
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-orbitron font-bold text-white/90 leading-tight mb-1.5">
                    {project.title}
                  </h2>
                  <p className="text-gray-500 font-inter text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-white transition-all duration-200 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 shrink-0 mt-1"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Content ── */}
            <div className="px-6 md:px-8 py-6">

              {/* Tech tags */}
              <motion.div
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.tech.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="text-[10px] font-orbitron tracking-wider px-3 py-1.5 rounded-lg border uppercase cursor-default transition-all duration-300 hover:bg-white/5"
                    style={{
                      color: accent,
                      borderColor: `${accent}20`,
                      background: `${accent}06`,
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>

              {/* ── Tabbed Panels ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Tab bar */}
                <div className="flex gap-1 mb-5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
                  {TABS.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className="relative text-[10px] font-orbitron uppercase tracking-widest px-4 md:px-5 py-2 rounded-lg transition-colors duration-300"
                      style={{
                        color: activeTab === tab.key ? tab.color : "rgb(107,114,128)",
                      }}
                    >
                      {activeTab === tab.key && (
                        <motion.div
                          layoutId="project-tab-pill"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: `${tab.color}10`,
                            border: `1px solid ${tab.color}25`,
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="relative rounded-xl p-5 md:p-6 border min-h-[120px]"
                    style={{
                      background: `${currentTabStyle?.color}04`,
                      borderColor: `${currentTabStyle?.color}15`,
                    }}
                  >
                    {/* Accent dot */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: currentTabStyle?.color,
                          boxShadow: `0 0 8px ${currentTabStyle?.color}60`,
                        }}
                      />
                      <span
                        className="text-[10px] font-orbitron uppercase tracking-[0.2em]"
                        style={{ color: currentTabStyle?.color }}
                      >
                        {currentTabStyle?.label}
                      </span>
                    </div>
                    <p className="text-gray-300 font-inter text-sm leading-[1.8]">
                      {getTabContent(activeTab)}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ── Footer ── */}
            <div className="px-6 md:px-8 py-4 border-t border-white/[0.04] flex flex-wrap items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl font-orbitron text-[10px] text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 uppercase tracking-widest"
              >
                <FaGithub size={14} /> Source Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border rounded-xl font-orbitron text-[10px] uppercase tracking-widest transition-all duration-300"
                style={{
                  color: accent,
                  borderColor: `${accent}25`,
                  background: `${accent}08`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}50`;
                  e.currentTarget.style.background = `${accent}15`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${accent}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${accent}25`;
                  e.currentTarget.style.background = `${accent}08`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Live Demo <FaExternalLinkAlt size={9} />
              </a>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-[9px] font-inter text-gray-700 hidden sm:inline">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 font-mono text-[8px]">ESC</kbd> to close
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
