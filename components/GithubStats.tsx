"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";

/* ─── CountUp ── */
function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) animate(count, to, { duration, ease: "easeOut" });
  }, [isInView, to, count, duration]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ─── Animated Bar ── */
function Bar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />
    </div>
  );
}

/* ─── Types ── */
interface Repo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  description: string | null;
  html_url: string;
}
interface LangMap { [name: string]: number; }

/* ─── Language colors ── */
const LANG_COLOR: Record<string, string> = {
  Python: "#3776AB", TypeScript: "#3178C6", JavaScript: "#F7DC6F",
  "C++": "#00599C", C: "#A8B9CC", HTML: "#E34F26", CSS: "#1572B6",
  Shell: "#89E051", Jupyter: "#DA5B0B", Rust: "#DEA584", Go: "#00ADD8",
};

/* ─── Fallback data ── */
const FALLBACK_USER = { public_repos: 16, followers: 7, following: 7, created_at: "2022-01-01T00:00:00Z" };
const FALLBACK_LANGS: LangMap = { Python: 9, TypeScript: 5, JavaScript: 3, "C++": 2, HTML: 2, CSS: 1 };
const FALLBACK_REPOS: Repo[] = [
  { name: "Campus-Management-System", language: "Python", stargazers_count: 0, forks_count: 0, description: "AI face recognition attendance, food ordering, Django backend", html_url: "https://github.com/satish-kumar07" },
  { name: "Portfolio.SYS.in", language: "TypeScript", stargazers_count: 0, forks_count: 0, description: "Futuristic AI developer portfolio built with Next.js", html_url: "https://github.com/satish-kumar07" },
  { name: "Smart-Parking-System", language: "Python", stargazers_count: 0, forks_count: 0, description: "YOLOv8 number plate recognition + IoT slot monitoring", html_url: "https://github.com/satish-kumar07" },
  { name: "Housing-Price-Prediction", language: "Python", stargazers_count: 0, forks_count: 0, description: "End-to-end ML pipeline with EDA, feature engineering, model training", html_url: "https://github.com/satish-kumar07" },
];

export default function GithubStats() {
  const username = "satish-kumar07";
  interface GitHubUser { public_repos: number; followers: number; following: number; created_at: string; }
  const [githubData, setGithubData] = useState<GitHubUser>(FALLBACK_USER);
  const [langs, setLangs] = useState<LangMap>(FALLBACK_LANGS);
  const [topRepos, setTopRepos] = useState<Repo[]>(FALLBACK_REPOS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);
        const user = await userRes.json();
        const repos: Repo[] = await repoRes.json();
        if (user.message || !user.public_repos) throw new Error("rate limited");
        if (!Array.isArray(repos)) throw new Error("repos error");
        const langMap: LangMap = {};
        repos.forEach((r) => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        setGithubData(user);
        setLangs(langMap);
        setTopRepos(repos.slice(0, 4));
        setIsLive(true);
      } catch { /* keep fallback */ }
      finally { setLoading(false); }
    };
    fetcher();
  }, []);

  const totalLang = Object.values(langs).reduce((s, v) => s + v, 0) || 1;
  const sortedLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const summaryStats = [
    { label: "Repositories", value: githubData.public_repos, color: "#00f0ff" },
    { label: "Followers", value: githubData.followers, color: "#a855f7" },
    { label: "Following", value: githubData.following, color: "#34d399" },
  ];

  return (
    <section id="stats" className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan inline-block uppercase">
            GitHub.Activity
          </h2>
          <div className="h-1 w-24 bg-neon-blue mx-auto mt-4 shadow-neon-blue" />
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-400" : "bg-yellow-400"}`}
              style={{ boxShadow: isLive ? "0 0 6px #4ade80" : "0 0 6px #fbbf24" }} />
            <p className="text-[10px] font-orbitron text-gray-500 tracking-[0.2em] uppercase">
              {loading ? "Connecting..." : isLive ? "Live data · GitHub API" : "Cached data · GitHub API"}
            </p>
          </div>
        </motion.div>

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center py-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="w-7 h-7 rounded-full border-2 border-neon-cyan/30 border-t-neon-cyan" />
          </div>
        )}

        <MagicBento
          glowColor="0, 240, 255"
          enableSpotlight
          spotlightRadius={320}
          className="space-y-6"
        >
          {/* ── Summary Stats Row ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-3 gap-4"
          >
            {summaryStats.map((s, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <MagicBentoCard
                  glowColor={s.color.replace("#", "").match(/.{2}/g)!.map(x => parseInt(x, 16)).join(",")}
                  enableTilt
                  clickEffect
                  className="rounded-2xl h-full"
                >
                  <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden px-6 py-6 flex flex-col items-center text-center">
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: [0, 0.06, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                      style={{ background: `radial-gradient(circle at center, ${s.color}, transparent 70%)` }}
                    />
                    <span className="text-4xl md:text-5xl font-orbitron font-black"
                      style={{ color: s.color, textShadow: `0 0 20px ${s.color}50` }}>
                      <CountUp to={s.value} duration={2.2} />
                    </span>
                    <div className="w-8 h-px mt-2 mb-1.5" style={{ background: s.color }} />
                    <span className="text-[10px] font-orbitron text-white/50 uppercase tracking-[0.25em]">{s.label}</span>
                  </div>
                </MagicBentoCard>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Languages + Repos ── */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Languages */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <MagicBentoCard glowColor="168,85,247" enableTilt clickEffect className="rounded-2xl h-full">
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-orbitron font-bold text-white/90 uppercase tracking-widest">Languages Used</h3>
                      <p className="text-[9px] font-inter text-white/30 mt-0.5">Across all public repositories</p>
                    </div>
                    <span className="text-[9px] font-orbitron text-neon-purple border border-neon-purple/30 px-2 py-1 rounded-lg uppercase tracking-widest">
                      {sortedLangs.length} detected
                    </span>
                  </div>
                  <div className="space-y-3">
                    {sortedLangs.map(([lang, count], i) => {
                      const pct = Math.round((count / totalLang) * 100);
                      const color = LANG_COLOR[lang] || "#9ca3af";
                      return (
                        <motion.div key={lang} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 + 0.2 }} viewport={{ once: true }}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}80` }} />
                              <span className="text-xs font-orbitron text-white/80 font-medium">{lang}</span>
                            </div>
                            <span className="text-[9px] font-orbitron font-bold" style={{ color }}>{pct}%</span>
                          </div>
                          <Bar pct={pct} color={color} delay={i * 0.08 + 0.3} />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </MagicBentoCard>
            </motion.div>

            {/* Top Repos — no star/fork, real descriptions */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <MagicBentoCard glowColor="0,240,255" enableTilt clickEffect className="rounded-2xl h-full">
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-orbitron font-bold text-white/90 uppercase tracking-widest">Top Repositories</h3>
                      <p className="text-[9px] font-inter text-white/30 mt-0.5">Most recent active projects</p>
                    </div>
                    <span className="text-[9px] font-orbitron text-neon-cyan border border-neon-cyan/30 px-2 py-1 rounded-lg uppercase tracking-widest">
                      {githubData.public_repos} total
                    </span>
                  </div>
                  <div className="space-y-3">
                    {topRepos.map((repo, i) => {
                      const lang = repo.language || "Code";
                      const color = LANG_COLOR[lang] || "#9ca3af";
                      return (
                        <motion.a
                          key={repo.name}
                          href={repo.html_url} target="_blank" rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ x: 3 }} transition={{ delay: i * 0.08 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.10] hover:bg-white/[0.04] transition-all duration-300 group/repo"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                            style={{ background: `${color}15`, borderColor: `${color}30` }}>
                            <span className="text-[10px] font-orbitron font-bold" style={{ color }}>{lang.slice(0, 2).toUpperCase()}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-orbitron text-white/80 group-hover/repo:text-white truncate transition-colors">{repo.name}</p>
                            <p className="text-[9px] font-inter text-white/30 truncate">{repo.description || "No description"}</p>
                          </div>
                          <motion.span className="shrink-0 text-xs text-white/20 group-hover/repo:text-neon-cyan transition-colors">→</motion.span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </MagicBentoCard>
            </motion.div>
          </div>

          {/* Visit Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
            className="flex justify-center">
            <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer"
              className="group flex items-center gap-2.5 px-8 py-3 rounded-xl border border-neon-cyan/25 bg-neon-cyan/[0.06] text-neon-cyan font-orbitron text-[11px] uppercase tracking-widest transition-all duration-300 hover:border-neon-cyan/50 hover:bg-neon-cyan/[0.12] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              View Full Profile
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </MagicBento>

      </div>
    </section>
  );
}
