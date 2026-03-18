import React from "react";
import { motion } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";

const experiences = [
  {
    role: "AI/ML Developer Intern",
    company: "Self-Directed Projects",
    duration: "2024 – Present",
    description:
      "Building intelligent systems using Python, TensorFlow, and FastAPI. Developing machine learning models for real-world applications including NLP, computer vision, and predictive analytics.",
    techStack: ["Python", "TensorFlow", "FastAPI", "OpenCV", "Scikit-learn"],
    icon: "🤖",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple inline-block uppercase">
            EXPERIENCE.LOG
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
          className="flex flex-col items-center"
        >
          {/* Timeline: centered vertical layout */}
          <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto">
            {/* Top timeline line + dot */}
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-neon-cyan/50" />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.6)] border-2 border-black shrink-0 mb-6"
            />

            {/* Cards */}
            <div className="flex flex-col gap-10 w-full">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <MagicBentoCard
                    className="group relative bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl p-6 hover:border-neon-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-500 overflow-hidden"
                    glowColor="0, 240, 255"
                  >
                    {/* Holographic Glare */}
                    <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: idx * 0.1 + 0.3,
                          }}
                          className="w-14 h-14 rounded-full bg-black/40 border border-neon-cyan/30 flex items-center justify-center text-2xl shrink-0 group-hover:border-neon-purple/80 group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                        >
                          {exp.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-orbitron text-white group-hover:text-neon-cyan transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                            {exp.role}
                          </h3>
                          <p className="text-neon-cyan font-inter text-sm font-semibold tracking-widest uppercase opacity-80">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Duration badge */}
                      <span className="inline-block text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-orbitron text-xs tracking-widest mb-4 uppercase">
                        {exp.duration}
                      </span>

                      {/* Description */}
                      <p className="text-gray-400 font-inter text-sm leading-relaxed mb-5">
                        {exp.description}
                      </p>

                      {/* Tech Stack pills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-inter text-gray-300 hover:text-white hover:border-neon-cyan hover:shadow-neon-blue/50 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </MagicBentoCard>
                </motion.div>
              ))}
            </div>

            {/* Bottom dot + timeline line */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.6)] border-2 border-black shrink-0 mt-6"
            />
            <div className="w-px h-12 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
          </div>
        </MagicBento>
      </div>
    </section>
  );
}
