"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";

const education = [
  {
    degree: "B.Tech – Computer Science & Engineering (AI/ML)",
    institution: "Lovely Professional University",
    year: "2023 – Present",
    score: "CGPA: 7.48",
    color: "neon-purple",
    hex: "#bf00ff"
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "Sri Chaitanya Junior College",
    year: "2018 – 2020",
    score: "96%",
    color: "neon-blue",
    hex: "#0051ff"
  },
  {
    degree: "Matriculation (Class X)",
    institution: "Sai Krishnaveni High School",
    year: "2016 – 2018",
    score: "100%",
    color: "neon-cyan",
    hex: "#00f0ff"
  }
];

const about = [
  {
    label: "Who I Am",
    text: (
      <>
        I&apos;m <span className="text-neon-cyan font-semibold">Prajapati Satish Kumar</span>, a B.Tech student specializing in{" "}
        <span className="text-white font-semibold">Artificial Intelligence &amp; Machine Learning</span>. I&apos;m passionate about building intelligent systems that solve real-world problems through data-driven approaches.
      </>
    ),
  },
  {
    label: "What Drives Me",
    text: (
      <>
        I chose AI/ML because it enables systems to <span className="text-neon-purple font-semibold">learn, adapt, and make intelligent decisions</span> at scale. From{" "}
        <span className="text-white font-semibold">NLP</span> and{" "}
        <span className="text-white font-semibold">predictive modeling</span> to full-stack development — I love turning complex ideas into production-ready applications.
      </>
    ),
  },
  {
    label: "My Goal",
    text: (
      <>
        To become an <span className="text-neon-cyan font-semibold">AI/ML Engineer</span> who bridges the gap between cutting-edge research and impactful, scalable products. I thrive on writing{" "}
        <span className="text-white font-semibold">efficient, elegant code</span> that pushes the boundaries of what&apos;s possible.
      </>
    ),
  },
];

// Glitch Decrypt Text Component
const DecryptText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
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

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2; // Speed of decrypt
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
};

// Fancy Interactive Card with Mouse Flashlight
const AcademicInteractiveCard = ({ edu, idx, isHovered, isDimmed, setHoveredEduIdx }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseEnter={() => setHoveredEduIdx(idx)}
      onMouseLeave={() => setHoveredEduIdx(null)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      viewport={{ once: true }}
      className="h-full transition-all duration-500"
      style={{
        opacity: isDimmed ? 0.3 : 1,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="h-full relative group"
      >
        <MagicBentoCard
          className={`relative bg-white/[0.03] backdrop-blur-xl border rounded-2xl p-8 transition-all duration-500 flex flex-col items-center text-center h-full overflow-hidden ${
            isHovered
              ? "border-[#bf00ff]/60 shadow-[0_10px_40px_rgba(191,0,255,0.25)]"
              : "border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          }`}
          glowColor="191, 0, 255"
        >
          {/* Default Background Grid */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />

          {/* Mouse Flashlight Reveal Grid */}
          <div
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url('/grid.svg')`,
              WebkitMaskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
              maskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
            }}
          />

          {/* Mouse Flashlight Glow Ring */}
          <div
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, ${edu.hex}15, transparent 100%)`,
            }}
          />

          {/* Hover Bottom Glow */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#bf00ff] via-transparent to-transparent pointer-events-none z-0"
              />
            )}
          </AnimatePresence>

          {/* Top corner brackets on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div initial={{ opacity: 0, x: -10, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0 }} className="absolute z-10 top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#bf00ff]" />
                <motion.div initial={{ opacity: 0, x: 10, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0 }} className="absolute z-10 top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#bf00ff]" />
                <motion.div initial={{ opacity: 0, x: -10, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0 }} className="absolute z-10 bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#bf00ff]" />
                <motion.div initial={{ opacity: 0, x: 10, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0 }} className="absolute z-10 bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#bf00ff]" />
              </>
            )}
          </AnimatePresence>

          <div className="relative z-10 flex flex-col items-center h-full w-full pointer-events-none">
            {/* Date Badge */}
            <div
              className={`px-5 py-2 rounded-full font-orbitron text-[10px] tracking-[0.2em] mb-8 uppercase transition-colors duration-500 border ${
                isHovered
                  ? "bg-[#bf00ff]/10 border-[#bf00ff]/50 text-white shadow-[0_0_15px_rgba(191,0,255,0.4)]"
                  : "bg-white/5 border-white/10 text-gray-400"
              }`}
            >
              {edu.year}
            </div>

            {/* Degree (with Decrypt FX) */}
            <h4
              className={`text-xl font-orbitron transition-colors duration-500 mb-5 h-20 flex items-center justify-center leading-tight ${
                isHovered
                  ? "text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                  : "text-white"
              }`}
            >
              <DecryptText text={edu.degree} isHovered={isHovered} />
            </h4>

            {/* Institution */}
            <p
              className={`font-inter text-sm font-semibold tracking-widest mb-8 uppercase flex-grow transition-colors duration-500 ${
                isHovered ? "text-neon-purple" : `text-${edu.color}`
              }`}
            >
              {edu.institution}
            </p>

            {/* Score Chip - Turns into a data load bar on hover */}
            <div
              className={`relative w-full overflow-hidden mt-auto border px-6 py-3 rounded-xl font-orbitron text-sm transition-all duration-500 ${
                isHovered
                  ? "border-neon-cyan bg-neon-cyan/5 text-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                  : "border-white/15 bg-white/5 text-white/70"
              }`}
            >
              <span className="relative z-20 flex items-center justify-center gap-2">
                {isHovered && (
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
                )}
                {edu.score}
              </span>
              {/* Filling background bar on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute z-10 inset-y-0 left-0 bg-neon-cyan/20"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </MagicBentoCard>
      </div>
    </motion.div>
  );
};

export default function About() {
  const [hoveredAboutIdx, setHoveredAboutIdx] = useState<number | null>(null);
  const [hoveredEduIdx, setHoveredEduIdx] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan inline-block">
            SYSTEM.DATA.ABOUT
          </h2>
          <div className="h-1 w-24 bg-neon-cyan mx-auto mt-4 shadow-neon-cyan mb-2"></div>
          <p className="text-xs font-orbitron text-neon-cyan/80 tracking-[0.3em] uppercase animate-pulse">
            Interactive Core Engine
          </p>
        </motion.div>

        <div className="max-w-[1400px] mx-auto text-foreground flex flex-col gap-12">
          {/* Biography Profile — Interactive Focus panel */}
          <MagicBento
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            glowColor="0, 240, 255"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <MagicBentoCard className="bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] transition-all duration-500 relative overflow-hidden">
                {/* Dynamic grid background */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03] transition-opacity duration-700"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none rounded-xl" />

                {/* Role badge */}
                <div className="relative z-10 flex items-center gap-3 mb-8">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-neon-cyan"
                    animate={{
                      boxShadow: [
                        "0 0 4px rgba(0,240,255,0.4)",
                        "0 0 20px rgba(0,240,255,0.9)",
                        "0 0 4px rgba(0,240,255,0.4)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[12px] font-orbitron text-neon-cyan/90 tracking-[0.3em] uppercase">
                    AI/ML Engineer &bull; Full Stack Developer
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan/40 via-neon-purple/20 to-transparent" />
                </div>

                {/* 3-column paragraph grid with Hover Focus effect */}
                <div
                  className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 hover-container"
                  onMouseLeave={() => setHoveredAboutIdx(null)}
                >
                  {about.map((item, idx) => {
                    const isFaded =
                      hoveredAboutIdx !== null && hoveredAboutIdx !== idx;
                    const isHovered = hoveredAboutIdx === idx;

                    return (
                      <motion.div
                        key={idx}
                        onMouseEnter={() => setHoveredAboutIdx(idx)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.15 }}
                        viewport={{ once: true }}
                        className={`group cursor-crosshair rounded-xl p-4 -m-4 transition-all duration-500 ${
                          isHovered
                            ? "bg-white/[0.03] shadow-[inset_0_0_20px_rgba(0,240,255,0.05)] border border-white/[0.05]"
                            : "border border-transparent"
                        }`}
                        style={{
                          opacity: isFaded ? 0.2 : 1,
                          transform: isHovered
                            ? "translateY(-4px)"
                            : "translateY(0)",
                        }}
                      >
                        <h4
                          className={`text-[11px] font-orbitron tracking-[0.25em] uppercase mb-4 flex items-center gap-2 transition-colors duration-300 ${
                            isHovered ? "text-neon-cyan" : "text-neon-purple"
                          }`}
                        >
                          <motion.span
                            className={`w-2 h-2 rounded-full ${
                              isHovered
                                ? "bg-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                                : "bg-neon-purple/60"
                            }`}
                            animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          {item.label}
                        </h4>
                        <p
                          className={`font-inter text-sm leading-relaxed transition-colors duration-300 ${
                            isHovered ? "text-gray-200" : "text-gray-400"
                          }`}
                        >
                          {item.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </MagicBentoCard>
            </motion.div>
          </MagicBento>

          {/* Education Details - Interactive Academic Log */}
          <div className="w-full mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="h-px w-16 bg-gradient-to-l from-neon-purple to-transparent" />
              <h3 className="text-2xl md:text-3xl font-orbitron text-neon-purple tracking-widest uppercase text-center relative overflow-hidden group cursor-crosshair hover:text-white transition-colors">
                <span className="relative z-10">Academic Log</span>
                <motion.div className="absolute inset-0 bg-neon-purple/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              </h3>
              <div className="h-px w-16 bg-gradient-to-r from-neon-purple to-transparent" />
            </motion.div>

            <MagicBento
              className="relative"
              enableStars={false}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={false} // Disable tilt here so interactive mouse fx don't clash
              enableMagnetism={false}
              clickEffect={true}
              spotlightRadius={500}
              glowColor="191, 0, 255"
            >
              {/* INTERACTIVE TIMELINE (Desktop) */}
              <div className="hidden md:flex items-center justify-center mb-12 px-8 relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex flex-col w-full max-w-4xl relative z-10"
                >
                  <div className="flex items-center w-full relative">
                    {/* Arrow tip (left = present) */}
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[14px] border-r-neon-cyan shrink-0 drop-shadow-[0_0_8px_rgba(0,240,255,0.9)] z-20" />

                    {/* Main track */}
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-neon-cyan/50 via-neon-purple/50 to-white/10 relative overflow-hidden">
                      {/* Scanning beam */}
                      <motion.div
                        className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                        animate={{ x: ["-100%", "800%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <span className="text-[12px] font-orbitron text-gray-500 tracking-widest uppercase">
                        2016
                      </span>
                    </div>

                    {/* Timeline Interaction Nodes */}
                    {/* Maps over the 3 columns exactly */}
                    <div className="absolute inset-0 flex justify-between px-[16%] pointer-events-none">
                      {education.map((edu, idx) => {
                        const isHovered = hoveredEduIdx === idx;
                        return (
                          <div
                            key={idx}
                            className="relative flex flex-col items-center justify-center pointer-events-auto h-full mt-[-7px]"
                          >
                            {/* Glowing connector line dropping to card */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 40, opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="absolute top-4 w-px bg-gradient-to-b from-white to-transparent"
                                  style={{
                                    background: `linear-gradient(to bottom, ${edu.hex}, transparent)`,
                                  }}
                                />
                              )}
                            </AnimatePresence>

                            {/* Node Dot */}
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-slate-900 absolute z-30 cursor-pointer"
                              style={{
                                backgroundColor: isHovered ? edu.hex : "#334155",
                                boxShadow: isHovered
                                  ? `0 0 15px ${edu.hex}, 0 0 30px ${edu.hex}`
                                  : "none",
                              }}
                              animate={{ scale: isHovered ? 1.4 : 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                              onMouseEnter={() => setHoveredEduIdx(idx)}
                              onMouseLeave={() => setHoveredEduIdx(null)}
                            />

                            {/* Hover Label */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.span
                                  initial={{ opacity: 0, y: -15 }}
                                  animate={{ opacity: 1, y: -25 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  className="absolute whitespace-nowrap text-[10px] font-orbitron px-2 py-1 rounded bg-black/80 border border-white/20 tracking-widest text-white z-40"
                                >
                                  {edu.year}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Education Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
                {education.map((edu, idx) => {
                  const isHovered = hoveredEduIdx === idx;
                  const isDimmed = hoveredEduIdx !== null && hoveredEduIdx !== idx;

                  return (
                    <AcademicInteractiveCard
                      key={idx}
                      edu={edu}
                      idx={idx}
                      isHovered={isHovered}
                      isDimmed={isDimmed}
                      setHoveredEduIdx={setHoveredEduIdx}
                    />
                  );
                })}
              </div>

              {/* Bottom timeline label */}
              <div className="hidden md:flex items-center justify-between mt-8 px-8 max-w-4xl mx-auto border-t border-white/10 pt-4">
                <span className="text-[10px] font-orbitron text-neon-cyan/100 tracking-[0.3em] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
                  INIT: PRESENT
                </span>
                <span className="text-[10px] font-orbitron text-gray-500 tracking-[0.3em] uppercase">
                  ORIGIN: PAST
                </span>
              </div>
            </MagicBento>
          </div>
        </div>
      </div>
    </section>
  );
}
