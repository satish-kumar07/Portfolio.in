"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─── Data ── */
const achievements = [
  {
    title: "SQL HackerRank",
    issuer: "HackerRank",
    date: "2024",
    description:
      "Achieved a 5-star rating in SQL by solving multiple database management and query-solving challenges",
    link: "https://drive.google.com/file/d/1tZKM7fV9m1n8aGjDLDiioP5tKDiuC0SM/view?usp=sharing",
    officialLink: "https://www.hackerrank.com/certificates/db694c6dff94",
    color: "#00f0ff",
    icon: "★",
    category: "PROGRAMMING",
  },
  {
    title: "DSA Bootcamp",
    issuer: "GeeksforGeeks",
    date: "2025",
    description:
      "Completed an intensive Data Structures and Algorithms program focused on problem-solving and coding interview preparation.",
    link: "https://drive.google.com/file/d/1CBa5kM2AeI_yBWG8iumO_lrV9fS6dyr3/view?usp=sharing",
    officialLink:
      "https://www.geeksforgeeks.org/certificate/5a4ec12a24b70d46aa2703174b747101",
    color: "#a855f7",
    icon: "⬡",
    category: "ALGORITHMS",
  },
  {
    title: "OCI AI Foundations",
    issuer: "Oracle",
    date: "2025",
    description:
      "Certified in Artificial Intelligence fundamentals and cloud-based AI technologies using Oracle Cloud Infrastructure.",
    link: "https://drive.google.com/file/d/1L4QlFKSdxnNw6Wib0_a4TRTzJBc1F5y0/view",
    officialLink: "https://education.oracle.com/",
    color: "#f97316",
    icon: "◈",
    category: "CLOUD · AI",
  },
  {
    title: "Prompt Engineering",
    issuer: "Infosys",
    date: "2025",
    description:
      "Learned prompt engineering techniques for Large Language Models and generative AI applications.",
    link: "https://drive.google.com/file/d/1PJnwEncYyJg-hMgMt1lvSu9jpkbzAdJR/view",
    officialLink: "https://www.infosys.com/",
    color: "#22d3ee",
    icon: "✦",
    category: "GEN AI",
  },
  {
    title: "Computer Networking",
    issuer: "Coursera · Google",
    date: "2024",
    description:
      "Learned the fundamentals of computer networking, including TCP/IP, DNS, and network security.",
    link: "https://drive.google.com/file/d/1aQSKjWBiLi7K8MY-xJOP6edEvHYPnVXr/view?usp=sharing",
    officialLink:
      "https://www.coursera.org/account/accomplishments/verify/DUPPP5RBNVB3",
    color: "#34d399",
    icon: "⬢",
    category: "NETWORKING",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    description:
      "Learned Responsive Web Design fundamentals and best practices.",
    link: "https://drive.google.com/file/d/11Rk1bph2UHETmmZ4ZVx2NHFYUFOGW623/view?usp=sharing",
    officialLink:
      "https://www.freecodecamp.org/certification/fccbd0182e6-23ec-41dd-910d-79a055ec6ad6/responsive-web-design",
    color: "#facc15",
    icon: "◉",
    category: "WEB DESIGN",
  },
  {
    title: "Generative AI",
    issuer: "NASSCOM",
    date: "2025",
    description:
      "Learned the fundamentals of Generative AI and its applications.",
    link: "https://drive.google.com/file/d/1YUJEGEc_w8b_QnhrsNucGzP5zRbuX3sN/view?usp=sharing",
    officialLink: "https://nasscom.in/",
    color: "#ec4899",
    icon: "◎",
    category: "GEN AI",
  },
];

/* ─── Animated Counter ── */
const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const step = Math.max(1, Math.floor(target / 30));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            setCount(current);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
};

/* ─── Floating Particle ── */
const FloatingParticle = ({
  color,
  delay,
}: {
  color: string;
  delay: number;
}) => {
  const x = Math.random() * 100;
  const duration = 3 + Math.random() * 4;
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        bottom: "0%",
        background: color,
        boxShadow: `0 0 6px ${color}`,
      }}
      animate={{
        y: [0, -120 - Math.random() * 80],
        x: [(Math.random() - 0.5) * 40],
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    />
  );
};

/* ─── Holographic 3D Flip Card ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HoloCard = ({
  achievement,
  index,
  onClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  achievement: any;
  index: number;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [12, -12]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-12, 12]),
    springConfig
  );
  const shineX = useTransform(mouseX, [0, 1], ["150%", "-50%"]);
  const shineY = useTransform(mouseY, [0, 1], ["150%", "-50%"]);

  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setParticles(Array.from({ length: 8 }, (_, i) => i));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
    setTimeout(() => setParticles([]), 3000);
  }, [mouseX, mouseY]);

  const c = achievement.color;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative cursor-pointer h-full"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Floating particles */}
      <AnimatePresence>
        {isHovered &&
          particles.map((_, i) => (
            <FloatingParticle key={i} color={c} delay={i * 0.15} />
          ))}
      </AnimatePresence>

      {/* Outer glow aura */}
      <motion.div
        className="absolute -inset-3 rounded-3xl blur-xl pointer-events-none"
        style={{ background: c, opacity: 0 }}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Card body */}
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated rainbow holographic shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 opacity-0 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at ${shineX} ${shineY}, rgba(255,255,255,0.25) 0%, ${c}15 30%, transparent 70%)`,
            mixBlendMode: "overlay",
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Scanline texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
          }}
        />

        {/* Main glass surface */}
        <motion.div
          className="relative h-full flex flex-col p-6 border rounded-2xl backdrop-blur-md overflow-hidden"
          animate={{
            background: isHovered
              ? `linear-gradient(135deg, ${c}12 0%, rgba(6,6,14,0.97) 60%)`
              : "rgba(255,255,255,0.018)",
            borderColor: isHovered ? `${c}45` : "rgba(255,255,255,0.07)",
            boxShadow: isHovered
              ? `0 0 0 1px ${c}25, 0 20px 60px ${c}20, inset 0 1px 0 ${c}30`
              : "0 0 0 1px rgba(255,255,255,0.04)",
          }}
          transition={{ duration: 0.35 }}
        >
          {/* Top accent bar (animated fill) */}
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${c} 50%, transparent 100%)`,
              }}
              animate={{ x: isHovered ? "0%" : "-100%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Animated corner brackets */}
          {(["tl", "tr", "bl", "br"] as const).map((pos) => {
            const top = pos.startsWith("t");
            const left = pos.endsWith("l");
            return (
              <motion.div
                key={pos}
                className="absolute w-5 h-5 pointer-events-none z-30"
                style={{
                  top: top ? 10 : "auto",
                  bottom: !top ? 10 : "auto",
                  left: left ? 10 : "auto",
                  right: !left ? 10 : "auto",
                  borderTop: top ? `1.5px solid ${c}` : "none",
                  borderBottom: !top ? `1.5px solid ${c}` : "none",
                  borderLeft: left ? `1.5px solid ${c}` : "none",
                  borderRight: !left ? `1.5px solid ${c}` : "none",
                  borderTopLeftRadius: top && left ? 4 : 0,
                  borderTopRightRadius: top && !left ? 4 : 0,
                  borderBottomLeftRadius: !top && left ? 4 : 0,
                  borderBottomRightRadius: !top && !left ? 4 : 0,
                }}
                animate={
                  isHovered
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.3, delay: 0.05 }}
              />
            );
          })}

          {/* Category pill */}
          <motion.div
            className="self-start mb-4 px-2.5 py-1 rounded-full text-[9px] font-orbitron uppercase tracking-[0.2em] border"
            style={{ color: c, borderColor: `${c}30`, background: `${c}10` }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {achievement.category}
          </motion.div>

          {/* Giant icon + issuer */}
          <div className="flex items-start justify-between mb-4">
            {/* Pulsing icon orb */}
            <motion.div
              className="relative flex items-center justify-center w-14 h-14 rounded-2xl text-3xl"
              style={{ background: `${c}15`, border: `1px solid ${c}25` }}
              animate={
                isHovered
                  ? {
                    scale: [1, 1.12, 1.08],
                    boxShadow: [
                      `0 0 0px ${c}00`,
                      `0 0 24px ${c}80`,
                      `0 0 14px ${c}50`,
                    ],
                  }
                  : { scale: 1, boxShadow: `0 0 0px ${c}00` }
              }
              transition={{ duration: 0.5 }}
            >
              <span>{achievement.icon}</span>
              {/* Orbit ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border pointer-events-none"
                style={{ borderColor: `${c}50` }}
                animate={
                  isHovered
                    ? { scale: 1.3, opacity: 0 }
                    : { scale: 1, opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 0.4,
                }}
              />
            </motion.div>

            {/* Date badge */}
            <span className="text-[10px] font-orbitron text-gray-600 uppercase tracking-widest">
              {achievement.date}
            </span>
          </div>

          {/* Issuer */}
          <motion.span
            className="text-[10px] font-orbitron font-bold uppercase tracking-[0.22em] mb-2"
            style={{ color: c }}
            animate={{ opacity: isHovered ? 1 : 0.65 }}
          >
            {achievement.issuer}
          </motion.span>

          {/* Animated divider */}
          <div className="relative mb-4 h-px bg-white/[0.06] overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{ background: `linear-gradient(90deg, ${c}, transparent)` }}
              animate={{ width: isHovered ? "60%" : "0%" }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Title */}
          <motion.h3
            className="text-base font-orbitron font-bold text-white/90 mb-3 leading-tight"
            animate={{ color: isHovered ? "#ffffff" : "rgba(255,255,255,0.88)" }}
          >
            {achievement.title}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-500 font-inter text-xs leading-relaxed flex-grow mb-5 group-hover:text-gray-400 transition-colors duration-300">
            {achievement.description}
          </p>

          {/* Bottom CTA row */}
          <div className="mt-auto flex items-center gap-2">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="flex-1 text-[10px] font-orbitron uppercase tracking-widest py-2.5 rounded-xl border transition-all duration-300 relative overflow-hidden"
              style={{
                borderColor: `${c}35`,
                color: c,
                background: `${c}0a`,
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 0 20px ${c}30`,
                background: `${c}20`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer sweep on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(105deg, transparent 40%, ${c}20 50%, transparent 60%)`,
                }}
                animate={{ x: isHovered ? ["−100%", "200%"] : "-100%" }}
                transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 1 }}
              />
              View Cert
            </motion.button>
            <a
              href={achievement.officialLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-orbitron uppercase tracking-widest text-gray-600 hover:text-gray-300 transition-colors py-2.5 px-3 rounded-xl hover:bg-white/5"
            >
              Verify ↗
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Component ── */
export default function Achievements() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedAchievement, setSelectedAchievement] = useState<any | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState("ALL");

  const categories = [
    "ALL",
    ...Array.from(new Set(achievements.map((a) => a.category))),
  ];

  const filtered =
    activeFilter === "ALL"
      ? achievements
      : achievements.filter((a) => a.category === activeFilter);

  const getEmbedUrl = (url: string) => {
    if (url.includes("drive.google.com/file/d/")) {
      return url.replace(/\/view.*$/, "/preview");
    }
    return url;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAchievement(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="achievements" className="py-24 relative z-10 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[120px]"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px]"
          style={{
            background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)",
            bottom: "10%",
            right: "-5%",
          }}
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative">
        {/* ─── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan inline-block uppercase animate-pulse-slow">
            CERTIFICATIONS.LOG
          </h2>
          <div className="h-1 w-24 bg-neon-purple mx-auto mt-4 shadow-neon-purple" />
        </motion.div>

        {/* ─── Animated Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 md:gap-14 mb-10"
        >
          {[
            {
              label: "Earned",
              value: achievements.length,
              color: "#00f0ff",
            },
            {
              label: "Platforms",
              value: new Set(achievements.map((a) => a.issuer)).size,
              color: "#a855f7",
            },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span
                className="text-4xl font-orbitron font-black"
                style={{
                  color: s.color,
                  filter: `drop-shadow(0 0 12px ${s.color}80)`,
                }}
              >
                <AnimatedCounter target={s.value} />
              </span>
              <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-[0.28em]">
                {s.label}
              </span>
            </div>
          ))}
          {/* Progress bar */}
          <div className="flex flex-col items-center gap-2 min-w-[160px]">
            <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-[0.28em]">
              Progress
            </span>
            <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden border border-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #00f0ff, #a855f7, #ec4899)",
                  boxShadow: "0 0 12px #a855f780",
                }}
                initial={{ width: 0 }}
                whileInView={{
                  width: `${Math.min(achievements.length * 14, 100)}%`,
                }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </motion.div>

        {/* ─── Category Filter Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="text-[10px] font-orbitron uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-all duration-300"
              animate={{
                background:
                  activeFilter === cat
                    ? "rgba(168,85,247,0.18)"
                    : "transparent",
                borderColor:
                  activeFilter === cat
                    ? "rgba(168,85,247,0.5)"
                    : "rgba(255,255,255,0.08)",
                color:
                  activeFilter === cat ? "#a855f7" : "rgba(156,163,175,1)",
                boxShadow:
                  activeFilter === cat
                    ? "0 0 20px rgba(168,85,247,0.25)"
                    : "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ─── Cards Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((achievement, idx) => (
              <motion.div
                key={achievement.title}
                layout
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                className="h-full"
              >
                <HoloCard
                  achievement={achievement}
                  index={idx}
                  onClick={() => setSelectedAchievement(achievement)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── Premium Modal ── */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center pt-20 pb-4 px-4 sm:pt-20 sm:pb-8 sm:px-8"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-full sm:h-[78vh] rounded-2xl overflow-hidden flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, rgba(12,12,20,0.99) 0%, rgba(6,6,12,1) 100%)",
                border: `1px solid ${selectedAchievement.color}30`,
                boxShadow: `0 0 80px ${selectedAchievement.color}12, 0 30px 60px rgba(0,0,0,0.6)`,
              }}
            >
              {/* Animated accent top line */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${selectedAchievement.color}, transparent)`,
                }}
                initial={{ width: 0, left: "50%" }}
                animate={{ width: "100%", left: "0%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Header */}
              <div className="shrink-0 flex justify-between items-center px-5 md:px-6 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: selectedAchievement.color }}
                    animate={{
                      boxShadow: [
                        `0 0 4px ${selectedAchievement.color}40`,
                        `0 0 16px ${selectedAchievement.color}`,
                        `0 0 4px ${selectedAchievement.color}40`,
                      ],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <div>
                    <h3 className="font-orbitron text-sm md:text-base tracking-wider uppercase text-white/90 truncate">
                      {selectedAchievement.title}
                    </h3>
                    <span className="text-[10px] font-inter text-gray-500 hidden sm:inline">
                      {selectedAchievement.issuer} · {selectedAchievement.date}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 items-center ml-4 shrink-0">
                  <a
                    href={selectedAchievement.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:flex text-[10px] font-orbitron px-4 py-1.5 rounded-full uppercase tracking-widest transition-all duration-300 gap-1.5 items-center border hover:bg-white/5"
                    style={{
                      color: selectedAchievement.color,
                      borderColor: `${selectedAchievement.color}35`,
                    }}
                  >
                    Verify Official ↗
                  </a>
                  <a
                    href={selectedAchievement.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden md:flex text-[10px] font-orbitron text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded-full uppercase tracking-widest transition-colors gap-1 items-center border border-white/[0.07] hover:border-white/10"
                  >
                    Open File ↗
                  </a>
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="text-gray-500 hover:text-white transition-all duration-200 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Certificate iframe */}
              <div className="flex-1 relative overflow-hidden bg-[#060606]">
                <div
                  className="absolute top-0 left-0 w-6 h-6 border-t border-l pointer-events-none z-10"
                  style={{ borderColor: `${selectedAchievement.color}25` }}
                />
                <div
                  className="absolute top-0 right-0 w-6 h-6 border-t border-r pointer-events-none z-10"
                  style={{ borderColor: `${selectedAchievement.color}25` }}
                />
                <div
                  className="absolute bottom-0 left-0 w-6 h-6 border-b border-l pointer-events-none z-10"
                  style={{ borderColor: `${selectedAchievement.color}25` }}
                />
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 border-b border-r pointer-events-none z-10"
                  style={{ borderColor: `${selectedAchievement.color}25` }}
                />
                <iframe
                  src={getEmbedUrl(selectedAchievement.link)}
                  className="w-full h-full border-none absolute inset-0"
                  title={selectedAchievement.title}
                  allow="autoplay"
                />
              </div>

              {/* Footer */}
              <div className="shrink-0 px-5 md:px-6 py-3 flex justify-between items-center border-t border-white/[0.04] bg-black/40">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[9px] font-inter text-gray-600 uppercase tracking-wider hidden sm:inline">
                    Document Loaded
                  </span>
                </div>
                <span className="text-[9px] font-inter text-gray-700 hidden sm:inline">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 font-mono text-[8px]">
                    ESC
                  </kbd>{" "}
                  to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
