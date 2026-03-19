"use client";
import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";

/* ─── Spotlight Card ── */
const SpotlightLink = ({
  children,
  color,
  href,
}: {
  children: React.ReactNode;
  color: string;
  href: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block rounded-xl overflow-hidden"
    >
      {/* Border glow */}
      {hovered && (
        <motion.div
          className="absolute -inset-[1px] rounded-xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(250px circle at ${mouseX.get()}px ${mouseY.get()}px, ${color}25, transparent 50%)`,
          }}
        />
      )}
      <div className="relative z-10 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm transition-all duration-400 group-hover:border-white/[0.12] group-hover:bg-white/[0.04] overflow-hidden">
        {/* Interior spotlight */}
        {hovered && (
          <motion.div
            className="absolute pointer-events-none z-0"
            style={{
              width: 180,
              height: 180,
              x: mouseX.get() - 90,
              y: mouseY.get() - 90,
              background: `radial-gradient(circle, ${color}0d 0%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />
        )}
        {children}
      </div>
    </motion.a>
  );
};

/* ─── Form Input Wrapper ── */
const FloatingInput = ({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const accent = "#00f0ff";

  return (
    <div className="relative group">
      {/* Animated border highlight */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl pointer-events-none z-0"
        style={{
          background: focused
            ? `linear-gradient(135deg, ${accent}20, transparent, ${accent}10)`
            : "transparent",
        }}
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {textarea ? (
          <textarea
            name={name}
            required
            rows={4}
            onFocus={() => setFocused(true)}
            onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
            className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 pt-6 pb-3 text-white font-inter text-sm resize-none focus:outline-none focus:border-neon-cyan/40 transition-all duration-300 placeholder-transparent peer"
            placeholder={label}
          />
        ) : (
          <input
            type={type}
            name={name}
            required
            onFocus={() => setFocused(true)}
            onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
            className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 pt-6 pb-3 text-white font-inter text-sm focus:outline-none focus:border-neon-cyan/40 transition-all duration-300 placeholder-transparent peer"
            placeholder={label}
          />
        )}
        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none font-orbitron uppercase tracking-widest ${
            focused || hasValue
              ? "top-2 text-[8px] text-neon-cyan/80"
              : "top-4 text-[10px] text-gray-600"
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLDivElement>(null);
  const formMouseX = useMotionValue(0);
  const formMouseY = useMotionValue(0);
  const formRotateX = useMotionValue(0);
  const formRotateY = useMotionValue(0);
  const formSpringX = useSpring(formRotateX, { stiffness: 150, damping: 20 });
  const formSpringY = useSpring(formRotateY, { stiffness: 150, damping: 20 });
  const [formHovered, setFormHovered] = useState(false);

  const handleFormMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!formRef.current) return;
      const rect = formRef.current.getBoundingClientRect();
      formMouseX.set(e.clientX - rect.left);
      formMouseY.set(e.clientY - rect.top);
      formRotateX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -3);
      formRotateY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 3);
    },
    [formMouseX, formMouseY, formRotateX, formRotateY]
  );

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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: json,
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
    { icon: <FaEnvelope size={18} />, href: "mailto:prajapatisatishkumar792@gmail.com", label: "Email", sub: "prajapatisatishkumar792@gmail.com", color: "#00f0ff" },
    { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/satish-kumar-prajapati/", label: "LinkedIn", sub: "Connect professionally", color: "#0077b5" },
    { icon: <FaGithub size={18} />, href: "https://github.com/satish-kumar07", label: "GitHub", sub: "View my repositories", color: "#a855f7" },
    { icon: <FaMedium size={18} />, href: "https://medium.com/@prajapatisatishkumar792", label: "Medium", sub: "Read my articles", color: "#34d399" },
  ];

  return (
    <section id="contact" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-5xl mx-auto px-4">

        {/* ─── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple inline-block uppercase mb-3">
            CONTACT.INIT
          </h2>
          <p className="text-gray-500 font-inter text-sm max-w-md mx-auto">
            Have a project in mind or want to collaborate? Let&apos;s connect.
          </p>
          <div className="h-1 w-24 bg-neon-purple mx-auto mt-5 shadow-neon-purple" />
        </motion.div>

        {/* ─── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">

          {/* Left: Social Links (2 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {links.map((link, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
              >
                <SpotlightLink color={link.color} href={link.href}>
                  <div className="flex items-center gap-4 p-4 relative z-10">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300"
                      style={{
                        color: link.color,
                        borderColor: `${link.color}20`,
                        background: `${link.color}08`,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-orbitron text-sm text-white/90 group-hover:text-white transition-colors tracking-wider">
                        {link.label}
                      </h3>
                      <p className="text-[11px] font-inter text-gray-600 truncate group-hover:text-gray-400 transition-colors">
                        {link.sub}
                      </p>
                    </div>
                    <span
                      className="ml-auto text-xs opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                      style={{ color: link.color }}
                    >
                      →
                    </span>
                  </div>
                </SpotlightLink>
              </motion.div>
            ))}

            {/* Quick stats */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3 } },
              }}
              className="mt-2 flex gap-4"
            >
              {[
                { label: "Response Time", value: "< 24h", color: "#00f0ff" },
                { label: "Availability", value: "Open", color: "#4ade80" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 text-center"
                >
                  <div className="text-sm font-orbitron font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-[8px] font-orbitron text-gray-700 uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Contact Form (3 cols) */}
          <motion.div
            ref={formRef}
            onMouseMove={handleFormMouseMove}
            onMouseEnter={() => setFormHovered(true)}
            onMouseLeave={() => { setFormHovered(false); formRotateX.set(0); formRotateY.set(0); }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            style={{
              rotateX: formSpringX,
              rotateY: formSpringY,
              transformPerspective: 1000,
            }}
            className="lg:col-span-3 group relative"
          >
            {/* Border glow */}
            {formHovered && (
              <motion.div
                className="absolute -inset-[1px] rounded-2xl pointer-events-none z-0"
                style={{
                  background: `radial-gradient(400px circle at ${formMouseX.get()}px ${formMouseY.get()}px, rgba(0,240,255,0.12), transparent 50%)`,
                }}
              />
            )}

            <div className="relative z-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-white/[0.10]">
              {/* Interior spotlight */}
              {formHovered && (
                <motion.div
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: 300, height: 300,
                    x: formMouseX.get() - 150, y: formMouseY.get() - 150,
                    background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                />
              )}

              <div className="relative z-10 p-6 md:p-8">
                {/* Form header */}
                <div className="flex items-center gap-2 mb-6">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-neon-cyan"
                    animate={{
                      boxShadow: [
                        "0 0 4px rgba(0,240,255,0.4)",
                        "0 0 12px rgba(0,240,255,0.8)",
                        "0 0 4px rgba(0,240,255,0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-orbitron text-neon-cyan/70 uppercase tracking-[0.2em]">
                    Secure Channel
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-neon-cyan/15 to-transparent" />
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingInput label="Name" name="name" />
                    <FloatingInput label="Email" name="email" type="email" />
                  </div>

                  <FloatingInput label="Message" name="message" textarea />

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    whileHover={{ scale: status === "idle" ? 1.01 : 1 }}
                    whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                    className={`relative w-full py-3.5 rounded-xl font-orbitron text-[11px] uppercase tracking-widest overflow-hidden transition-all duration-300 mt-1 border ${
                      status === "success"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : status === "error"
                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                        : "border-neon-cyan/25 text-neon-cyan bg-neon-cyan/[0.04] hover:bg-neon-cyan/[0.08] hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]"
                    }`}
                  >
                    <span className="relative z-10 font-bold">
                      {status === "idle" && "Send Message →"}
                      {status === "sending" && "Transmitting..."}
                      {status === "success" && "✓ Message Delivered"}
                      {status === "error" && "Error — Retry"}
                    </span>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Footer ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-white/[0.04]"
        >
          <p className="text-[10px] font-orbitron text-gray-700 tracking-widest uppercase">
            © 2026 Prajapati Satish Kumar · Built with Next.js
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
