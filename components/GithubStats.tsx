"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView, useSpring } from "framer-motion";

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [isInView, to, count, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ─── Spotlight Stat Card ── */
const StatCard = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    rotateX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -6);
    rotateY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 6);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); rotateX.set(0); rotateY.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className="group relative h-full"
    >
      {hovered && (
        <motion.div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none z-0"
          style={{ background: `radial-gradient(300px circle at ${mouseX.get()}px ${mouseY.get()}px, ${color}20, transparent 50%)` }}
        />
      )}
      <div className="relative h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-white/[0.12] group-hover:bg-white/[0.04] z-10">
        {hovered && (
          <motion.div
            className="absolute pointer-events-none z-0"
            style={{
              width: 200, height: 200,
              x: mouseX.get() - 100, y: mouseY.get() - 100,
              background: `radial-gradient(circle, ${color}0a 0%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default function GithubStats() {
  const username = "satish-kumar07";
  const theme = "tokyonight";
  const [cacheBuster, setCacheBuster] = useState("");
  const [githubData, setGithubData] = useState<{
    public_repos: number;
    followers: number;
    following: number;
  } | null>(null);

  useEffect(() => {
    setCacheBuster(`&v=${Date.now()}`);
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setGithubData({
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
          });
        }
      })
      .catch(console.error);
  }, []);

  const stats = githubData
    ? [
        { label: "Repos", value: githubData.public_repos, color: "#00f0ff" },
        { label: "Followers", value: githubData.followers, color: "#a855f7" },
        { label: "Following", value: githubData.following, color: "#34d399" },
      ]
    : [];

  return (
    <section id="stats" className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* ─── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan inline-block uppercase">
            GitHub.Activity
          </h2>
          <div className="h-1 w-24 bg-neon-blue mx-auto mt-4 shadow-neon-blue" />
        </motion.div>

        {/* ─── Live Stats Row ── */}
        {githubData && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 mb-14"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="min-w-[130px]"
              >
                <StatCard color={stat.color}>
                  <div className="px-6 py-5 flex flex-col items-center text-center relative z-10">
                    <span
                      className="text-3xl md:text-4xl font-orbitron font-black mb-1"
                      style={{ color: stat.color, filter: `drop-shadow(0 0 10px ${stat.color}40)` }}
                    >
                      <CountUp to={stat.value} duration={2} />
                    </span>
                    <span className="text-[9px] font-orbitron text-gray-600 uppercase tracking-[0.3em]">
                      {stat.label}
                    </span>
                  </div>
                </StatCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ─── GitHub Stat Images Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col xl:flex-row gap-5 justify-center items-stretch w-full mb-10"
        >
          {[
            {
              src: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&bg_color=0a0a0a&hide_border=true&title_color=00f0ff&icon_color=bf00ff&text_color=ededed${cacheBuster}`,
              alt: "GitHub Stats",
              color: "#00f0ff",
              max: "max-w-[450px]",
            },
            {
              src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}&bg_color=0a0a0a&hide_border=true&title_color=bf00ff&text_color=ededed${cacheBuster}`,
              alt: "Top Languages",
              color: "#a855f7",
              max: "max-w-[400px]",
            },
            {
              src: `https://streak-stats.demolab.com/?user=${username}&theme=${theme}&background=0a0a0a&border=00000000&stroke=00000000&ring=bf00ff&fire=00f0ff${cacheBuster}`,
              alt: "GitHub Streak",
              color: "#ec4899",
              max: "max-w-[450px]",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={`flex-1 min-w-[280px] ${card.max} w-full`}
            >
              <StatCard color={card.color}>
                <div className="p-4 flex justify-center items-center relative z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="max-w-full h-auto drop-shadow-lg filter contrast-125 object-contain w-full"
                  />
                </div>
              </StatCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Visit Profile ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl border border-neon-cyan/25 bg-neon-cyan/[0.06] text-neon-cyan font-orbitron text-[11px] uppercase tracking-widest transition-all duration-300 hover:border-neon-cyan/50 hover:bg-neon-cyan/[0.12] hover:shadow-[0_0_20px_rgba(0,240,255,0.12)]"
          >
            Visit Profile
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
