"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import MagicBento, { MagicBentoCard } from "./MagicBento";
import ProjectModal from "./ProjectModal";
import projects, { Project } from "@/data/projectsData";

/* ─── Per-project accent colors ── */
const ACCENTS = ["#00f0ff", "#a855f7", "#f97316", "#34d399", "#ec4899"];

/* ─── Spotlight Card with 3D tilt ── */
const ProjectCard = ({
  project,
  idx,
  onOpen,
}: {
  project: Project;
  idx: number;
  onOpen: (p: Project) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[idx % ACCENTS.length];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      rotateX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -8);
      rotateY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 8);
    },
    [mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className="h-full cursor-pointer group relative"
    >
      {/* Cursor border glow */}
      {hovered && (
        <motion.div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(350px circle at ${mouseX.get()}px ${mouseY.get()}px, ${accent}30, transparent 50%)`,
          }}
        />
      )}

      <MagicBentoCard
        className="relative h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-white/[0.12] group-hover:bg-white/[0.04] z-10"
        glowColor="0, 240, 255"
      >
        {/* Interior cursor spotlight */}
        {hovered && (
          <motion.div
            className="absolute pointer-events-none z-0"
            style={{
              width: 220,
              height: 220,
              x: mouseX.get() - 110,
              y: mouseY.get() - 110,
              background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />
        )}

        <div className="relative z-10 p-6 flex flex-col h-full">

          {/* ── Top: Number + Status ── */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span
                className="text-2xl font-orbitron font-black opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                style={{ color: accent }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accent }}
                  animate={hovered ? {
                    boxShadow: [`0 0 3px ${accent}60`, `0 0 10px ${accent}`, `0 0 3px ${accent}60`],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[9px] font-orbitron text-gray-600 uppercase tracking-[0.2em]">
                  Active
                </span>
              </div>
            </div>
            <span className="text-[9px] font-orbitron text-gray-700 uppercase tracking-widest">
              {project.tech.length} Modules
            </span>
          </div>

          {/* ── Accent Line ── */}
          <div className="mb-5 relative">
            <div className="h-[1px] w-full bg-white/[0.06]" />
            <motion.div
              className="absolute top-0 left-0 h-[1px]"
              style={{ background: accent }}
              initial={{ width: 0 }}
              whileInView={{ width: "35%" }}
              transition={{ duration: 0.7, delay: idx * 0.08 + 0.3 }}
              viewport={{ once: true }}
            />
          </div>

          {/* ── Title ── */}
          <h3 className="text-lg font-orbitron font-bold text-white/90 group-hover:text-white transition-colors duration-300 mb-3 leading-tight">
            {project.title}
          </h3>

          {/* ── Description ── */}
          <p className="text-gray-500 font-inter text-sm leading-relaxed mb-5 group-hover:text-gray-400 transition-colors duration-300 flex-grow">
            {project.description}
          </p>

          {/* ── Tech Tags ── */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-[9px] font-orbitron tracking-wider px-2 py-1 rounded-md border uppercase transition-all duration-300"
                style={{
                  color: hovered ? accent : "rgb(156,163,175)",
                  borderColor: hovered ? `${accent}30` : "rgba(255,255,255,0.06)",
                  background: hovered ? `${accent}08` : "transparent",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* ── Bottom Actions ── */}
          <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/[0.04]">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-[10px] font-orbitron text-gray-500 hover:text-gray-200 uppercase tracking-widest transition-colors py-1.5"
            >
              <FaGithub size={14} /> Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[10px] font-orbitron uppercase tracking-widest px-3 py-1.5 rounded-md border transition-all duration-300"
              style={{
                color: accent,
                borderColor: `${accent}30`,
                background: `${accent}08`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${accent}60`;
                e.currentTarget.style.background = `${accent}15`;
                e.currentTarget.style.boxShadow = `0 0 15px ${accent}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${accent}30`;
                e.currentTarget.style.background = `${accent}08`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Live <FaExternalLinkAlt size={8} />
            </a>
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(project); }}
              className="ml-auto text-[9px] font-orbitron text-gray-600 hover:text-gray-300 uppercase tracking-widest transition-colors"
            >
              Details →
            </button>
          </div>

        </div>
      </MagicBentoCard>
    </motion.div>
  );
};

/* ─── Main Component ── */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section id="projects" className="py-24 relative z-10 bg-transparent">
        <div className="max-w-6xl mx-auto px-4">

          {/* ─── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple inline-block">
              PROJECTS
            </h2>
            <div className="h-1 w-24 bg-neon-purple mx-auto mt-4 shadow-neon-purple" />
          </motion.div>

          {/* ─── Stats ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 md:gap-12 mb-14"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-orbitron font-bold text-neon-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                {projects.length}
              </span>
              <span className="text-[9px] font-orbitron text-gray-600 uppercase tracking-[0.3em]">Built</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-orbitron font-bold text-neon-purple drop-shadow-[0_0_10px_rgba(191,0,255,0.4)]">
                {new Set(projects.flatMap(p => p.tech)).size}
              </span>
              <span className="text-[9px] font-orbitron text-gray-600 uppercase tracking-[0.3em]">Technologies</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-orbitron font-bold text-green-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                {projects.filter(p => p.live && !p.live.includes("github")).length}
              </span>
              <span className="text-[9px] font-orbitron text-gray-600 uppercase tracking-[0.3em]">Live</span>
            </div>
          </motion.div>

          {/* ─── Grid ── */}
          <MagicBento
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={false}
            spotlightRadius={400}
            glowColor="0, 240, 255"
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
            >
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    idx={idx}
                    onOpen={handleOpenModal}
                  />
                </motion.div>
              ))}
            </motion.div>
          </MagicBento>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
