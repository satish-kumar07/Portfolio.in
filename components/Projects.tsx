"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Smart Parking System",
    description: "Real-time parking slot monitoring, QR-based check-in, YOLOv8 number plate recognition, and IoT sensor integration.",
    tech: ["React", "Tailwind", "Firebase", "YOLOv8", "OpenCV", "Jupyter Notebook", "JavaScript"],
    github: "https://github.com/satish-kumar07/Smart-Parking-System",
    live: "https://smart-parking.ramdev.xyz/",
  },
  {
    title: "Campus Management System",
    description: "AI face recognition attendance, automated email notifications, food ordering module, and backend optimization.",
    tech: ["Python", "Django", "OpenCV", "SQLite", "HTML", "CSS"],
    github: "https://github.com/satish-kumar07/Campus-Management-System",
    live: "https://campus-management-system-6mbh.onrender.com/",
  },
  {
    title: "RAG on DSA",
    description: "A developer-focused AI assistant that uses Retrieval-Augmented Generation to provide accurate explanations for Data Structures and Algorithms queries by combining semantic search with LLM reasoning.",
    tech: ["Python", "Jupyter Notebook", "LLM", "RAG", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/satish-kumar07/RAG_ON_DSA",
    live: "https://github.com/satish-kumar07/RAG_ON_DSA"
  },
  {
    title: "Real-Time-Ivy-League-OI-SCI-main",
    description: "A comprehensive platform that aggregates real-time academic opportunities from Ivy League universities and matches them to student profiles using AI-powered analysis.",
    tech: ["Python", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/satish-kumar07/Real-Time-Ivy-League-OI-SCI-main",
    live: "https://ivy-league-frontend-met5.onrender.com/"
  },
  {
    title: "Fake-Social-Media-Accounts-Detection",
    description: "A fake social media account is an inauthentic profile created for deception, spam, or manipulation, as opposed to genuine user accounts representing real individuals or legitimate organizations.",
    tech: ["Python", "Jupyter Notebook"],
    github: "https://github.com/satish-kumar07/Fake-Social-Media-Accounts-Detection",
    live: "https://github.com/satish-kumar07/Fake-Social-Media-Accounts-Detection"
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectCard = ({ project, idx }: { project: any; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.2 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-neon-cyan shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-500 h-full flex flex-col"
    >
      {/* 3D Inner Container */}
      <div
        className="p-6 relative z-10 flex flex-col h-full bg-white/5 backdrop-blur-md rounded-xl overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Glowing Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-2xl font-orbitron text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 font-inter text-sm mb-6 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t: string, i: number) => (
              <span key={i} className="text-xs font-inter text-neon-purple bg-neon-purple/10 px-2 py-1 rounded-sm border border-neon-purple/30">
                {t}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
            <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_#ffffff] transition-all">
              <FaGithub size={20} />
            </a>
            <a href={project.live} target="_blank" rel="noreferrer" className="text-neon-cyan text-sm font-orbitron hover:shadow-neon-cyan px-4 py-1 border border-neon-cyan/50 rounded-sm hover:bg-neon-cyan/10 transition-all flex items-center gap-2">
              DEMO <FaExternalLinkAlt size={12} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple inline-block">
            PROJECTS
          </h2>
          <div className="h-1 w-24 bg-neon-purple mx-auto mt-4 shadow-neon-purple"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
          {projects.map((project, idx) => (
            <div key={idx} style={{ perspective: 1000 }}>
              <ProjectCard project={project} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
