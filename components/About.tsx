import React from "react";
import { motion } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";

const education = [
  {
    degree: "B.Tech – Computer Science & Engineering (AI/ML)",
    institution: "Lovely Professional University",
    year: "2023 – Present",
    score: "CGPA: 7.48",
    color: "neon-purple"
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "Sri Chaitanya Junior College",
    year: "2018 – 2020",
    score: "96%",
    color: "neon-blue"
  },
  {
    degree: "Matriculation (Class X)",
    institution: "Sai Krishnaveni High School",
    year: "2016 – 2018",
    score: "100%",
    color: "neon-cyan"
  }
];

const about = [
  <>
    Hello, I’m <span className="text-white font-bold text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Prajapati Satish Kumar</span>. I&apos;m a Computer Science & Engineering student deeply fascinated by the intersection of <span className="text-white font-semibold">Artificial Intelligence</span>, scalable backend architecture, and creating immersive full-stack ecosystems.
  </>,
  <>
    My drive lies in turning complex, abstract concepts into tangible, high-performance applications. Whether it&apos;s architecting AI-powered platforms featuring real-time face recognition or integrating robust IoT networks, I thrive on building systems that bridge the gap between cutting-edge algorithms and seamless user experiences.
  </>,
  <>
    When I&apos;m not architecting new projects, you&apos;ll find me optimizing code through rigorous Data Structures & Algorithms practice. I believe that writing highly efficient, elegantly maintainable code is the true core of engineering intelligent solutions that leave a lasting impact.
  </>
];

export default function About() {
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
          <div className="h-1 w-24 bg-neon-cyan mx-auto mt-4 shadow-neon-cyan"></div>
        </motion.div>

        <div className="max-w-[1400px] mx-auto text-foreground flex flex-col gap-12">

          {/* Biography Profile */}
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
              <MagicBentoCard
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="w-full h-8 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent animate-scanline"></div>
                </div>

                <div className="relative z-10">
                  <div className="font-inter space-y-4 md:space-y-6 text-gray-300 leading-relaxed text-sm md:text-base max-w-4xl mx-auto text-center md:text-left">
                    {about.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </MagicBentoCard>
            </motion.div>
          </MagicBento>

          {/* Education Details - Horizontal Grid */}
          <div className="w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-orbitron text-neon-purple mb-8 tracking-widest uppercase text-center"
            >
              Academic Log
            </motion.h3>

            <MagicBento
              className="relative"
              enableStars={false}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={false}
              clickEffect={true}
              spotlightRadius={400}
              glowColor="191, 0, 255"
            >
              {/* Horizontal Timeline Arrow (right → left) */}
              <div className="hidden md:flex items-center justify-center mb-8 px-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-center w-full max-w-4xl"
                >
                  {/* Arrow tip (left = present) */}
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-neon-cyan shrink-0 drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]" />

                  {/* Timeline bar */}
                  <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan/30 relative">
                    {/* Animated pulse */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent rounded-full"
                      animate={{ x: ["100%", "-100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Labels */}
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] font-orbitron text-gray-500 tracking-widest uppercase">2016</span>
                    <div className="w-2 h-2 rounded-full bg-neon-purple/50 shadow-[0_0_8px_rgba(191,0,255,0.4)]" />
                  </div>
                </motion.div>
              </div>

              {/* Education Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <MagicBentoCard
                      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-[#bf00ff] hover:shadow-[0_8px_32px_rgba(191,0,255,0.2)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-center text-center h-full"
                      glowColor="191, 0, 255"
                    >
                      {/* Hover Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-b from-${edu.color}/5 to-[#00f0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl`} />

                      <div className="relative z-10 flex flex-col items-center h-full w-full">

                        {/* Date Badge */}
                        <span className="text-gray-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full font-orbitron text-xs tracking-widest mb-6 uppercase">
                          {edu.year}
                        </span>

                        {/* Degree */}
                        <h4 className="text-lg font-orbitron text-white group-hover:text-neon-cyan transition-colors duration-300 mb-4 h-16 flex items-center justify-center">
                          {edu.degree}
                        </h4>

                        {/* Institution */}
                        <p className={`text-${edu.color} font-inter text-sm font-semibold tracking-widest mb-6 uppercase flex-grow`}>
                          {edu.institution}
                        </p>

                        {/* Score Chip */}
                        <div className="mt-auto inline-block border border-white/20 bg-black/50 px-4 py-2 rounded-lg font-orbitron text-white/80 group-hover:border-neon-purple group-hover:text-neon-purple transition-all duration-300">
                          {edu.score}
                        </div>

                      </div>
                    </MagicBentoCard>
                  </motion.div>
                ))}
              </div>

              {/* Bottom timeline label */}
              <div className="hidden md:flex items-center justify-between mt-6 px-8 max-w-4xl mx-auto">
                <span className="text-[10px] font-orbitron text-neon-cyan/100 tracking-widest uppercase">← Present</span>
                <span className="text-[10px] font-orbitron text-gray-400 tracking-widest uppercase">Past →</span>
              </div>
            </MagicBento>
          </div>

        </div>
      </div>
    </section>
  );
}
