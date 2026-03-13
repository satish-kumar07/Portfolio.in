"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const MagneticWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Multiply by a factor (e.g. 0.2) to limit movement
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Form submission error", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const links = [
    { icon: <FaEnvelope size={24} />, href: "mailto:prajapatisatishkumar792@gmail.com", label: "Email Me", color: "#00f0ff" },
    { icon: <FaLinkedin size={24} />, href: "https://www.linkedin.com/in/satish-kumar-prajapati/", label: "LinkedIn", color: "#0077b5" },
    { icon: <FaGithub size={24} />, href: "https://github.com/satish-kumar07", label: "GitHub", color: "#ffffff" }
  ];

  return (
    <section id="contact" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 border-t border-white/10 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan inline-block uppercase mb-4">
            Contact.Me
          </h2>
          <p className="text-gray-400 font-inter text-lg">
            Let&apos;s connect and build together
          </p>
          <div className="h-1 w-24 bg-neon-blue mx-auto mt-6 shadow-neon-blue"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto text-left mb-24">
          {/* Left Column: Contact Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="flex flex-col gap-6"
          >
            {links.map((link, idx) => (
              <MagneticWrapper key={idx}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                  className="group flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 relative overflow-hidden h-full"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = link.color;
                    e.currentTarget.style.boxShadow = `0 0 20px ${link.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Holographic Glare Effect */}
                  <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  {/* Hover gradient background effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `linear-gradient(90deg, ${link.color}, transparent)` }}
                  />

                  <div
                    className="p-3 rounded-lg bg-black/50 border border-white/5 transition-colors duration-300 relative z-10"
                    style={{ color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-orbitron font-bold text-gray-200 tracking-wider text-lg group-hover:text-white transition-colors">{link.label}</h3>
                    <p className="text-sm font-inter text-gray-400 truncate mt-1">
                      {link.label === "Email Me" ? "prajapatisatishkumar792@gmail.com" : "Connect with me"}
                    </p>
                  </div>
                </motion.a>
              </MagneticWrapper>
            ))}
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 p-8 rounded-xl relative overflow-hidden"
          >
            {/* Form glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />

            <form
              onSubmit={onSubmit}
              className="relative z-10 flex flex-col gap-6"
            >
              {/* Web3Forms Access Key */}
              <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY} />
              
              <div className="flex flex-col gap-2">
                <label className="font-orbitron text-xs tracking-widest text-neon-cyan uppercase">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-inter focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-orbitron text-xs tracking-widest text-neon-cyan uppercase">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-inter focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-orbitron text-xs tracking-widest text-neon-cyan uppercase">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-inter resize-none focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <MagneticWrapper>
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className={`group relative w-full py-4 border rounded-lg font-orbitron tracking-widest uppercase overflow-hidden transition-all duration-300 mt-2 ${status === "success"
                    ? "bg-green-500/20 border-green-500 text-green-400"
                    : "bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan hover:text-black"
                    }`}
                >
                  <span className="relative z-10 font-bold">
                    {status === "idle" && "Transmit Message"}
                    {status === "sending" && "Transmitting..."}
                    {status === "success" && "Message Sent"}
                    {status === "error" && "Error - Try Again"}
                  </span>

                  {status === "idle" && (
                    <div className="absolute inset-0 w-0 bg-neon-cyan transition-all duration-300 ease-out group-hover:w-full z-0" />
                  )}
                </button>
              </MagneticWrapper>
            </form>
          </motion.div>
        </div>

        <footer className="text-sm md:text-base font-inter text-gray-500 tracking-widest uppercase pb-12 text-center">
            <p>© 2026 Prajapati Satish Kumar</p>
        </footer>
      </div>
    </section>
  );
}
