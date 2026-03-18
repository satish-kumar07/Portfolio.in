"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import MagicBento, { MagicBentoCard } from "./MagicBento";

function CountUp({ to, duration = 2 }: { to: number, duration?: number }) {
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

export default function GithubStats() {
  const username = "satish-kumar07";
  const theme = "tokyonight";
  const [cacheBuster, setCacheBuster] = useState("");
  const [githubData, setGithubData] = useState<{ public_repos: number, followers: number, following: number } | null>(null);

  useEffect(() => {
    // Generates a unique timestamp on the client side to bypass any CDN caching
    setCacheBuster(`&v=${Date.now()}`);

    // Fetch live basic stats for count-up
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.public_repos !== undefined) {
          setGithubData({
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following
          });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section id="stats" className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="relative mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan inline-block uppercase">
              GitHub.Activity
            </h2>
            <div className="h-1 w-24 bg-neon-blue mx-auto mt-4 shadow-neon-blue"></div>
          </motion.div>
        </div>

        <MagicBento
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          glowColor="0, 51, 255"
        >
          {/* Custom Count Up Row */}
          {githubData && (
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
              className="flex flex-wrap justify-center gap-6 mb-12 w-full"
            >
              {[
                { label: "Repositories", value: githubData.public_repos, color: "text-neon-blue", border: "hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,51,255,0.2)]", glowColor: "0, 51, 255" },
                { label: "Followers", value: githubData.followers, color: "text-white", border: "hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]", glowColor: "255, 255, 255" },
                { label: "Following", value: githubData.following, color: "text-neon-cyan", border: "hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]", glowColor: "0, 240, 255" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  className="w-full sm:w-auto min-w-[160px] flex-1"
                >
                  <MagicBentoCard
                    className={`bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl px-8 py-6 flex flex-col items-center justify-center text-center transition-all duration-500 h-full group relative overflow-hidden ${stat.border}`}
                    glowColor={stat.glowColor}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className={`text-4xl font-black font-orbitron mb-2 relative z-10 ${stat.color} drop-shadow-[0_0_8px_rgba(0,123,255,0.4)]`}>
                      <CountUp to={stat.value} duration={2} />
                    </div>
                    <div className="text-gray-400 font-inter text-sm tracking-widest uppercase relative z-10">
                      {stat.label}
                    </div>
                  </MagicBentoCard>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="flex flex-col xl:flex-row gap-6 justify-center items-stretch w-full"
          >
            {/* GitHub Stats */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex-1 min-w-[300px] max-w-[450px] w-full"
            >
              <MagicBentoCard
                className="w-full h-full bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl p-4 hover:border-neon-blue hover:shadow-[0_0_30px_rgba(0,51,255,0.2)] transition-all duration-500 overflow-hidden flex justify-center items-center group relative"
                glowColor="0, 51, 255"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&bg_color=0a0a0a&hide_border=true&title_color=00f0ff&icon_color=bf00ff&text_color=ededed${cacheBuster}`}
                  alt="GitHub Stats"
                  className="max-w-full h-auto drop-shadow-lg filter contrast-125 object-contain relative z-10 w-full"
                />
              </MagicBentoCard>
            </motion.div>

            {/* Top Languages */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex-1 min-w-[300px] max-w-[400px] w-full"
            >
              <MagicBentoCard
                className="w-full h-full bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl p-4 hover:border-neon-purple hover:shadow-[0_0_30px_rgba(191,0,255,0.2)] transition-all duration-500 flex justify-center items-center group relative"
                glowColor="191, 0, 255"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}&bg_color=0a0a0a&hide_border=true&title_color=bf00ff&text_color=ededed${cacheBuster}`}
                  alt="Top Languages"
                  className="max-w-full h-auto drop-shadow-lg filter contrast-125 object-contain relative z-10 w-full"
                />
              </MagicBentoCard>
            </motion.div>

            {/* GitHub Streak */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex-1 min-w-[300px] max-w-[450px] w-full"
            >
              <MagicBentoCard
                className="w-full h-full bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl p-4 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-500 flex justify-center items-center group relative"
                glowColor="0, 240, 255"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://streak-stats.demolab.com/?user=${username}&theme=${theme}&background=0a0a0a&border=00000000&stroke=00000000&ring=bf00ff&fire=00f0ff${cacheBuster}`}
                  alt="GitHub Streak"
                  className="max-w-full h-auto drop-shadow-lg filter contrast-125 object-contain relative z-10 w-full"
                />
              </MagicBentoCard>
            </motion.div>
          </motion.div>
        </MagicBento>

        {/* Visit Profile Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-neon-cyan/50 hover:bg-neon-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] rounded-lg transition-all duration-300"
          >
            <span className="font-orbitron tracking-widest text-sm text-neon-cyan group-hover:text-black uppercase transition-colors font-bold">
              Visit Profile
            </span>
            <span className="text-neon-cyan group-hover:text-black group-hover:translate-x-1 transition-all duration-300 text-lg">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
