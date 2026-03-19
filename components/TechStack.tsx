import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";
import {
  SiPython, SiCplusplus, SiC, SiTypescript,
  SiDjango, SiFastapi, SiReact, SiNextdotjs, SiTailwindcss,
  SiGithub, SiMysql, SiSqlite, SiVercel, SiJupyter,
  SiScikitlearn, SiPandas, SiNumpy, SiStreamlit,
  SiGooglecolab, SiGit, SiOpencv, SiTensorflow
} from "react-icons/si";

type IconComponent = React.ComponentType<{ className?: string; size?: number }>;

interface SkillEntry {
  name: string;
  icon?: IconComponent;
  color: string;
  level: number; // 1-5 dots
}

interface Category {
  id: string;
  label: string;
  emoji: string;
  skills: SkillEntry[];
}

const categories: Category[] = [
  {
    id: "ml",
    label: "ML / AI",
    emoji: "🤖",
    skills: [
      { name: "Supervised Learning", color: "#00f0ff", level: 4 },
      { name: "Unsupervised Learning", color: "#00f0ff", level: 3 },
      { name: "NLP", color: "#bf00ff", level: 4 },
      { name: "Model Evaluation", color: "#00f0ff", level: 4 },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", level: 3 },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8", level: 3 },
    ],
  },
  {
    id: "libs",
    label: "Libraries",
    emoji: "🧮",
    skills: [
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E", level: 4 },
      { name: "Pandas", icon: SiPandas, color: "#150458", level: 5 },
      { name: "NumPy", icon: SiNumpy, color: "#4DABCF", level: 5 },
      { name: "Matplotlib", color: "#11557C", level: 4 },
      { name: "Seaborn", color: "#44A4C2", level: 4 },
      { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B", level: 3 },
    ],
  },
  {
    id: "lang",
    label: "Languages",
    emoji: "💻",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB", level: 5 },
      { name: "C++", icon: SiCplusplus, color: "#00599C", level: 3 },
      { name: "C", icon: SiC, color: "#A8B9CC", level: 3 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 4 },
      { name: "SQL", icon: SiMysql, color: "#4479A1", level: 3 },
    ],
  },
  {
    id: "web",
    label: "Web",
    emoji: "🌐",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB", level: 4 },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 4 },
      { name: "Django", icon: SiDjango, color: "#092E20", level: 4 },
      { name: "FastAPI", icon: SiFastapi, color: "#009688", level: 4 },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4", level: 4 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    emoji: "⚙️",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", level: 4 },
      { name: "GitHub", icon: SiGithub, color: "#ffffff", level: 5 },
      { name: "Jupyter", icon: SiJupyter, color: "#F37626", level: 5 },
      { name: "Google Colab", icon: SiGooglecolab, color: "#F9AB00", level: 4 },
      { name: "Vercel", icon: SiVercel, color: "#ffffff", level: 4 },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 3 },
      { name: "SQLite", icon: SiSqlite, color: "#003B57", level: 3 },
    ],
  },
];

// Skill tile component
function SkillTile({ skill, index }: { skill: SkillEntry; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/15 rounded-2xl p-5 md:p-6 flex flex-col items-center gap-3 cursor-default transition-all duration-400 min-w-[120px] shrink-0 snap-start"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        style={{
          boxShadow: `0 0 20px ${skill.color}15, inset 0 0 15px ${skill.color}08`,
        }}
      />

      {/* Icon or emoji fallback */}
      <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {Icon ? (
          <span
            className="inline-flex transition-all duration-300"
            style={{ color: hovered ? skill.color : "#9ca3af" }}
          >
            <Icon size={28} />
          </span>
        ) : (
          <span
            className="text-xl font-bold font-orbitron transition-colors duration-300"
            style={{ color: hovered ? skill.color : "#6b7280" }}
          >
            {skill.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className="text-sm font-inter text-gray-400 group-hover:text-white text-center transition-colors duration-300 leading-tight font-medium whitespace-nowrap"
      >
        {skill.name}
      </span>

      {/* Proficiency dots */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor:
                dot <= skill.level
                  ? hovered
                    ? skill.color
                    : "rgba(255,255,255,0.25)"
                  : "rgba(255,255,255,0.06)",
            }}
            animate={
              hovered && dot <= skill.level
                ? {
                    boxShadow: `0 0 6px ${skill.color}60`,
                  }
                : { boxShadow: "none" }
            }
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("ml");
  const activeCat = categories.find((c) => c.id === activeTab)!;

  return (
    <section id="tech" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple inline-block uppercase">
            Tech.Stack.Init
          </h2>
          <div className="h-1 w-24 bg-neon-purple mx-auto mt-4 shadow-neon-purple mb-4"></div>
          <p className="text-xs font-orbitron text-gray-500 tracking-[0.3em] uppercase">
            Core Technical Skills
          </p>
        </motion.div>

        <MagicBento
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={false}
          spotlightRadius={500}
          glowColor="0, 240, 255"
        >
          <MagicBentoCard
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.15)]"
          >
            {/* Glass highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />

            {/* Tab bar */}
            <div className="relative z-10 flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs font-orbitron tracking-widest uppercase transition-all duration-300 border ${
                    activeTab === cat.id
                      ? "text-white border-neon-cyan/40 bg-neon-cyan/10 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                      : "text-gray-500 border-transparent hover:text-gray-300 hover:border-white/10 hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Active indicator glow */}
                  {activeTab === cat.id && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 rounded-xl bg-neon-cyan/10 border border-neon-cyan/25"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Skill count */}
            <div className="relative z-10 flex items-center gap-3 mb-6 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
              <span className="text-[10px] font-orbitron text-gray-500 tracking-[0.2em] uppercase">
                {activeCat.skills.length} Skills Loaded
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            {/* Skill tiles grid */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex overflow-x-auto gap-4 pb-4 px-2 snap-x scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {activeCat.skills.map((skill, i) => (
                    <SkillTile key={skill.name} skill={skill} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </MagicBentoCard>
        </MagicBento>
      </div>
    </section>
  );
}
