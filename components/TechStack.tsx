import React from "react";
import { motion } from "framer-motion";

const skills = {
  Languages: ["Python", "C++", "C", "TypeScript"],
  Frameworks: ["Django", "FastAPI", "React", "Next.js", "TailwindCSS"],
  Tools: ["GitHub", "MySQL", "SQLite", "Vercel", "Jupyter"],
};

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-foreground">
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,51,255,0.2)] transition-all duration-500"
            >
              <h3 className="text-2xl font-orbitron text-neon-blue mb-6 uppercase tracking-widest text-center">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-inter text-gray-300 hover:text-white hover:border-neon-blue hover:shadow-neon-blue/50 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
