import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";
import {
  SiPython, SiCplusplus, SiC, SiTypescript,
  SiDjango, SiFastapi, SiReact, SiNextdotjs, SiTailwindcss,
  SiGithub, SiMysql, SiSqlite, SiVercel, SiJupyter
} from "react-icons/si";

type IconComponent = React.ComponentType<{ className?: string; size?: number }>;

const skillIcons: Record<string, IconComponent> = {
  Python: SiPython,
  "C++": SiCplusplus,
  C: SiC,
  TypeScript: SiTypescript,
  Django: SiDjango,
  FastAPI: SiFastapi,
  React: SiReact,
  "Next.js": SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  GitHub: SiGithub,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  Vercel: SiVercel,
  Jupyter: SiJupyter,
};

const skillColors: Record<string, string> = {
  Python: "#3776AB",
  "C++": "#00599C",
  C: "#A8B9CC",
  TypeScript: "#3178C6",
  Django: "#092E20",
  FastAPI: "#009688",
  React: "#61DAFB",
  "Next.js": "#ffffff",
  TailwindCSS: "#06B6D4",
  GitHub: "#ffffff",
  MySQL: "#4479A1",
  SQLite: "#003B57",
  Vercel: "#ffffff",
  Jupyter: "#F37626",
};

const skills = {
  Languages: ["Python", "C++", "C", "TypeScript"],
  Frameworks: ["Django", "FastAPI", "React", "Next.js", "TailwindCSS"],
  Tools: ["GitHub", "MySQL", "SQLite", "Vercel", "Jupyter"],
};

function SkillPill({ skill }: { skill: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skillIcons[skill];
  const color = skillColors[skill] || "#00f0ff";

  return (
    <motion.span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-inter text-gray-300 hover:text-white hover:border-neon-blue hover:shadow-neon-blue/50 transition-all duration-300 cursor-default flex items-center gap-2 overflow-hidden"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <AnimatePresence>
        {hovered && Icon && (
          <motion.span
            initial={{ opacity: 0, scale: 0, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: "auto" }}
            exit={{ opacity: 0, scale: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center"
          >
            <Icon className="shrink-0" size={16} />
          </motion.span>
        )}
      </AnimatePresence>
      <span
        className="transition-colors duration-300"
        style={hovered ? { color } : undefined}
      >
        {skill}
      </span>

      {/* Glow ring on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            boxShadow: `0 0 12px ${color}44, inset 0 0 8px ${color}22`,
          }}
        />
      )}
    </motion.span>
  );
}

export default function TechStack() {
  return (
    <section id="tech" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple inline-block uppercase">
            Tech.Stack.Init
          </h2>
          <div className="h-1 w-24 bg-neon-purple mx-auto mt-4 shadow-neon-purple"></div>
        </motion.div>

        <MagicBento
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          glowColor="0, 240, 255"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-foreground"
        >
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <MagicBentoCard className="h-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,51,255,0.2)] transition-all duration-500">
                <h3 className="text-2xl font-orbitron text-neon-blue mb-6 uppercase tracking-widest text-center">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {items.map((skill, i) => (
                    <SkillPill key={i} skill={skill} />
                  ))}
                </div>
              </MagicBentoCard>
            </motion.div>
          ))}
        </MagicBento>
      </div>
    </section>
  );
}
