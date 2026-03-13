import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleDownload = () => {
    // without navigating to a new tab or rendering the PDF in-browser.
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.setAttribute("download", "Satish_Kumar_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Cursor Glow for Hero */}
      <motion.div 
        className="absolute pointer-events-none z-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div 
        className="absolute pointer-events-none z-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-70%",
          translateY: "-30%",
        }}
      />
      <div className="relative z-10 px-4 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-24 w-full">
        {/* Left Side: Information */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-neon-cyan font-orbitron tracking-[0.3em] uppercase text-xs md:text-sm mb-6 opacity-80">
              System Online // Access Granted
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black font-orbitron mb-4 leading-[1.1] tracking-tight text-white drop-shadow-md">
              PRAJAPATI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] relative inline-block animate-glitch">
                SATISH KUMAR
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg md:text-xl font-inter text-gray-400 mb-6 font-medium tracking-wide">
              AI Developer <span className="text-neon-cyan/50 mx-2">|</span> Full Stack Developer <span className="text-neon-cyan/50 mx-2">|</span> Problem Solver
            </p>
            <p className="text-base md:text-lg font-inter text-gray-500 mb-12 italic tracking-wide max-w-2xl leading-relaxed">
              &quot;Building intelligent systems and futuristic digital experiences that bridge the gap between imagination and execution.&quot;
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 mb-16 justify-center lg:justify-start"
          >
            <a href="#projects" className="group relative px-8 py-3.5 bg-neon-cyan/10 text-neon-cyan font-orbitron text-sm tracking-widest uppercase rounded-sm border border-neon-cyan/50 hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center">
              <span className="relative z-10">View Projects</span>
            </a>

            <a href="#contact" className="group relative px-8 py-3.5 bg-transparent text-gray-300 font-orbitron text-sm tracking-widest uppercase rounded-sm border border-white/20 hover:border-white/60 hover:text-white transition-all duration-300 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 w-0 bg-white/5 transition-all duration-[250ms] ease-out group-hover:w-full" />
              <span className="relative z-10">Contact Me</span>
            </a>

            <button onClick={handleDownload} className="group relative px-8 py-3.5 bg-transparent text-neon-purple font-orbitron text-sm tracking-widest uppercase rounded-sm border border-neon-purple/50 hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_rgba(191,0,255,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center">
              <span className="relative z-10">Download Resume</span>
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex gap-10 items-center justify-center lg:justify-start"
          >
            <a href="https://github.com/satish-kumar07" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-orbitron tracking-widest uppercase">GitHub</span>
                <span className="w-1 h-1 rounded-full bg-neon-cyan scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              </div>
            </a>

            <a href="https://www.linkedin.com/in/satish-kumar-prajapati/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-orbitron tracking-widest uppercase">LinkedIn</span>
                <span className="w-1 h-1 rounded-full bg-neon-blue scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(0,123,255,0.8)]" />
              </div>
            </a>

            <a href="https://leetcode.com/u/PRAJAPATI_007/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 group">
              <div className="flex flex-col items-center gap-2">
                {/*<span className="text-xs font-orbitron tracking-widest uppercase">LeetCode</span>*/}
                <span className="w-1 h-1 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Photo Container */}
        <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto relative">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.15)] group"
          >
            {/* Subtle rotating glow ring behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan via-transparent to-neon-purple opacity-30 animate-[spin_8s_linear_infinite] rounded-full" />

            <div className="absolute inset-2 md:inset-4 rounded-full overflow-hidden bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/5 z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-photo.jpg"
                alt="Prajapati Satish Kumar"
                className="w-full h-full object-cover object-[center_top] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none opacity-80"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
