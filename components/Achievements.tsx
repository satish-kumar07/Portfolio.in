import React from "react";
import { motion } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";

const achievements = [
  {
    title: "5★ HackerRank C Programmer",
    issuer: "HackerRank",
    date: "2024",
    description:
      "Achieved a 5-star rating in C programming by solving multiple algorithmic and problem-solving challenges.",
    link: "https://www.hackerrank.com/",
    icon: "🏆"
  },
  {
    title: "Data Structures & Algorithms Bootcamp",
    issuer: "GeeksforGeeks",
    date: "2025",
    description:
      "Completed an intensive Data Structures and Algorithms program focused on problem-solving, complexity analysis, and coding interview preparation.",
    link: "https://www.geeksforgeeks.org/",
    icon: "🧠"
  },
  {
    title: "Oracle Cloud Infrastructure AI Foundations Associate",
    issuer: "Oracle",
    date: "2025",
    description:
      "Certified in Artificial Intelligence fundamentals and cloud-based AI technologies using Oracle Cloud Infrastructure.",
    link: "https://education.oracle.com/",
    icon: "☁️"
  },
  {
    title: "ChatGPT Prompt Engineering Certification",
    issuer: "Infosys",
    date: "2025",
    description:
      "Learned prompt engineering techniques for Large Language Models and generative AI applications.",
    link: "https://www.infosys.com/",
    icon: "🤖"
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple inline-block uppercase">
            CERTIFICATIONS.LOG
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
          glowColor="191, 0, 255"
        >
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-foreground"
          >

          {achievements.map((achievement, idx) => {
            return (
              <motion.a
                href={achievement.link}
                target="_blank"
                rel="noreferrer"
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
                }}
                className="h-full"
              >
                <MagicBentoCard
                  className="group relative bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl p-6 hover:border-neon-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-500 overflow-hidden flex flex-col h-full items-center text-center"
                  glowColor="191, 0, 255"
                >
                  {/* Holographic Glare Effect */}
                  <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center h-full w-full">

                    {/* Icon Unlock Animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: idx * 0.1 + 0.3 }}
                      className="mb-6 w-16 h-16 rounded-full bg-black/40 border border-neon-cyan/30 flex items-center justify-center text-3xl grayscale-0 group-hover:border-neon-purple/80 group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                    >
                      {achievement.icon}
                    </motion.div>

                    {/* Date Badge */}
                    <span className="text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-orbitron text-xs tracking-widest mb-4 uppercase">
                      {achievement.date}
                    </span>

                    {/* Content */}
                    <div className="flex-grow flex flex-col items-center w-full">
                      <h3 className="text-xl font-orbitron text-white group-hover:text-neon-cyan transition-colors duration-300 mb-2 mt-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                        {achievement.title}
                      </h3>

                      <p className={`text-neon-cyan font-inter text-sm font-semibold tracking-widest mb-4 uppercase opacity-80`}>
                        {achievement.issuer}
                      </p>

                      <p className="text-gray-400 font-inter text-sm leading-relaxed mb-6 px-2">
                        {achievement.description}
                      </p>
                    </div>

                    {/* Arrow Indicator Bottom Center */}
                    <div className="mt-auto flex items-center justify-center gap-2 text-white/40 group-hover:text-neon-cyan transition-all duration-300">
                      <span className="text-xs font-orbitron uppercase tracking-widest">Verify Link</span>
                      <span className="text-lg -rotate-45 group-hover:rotate-0 transition-all duration-300">
                        →
                      </span>
                    </div>

                  </div>
                </MagicBentoCard>
              </motion.a>
            );
          })}
          </motion.div>
        </MagicBento>
      </div>
    </section>
  );
}
