"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";

/* ─── Data ── */
const achievements = [
  {
    title: "SQL HackerRank",
    issuer: "HackerRank",
    date: "2024",
    description: "Achieved a 5-star rating in SQL by solving multiple database management and query-solving challenges",
    link: "https://drive.google.com/file/d/1tZKM7fV9m1n8aGjDLDiioP5tKDiuC0SM/view?usp=sharing",
    officialLink: "https://www.hackerrank.com/certificates/db694c6dff94",
    color: "#00f0ff",
  },
  {
    title: "DSA Bootcamp",
    issuer: "GeeksforGeeks",
    date: "2025",
    description: "Completed an intensive Data Structures and Algorithms program focused on problem-solving and coding interview preparation.",
    link: "https://drive.google.com/file/d/1CBa5kM2AeI_yBWG8iumO_lrV9fS6dyr3/view?usp=sharing",
    officialLink: "https://www.geeksforgeeks.org/certificate/5a4ec12a24b70d46aa2703174b747101",
    color: "#a855f7",
  },
  {
    title: "OCI AI Foundations",
    issuer: "Oracle",
    date: "2025",
    description: "Certified in Artificial Intelligence fundamentals and cloud-based AI technologies using Oracle Cloud Infrastructure.",
    link: "https://drive.google.com/file/d/1L4QlFKSdxnNw6Wib0_a4TRTzJBc1F5y0/view",
    officialLink: "https://education.oracle.com/",
    color: "#f97316",
  },
  {
    title: "Prompt Engineering",
    issuer: "Infosys",
    date: "2025",
    description: "Learned prompt engineering techniques for Large Language Models and generative AI applications.",
    link: "https://drive.google.com/file/d/1PJnwEncYyJg-hMgMt1lvSu9jpkbzAdJR/view",
    officialLink: "https://www.infosys.com/",
    color: "#22d3ee",
  },
  {
    title: "Computer Networking",
    issuer: "Coursera · Google",
    date: "2024",
    description: "Learned the fundamentals of computer networking, including TCP/IP, DNS, and network security.",
    link: "https://drive.google.com/file/d/1aQSKjWBiLi7K8MY-xJOP6edEvHYPnVXr/view?usp=sharing",
    officialLink: "https://www.coursera.org/account/accomplishments/verify/DUPPP5RBNVB3",
    color: "#34d399",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    description: "Learned Responsive Web Design fundamentals and best practices.",
    link: "https://drive.google.com/file/d/11Rk1bph2UHETmmZ4ZVx2NHFYUFOGW623/view?usp=sharing",
    officialLink: "https://www.freecodecamp.org/certification/fccbd0182e6-23ec-41dd-910d-79a055ec6ad6/responsive-web-design",
    color: "#facc15",
  },
  {
    title: "Generative AI",
    issuer: "NASSCOM",
    date: "2025",
    description: "Learned the fundamentals of Generative AI and its applications.",
    link: "https://drive.google.com/file/d/1YUJEGEc_w8b_QnhrsNucGzP5zRbuX3sN/view?usp=sharing",
    officialLink: "https://nasscom.in/",
    color: "#ec4899",
  },
];

/* ─── Cursor-Tracking Spotlight Card ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpotlightCard = ({ children, achievement, onClick }: { children: React.ReactNode; achievement: any; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      rotateX.set(((y - rect.height / 2) / rect.height) * -8);
      rotateY.set(((x - rect.width / 2) / rect.width) * 8);
    },
    [mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const c = achievement.color;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className="h-full cursor-pointer group relative"
    >
      {/* ── Outer glow ring */}
      <motion.div
        className="absolute -inset-[1.5px] rounded-2xl pointer-events-none z-0"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, ${c}35, transparent 55%)` }}
      />

      {/* ── Main Card */}
      <div
        className="relative h-full rounded-2xl backdrop-blur-sm overflow-hidden z-10 transition-all duration-400"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${c}08 0%, rgba(5,5,12,0.98) 50%, rgba(8,8,16,0.99) 100%)`
            : "rgba(255,255,255,0.015)",
          border: isHovered ? `1px solid ${c}30` : "1px solid rgba(255,255,255,0.06)",
          boxShadow: isHovered ? `0 0 30px ${c}15, inset 0 1px 0 ${c}20` : "none",
        }}
      >
        {/* Animated top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none z-20"
          style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
          animate={isHovered ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Animated corner brackets */}
        {(["tl", "tr", "bl", "br"] as const).map((pos) => {
          const top = pos.startsWith("t");
          const left = pos.endsWith("l");
          return (
            <motion.div
              key={pos}
              className="absolute pointer-events-none z-20 w-4 h-4"
              style={{
                top: top ? 8 : "auto", bottom: !top ? 8 : "auto",
                left: left ? 8 : "auto", right: !left ? 8 : "auto",
                borderTop: top ? `1.5px solid ${c}` : "none",
                borderBottom: !top ? `1.5px solid ${c}` : "none",
                borderLeft: left ? `1.5px solid ${c}` : "none",
                borderRight: !left ? `1.5px solid ${c}` : "none",
                borderRadius: top && left ? "4px 0 0 0" : top && !left ? "0 4px 0 0" : !top && left ? "0 0 0 4px" : "0 0 4px 0",
              }}
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            />
          );
        })}

        {/* Inner cursor spotlight */}
        <motion.div
          className="absolute pointer-events-none z-0 rounded-full"
          style={{ width: 260, height: 260, x: mouseX.get() - 130, y: mouseY.get() - 130, background: `radial-gradient(circle, ${c}10 0%, transparent 70%)` }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        />

        {children}
      </div>
    </motion.div>
  );
};


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

/* ─── Main Component ── */
export default function Achievements() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedAchievement, setSelectedAchievement] = useState<any | null>(null);

  const getEmbedUrl = (url: string) => {
    if (url.includes("drive.google.com/file/d/")) {
      return url.replace(/\/view.*$/, "/preview");
    }
    return url;
  };

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAchievement(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* ─── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple inline-block uppercase">
            CERTIFICATIONS.LOG
          </h2>
          <div className="h-1 w-24 bg-neon-purple mx-auto mt-4 shadow-neon-purple"></div>
        </motion.div>

        {/* ─── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl md:text-4xl font-orbitron font-bold text-neon-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]">
              <AnimatedCounter target={achievements.length} />
            </span>
            <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-[0.3em]">Earned</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl md:text-4xl font-orbitron font-bold text-neon-purple drop-shadow-[0_0_12px_rgba(191,0,255,0.5)]">
              <AnimatedCounter target={new Set(achievements.map((a) => a.issuer)).size} />
            </span>
            <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-[0.3em]">Platforms</span>
          </div>
          <div className="flex flex-col items-center gap-2 min-w-[140px]">
            <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-[0.3em]">Progress</span>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(achievements.length * 14, 100)}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00f0ff, #a855f7, #ec4899)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* ─── Cards Grid ── */}
        <MagicBento
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={false}
          spotlightRadius={400}
          glowColor="191, 0, 255"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 text-foreground"
          >
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="h-full"
              >
                <SpotlightCard
                  achievement={achievement}
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  <MagicBentoCard
                    className="relative flex flex-col h-full p-0"
                    glowColor="191, 0, 255"
                  >
                    <div className="relative z-10 flex flex-col h-full p-6">

                      {/* ── Top: Issuer + Date ── */}
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className="text-[10px] font-orbitron font-semibold uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ color: achievement.color }}
                        >
                          {achievement.issuer}
                        </span>
                        <span className="text-[10px] font-orbitron text-gray-600 uppercase tracking-widest">
                          {achievement.date}
                        </span>
                      </div>

                      {/* ── Accent Line ── */}
                      <div className="mb-5 relative">
                        <div className="h-[1px] w-full bg-white/[0.06]" />
                        <motion.div
                          className="absolute top-0 left-0 h-[1px]"
                          style={{ background: achievement.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: "40%" }}
                          transition={{ duration: 0.8, delay: idx * 0.1 + 0.4 }}
                          viewport={{ once: true }}
                        />
                      </div>

                      {/* ── Title ── */}
                      <h3 className="text-lg font-orbitron font-bold text-white/90 group-hover:text-white transition-colors duration-300 mb-3 leading-tight">
                        {achievement.title}
                      </h3>

                      {/* ── Description ── */}
                      <p className="text-gray-500 font-inter text-sm leading-relaxed mb-6 group-hover:text-gray-400 transition-colors duration-300 flex-grow">
                        {achievement.description}
                      </p>

                      {/* ── Bottom Actions ── */}
                      <div className="mt-auto flex items-center gap-3">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAchievement(achievement);
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 text-[10px] font-orbitron uppercase tracking-widest py-2.5 rounded-lg border transition-all duration-300 text-center"
                          style={{
                            borderColor: `${achievement.color}30`,
                            color: achievement.color,
                            background: `${achievement.color}08`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${achievement.color}18`;
                            e.currentTarget.style.borderColor = `${achievement.color}60`;
                            e.currentTarget.style.boxShadow = `0 0 20px ${achievement.color}15`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${achievement.color}08`;
                            e.currentTarget.style.borderColor = `${achievement.color}30`;
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          View
                        </motion.button>
                        <a
                          href={achievement.officialLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] font-orbitron uppercase tracking-widest text-gray-600 hover:text-gray-300 transition-colors py-2.5 px-3"
                        >
                          Verify ↗
                        </a>
                      </div>

                    </div>
                  </MagicBentoCard>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </MagicBento>
      </div>

      {/* ─── Premium Modal ── */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center pt-20 pb-4 px-4 sm:pt-20 sm:pb-8 sm:px-8 bg-black/90 backdrop-blur-lg"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-full sm:h-[75vh] rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "linear-gradient(180deg, rgba(15,15,20,0.98) 0%, rgba(8,8,12,0.99) 100%)",
                border: `1px solid ${selectedAchievement.color}25`,
                boxShadow: `0 0 60px ${selectedAchievement.color}10, 0 25px 50px rgba(0,0,0,0.5)`,
              }}
            >
              {/* ── Header ── */}
              <div className="shrink-0 relative">
                {/* Accent line under header */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px]"
                  style={{ background: `linear-gradient(90deg, ${selectedAchievement.color}, transparent)` }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                <div className="flex justify-between items-center px-5 md:px-6 py-4">
                  {/* Left: Title area */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Breathing dot */}
                    <motion.div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: selectedAchievement.color }}
                      animate={{
                        boxShadow: [
                          `0 0 4px ${selectedAchievement.color}60`,
                          `0 0 12px ${selectedAchievement.color}`,
                          `0 0 4px ${selectedAchievement.color}60`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="min-w-0">
                      <h3 className="font-orbitron text-sm md:text-base tracking-wider uppercase text-white/90 truncate">
                        {selectedAchievement.title}
                      </h3>
                      <span className="text-[10px] font-inter text-gray-500 hidden sm:inline">
                        {selectedAchievement.issuer} · {selectedAchievement.date}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex gap-2 items-center shrink-0 ml-4">
                    <a
                      href={selectedAchievement.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden sm:flex text-[10px] font-orbitron px-4 py-1.5 rounded-full uppercase tracking-widest transition-all duration-300 gap-1.5 items-center border hover:bg-white/5"
                      style={{
                        color: selectedAchievement.color,
                        borderColor: `${selectedAchievement.color}30`,
                      }}
                    >
                      Verify Official ↗
                    </a>
                    <a
                      href={selectedAchievement.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden md:flex text-[10px] font-orbitron text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded-full uppercase tracking-widest transition-colors gap-1 items-center border border-white/[0.06] hover:border-white/10"
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
              </div>

              {/* ── Certificate Content ── */}
              <div className="flex-1 w-full relative overflow-hidden bg-[#080808]">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l pointer-events-none z-10" style={{ borderColor: `${selectedAchievement.color}20` }} />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r pointer-events-none z-10" style={{ borderColor: `${selectedAchievement.color}20` }} />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l pointer-events-none z-10" style={{ borderColor: `${selectedAchievement.color}20` }} />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r pointer-events-none z-10" style={{ borderColor: `${selectedAchievement.color}20` }} />

                <iframe
                  src={getEmbedUrl(selectedAchievement.link)}
                  className="w-full h-full border-none absolute inset-0 bg-white"
                  title={selectedAchievement.title}
                  allow="autoplay"
                />
              </div>

              {/* ── Footer ── */}
              <div className="shrink-0 px-5 md:px-6 py-3 flex justify-between items-center border-t border-white/[0.04] bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  <span className="text-[9px] font-inter text-gray-600 uppercase tracking-wider hidden sm:inline">Document Loaded</span>
                </div>
                <span className="text-[9px] font-inter text-gray-700 hidden sm:inline">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 font-mono text-[8px]">ESC</kbd> to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
