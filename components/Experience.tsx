"use client";
import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const experiences = [
  {
    role: "Summer Training – Allsoft Solutions (IBM Business Partner)",
    company: "Allsoft Solutions",
    duration: "2024",
    type: "Full-time",
    description:
      "Completed an industry-oriented training program focused on Machine Learning and Generative AI using Python and Jupyter Notebook. Gained hands-on experience in building end-to-end ML pipelines and understanding real-world AI workflows.",
    achievements: [
      "Developed a Housing Price Prediction model including data preprocessing, EDA, feature engineering, and model training",
      "Worked with supervised learning algorithms and evaluated models using standard performance metrics",
      "Gained practical exposure to ML workflows and deployment-ready practices",
      "Built multiple mini-projects to strengthen understanding of real-world AI applications",
    ],
    techStack: ["Python", "TensorFlow", "Numpy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "Jupyter Notebook",],
    color: "#00f0ff",
  },
];

/* ─── Spotlight Card ── */
const SpotlightCard = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      rotateX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -5);
      rotateY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 5);
    },
    [mouseX, mouseY, rotateX, rotateY]
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); rotateX.set(0); rotateY.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className="group relative"
    >
      {hovered && (
        <motion.div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none z-0"
          style={{ background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, ${color}25, transparent 50%)` }}
        />
      )}
      <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-white/[0.12] group-hover:bg-white/[0.04] z-10">
        {hovered && (
          <motion.div
            className="absolute pointer-events-none z-0"
            style={{
              width: 280, height: 280,
              x: mouseX.get() - 140, y: mouseY.get() - 140,
              background: `radial-gradient(circle, ${color}0d 0%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4">

        {/* ─── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple inline-block uppercase">
            EXPERIENCE.LOG
          </h2>
          <div className="h-1 w-24 bg-neon-purple mx-auto mt-4 shadow-neon-purple" />
        </motion.div>

        {/* ─── Timeline ── */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-neon-cyan/40 via-neon-purple/20 to-transparent" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative pl-16 md:pl-20 pb-12"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-[18px] md:left-[26px] top-2 w-3 h-3 rounded-full z-10"
                style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}60` }}
                animate={{ boxShadow: [`0 0 6px ${exp.color}40`, `0 0 16px ${exp.color}80`, `0 0 6px ${exp.color}40`] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Card */}
              <SpotlightCard color={exp.color}>
                <div className="relative z-10 p-6 md:p-8">

                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="text-[9px] font-orbitron uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border"
                      style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}08` }}
                    >
                      {exp.type}
                    </span>
                    <span className="text-[10px] font-orbitron text-gray-600 uppercase tracking-widest">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Accent line */}
                  <div className="mb-5 relative">
                    <div className="h-[1px] w-full bg-white/[0.06]" />
                    <motion.div
                      className="absolute top-0 left-0 h-[1px]"
                      style={{ background: exp.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "30%" }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  {/* Role + Company */}
                  <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white/90 group-hover:text-white transition-colors duration-300 mb-1 leading-tight">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-orbitron uppercase tracking-[0.15em] mb-4" style={{ color: exp.color, opacity: 0.7 }}>
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p className="text-gray-500 font-inter text-sm leading-relaxed mb-5 group-hover:text-gray-400 transition-colors">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6 space-y-2">
                    {exp.achievements.map((a, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: exp.color, boxShadow: `0 0 4px ${exp.color}` }} />
                        <span className="text-gray-400 font-inter text-sm leading-relaxed">{a}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-orbitron tracking-wider px-2.5 py-1 rounded-md border uppercase text-gray-500 border-white/[0.06] hover:border-white/[0.12] hover:text-gray-300 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
