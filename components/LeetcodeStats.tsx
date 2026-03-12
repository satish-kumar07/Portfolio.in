"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

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

export default function LeetcodeStats() {
  const username = "PRAJAPATI_007";
  const [solvedData, setSolvedData] = useState<any>(null);
  const [calendarData, setCalendarData] = useState<any>(null);

  const [yearSelected, setYearSelected] = useState<string>("Current");

  // Real-time LeetCode Data
  useEffect(() => {
    // Cache buster
    const timestamp = Date.now();
    const headers = { "Cache-Control": "no-cache" };

    // Fetch Solved Stats
    fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved?t=${timestamp}`, { cache: "no-store", headers })
      .then((res) => res.json())
      .then((data) => setSolvedData(data))
      .catch(console.error);

    // Fetch Calendar
    fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar?t=${timestamp}`, { cache: "no-store", headers })
      .then((res) => res.json())
      .then((data) => {
        try {
          const submissionCalendar = JSON.parse(data.submissionCalendar || "{}");
          setCalendarData({ ...data, submissionCalendar });
        } catch (e) {
          console.error(e);
        }
      })
      .catch(console.error);
  }, []);

  // Normalize LeetCode unix timestamps into local midnight timestamps
  const normalizedCalendar = useMemo(() => {
    if (!calendarData?.submissionCalendar) return {};
    const norm: Record<number, number> = {};
    for (const [key, val] of Object.entries(calendarData.submissionCalendar)) {
      const date = new Date(parseInt(key) * 1000);
      date.setHours(0, 0, 0, 0);
      const dayKey = date.getTime();
      norm[dayKey] = (norm[dayKey] || 0) + (val as number);
    }
    return norm;
  }, [calendarData]);

  // Compute Heatmap based on selected year
  const { grid, monthLabels, totalSubmissions } = useMemo(() => {
    const isCurrent = yearSelected === "Current";

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    if (isCurrent) {
      startDate.setFullYear(endDate.getFullYear() - 1);
    } else {
      const year = parseInt(yearSelected);
      startDate.setFullYear(year, 0, 1);
      endDate.setFullYear(year, 11, 31);
      if (endDate > new Date()) {
        endDate.setTime(new Date().getTime()); // Don't show future for current year
        endDate.setHours(0, 0, 0, 0);
      }
    }

    // Align start date to Sunday
    const startDayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDayOfWeek);

    const generatedGrid = [];
    const generatedMonthLabels: { month: string; colIndex: number }[] = [];
    let currentMonth = -1;
    let submissionsInPeriod = 0;

    let col = 0;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate || currentDate.getDay() !== 0) { // Keep going until Saturday
      const colDays = [];
      for (let row = 0; row < 7; row++) {
        // Track month changes for labels
        if (row === 0 && currentDate <= endDate) {
          const m = currentDate.getMonth();
          if (m !== currentMonth) {
            generatedMonthLabels.push({
              month: currentDate.toLocaleString("default", { month: "short" }),
              colIndex: col,
            });
            currentMonth = m;
          }
        }

        const isFuture = currentDate > endDate;
        let count = 0;

        if (!isFuture) {
          const dayKey = currentDate.getTime();
          count = normalizedCalendar[dayKey] || 0;
          submissionsInPeriod += count;
        }

        colDays.push({
          date: new Date(currentDate),
          count,
          isFuture,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
      generatedGrid.push(colDays);
      col++;
    }

    return { grid: generatedGrid, monthLabels: generatedMonthLabels, totalSubmissions: submissionsInPeriod };
  }, [normalizedCalendar, yearSelected]);

  // Months header spacing logic
  const getMonthPosition = (colIndex: number, totalCols: number) => {
    return `${(colIndex / totalCols) * 100}%`;
  };

  const stats = [
    { label: "Problems Solved", value: solvedData?.solvedProblem || 0, color: "text-white", border: "hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" },
    { label: "Easy", value: solvedData?.easySolved || 0, color: "text-[#00b8a3]", border: "hover:border-[#00b8a3]/50 hover:shadow-[0_0_20px_rgba(0,184,163,0.2)]" },
    { label: "Medium", value: solvedData?.mediumSolved || 0, color: "text-[#ffc01e]", border: "hover:border-[#ffc01e]/50 hover:shadow-[0_0_20px_rgba(255,192,30,0.2)]" },
    { label: "Hard", value: solvedData?.hardSolved || 0, color: "text-[#ff375f]", border: "hover:border-[#ff375f]/50 hover:shadow-[0_0_20px_rgba(255,55,95,0.2)]" },
  ];

  return (
    <section id="leetcode" className="py-24 relative z-10 font-inter text-gray-300">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">

        <div className="relative mb-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 inline-block uppercase tracking-wider">
              LEETCODE.STATS
            </h2>
            <div className="h-0.5 w-16 bg-orange-500 mx-auto mt-3 shadow-[0_0_10px_rgba(249,115,22,1)]"></div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-full">
          
          {/* Top Row: Exactly 4 Boxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl px-4 py-8 flex flex-col items-center justify-center text-center transition-all duration-500 w-full hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] ${stat.border}`}
              >
                <div className={`text-4xl font-black font-orbitron mb-2 drop-shadow-md ${stat.color}`}>
                  {stat.value > 0 ? <CountUp to={stat.value} duration={2} /> : 0}
                </div>
                <div className="text-gray-400 font-inter tracking-widest uppercase text-xs sm:text-sm font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: Full Width Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-xl p-6 flex flex-col transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] group overflow-hidden relative"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 relative z-10 w-full">
              <div className="text-white text-[15px] max-w-full">
                <span className="font-semibold text-lg">{totalSubmissions}</span> submissions in {yearSelected === "Current" ? "the past one year" : yearSelected}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="text-gray-400 flex items-center gap-1">
                  Total active days: <span className="text-white font-semibold flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>{calendarData?.totalActiveDays || 0}</span>
                </div>
                <div className="text-gray-400 flex items-center gap-1">
                  Max streak: <span className="text-white font-semibold flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div>{calendarData?.streak || 0}</span>
                </div>
                
                {/* Year Selector */}
                <select 
                  value={yearSelected}
                  onChange={(e) => setYearSelected(e.target.value)}
                  className="bg-white/10 border border-white/10 text-white text-xs py-1.5 px-3 rounded-md cursor-pointer outline-none hover:bg-white/20 backdrop-blur-sm transition-colors focus:ring-2 focus:ring-orange-500/50"
                >
                  <option value="Current" className="bg-[#282828] text-white">Current</option>
                  {calendarData?.activeYears?.map((year: number) => (
                    <option key={year} value={year.toString()} className="bg-[#282828] text-white">{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full max-w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="min-w-[750px] flex flex-col pr-4">
                {/* Grid */}
                <div className="flex gap-[3px] flex-1 w-full justify-between">
                  {grid.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-[3px]">
                      {col.map((day, rowIdx) => {
                        let bgColor = "bg-white/5 border border-white/5"; // Glass effect for empty cells
                        if (!day.isFuture) {
                          if (day.count === 1) bgColor = "bg-[#0e4429] border border-[#0e4429]/50 shadow-[0_0_5px_rgba(14,68,41,0.5)]";
                          else if (day.count === 2 || day.count === 3) bgColor = "bg-[#006d32] border border-[#006d32]/50 shadow-[0_0_8px_rgba(0,109,50,0.6)]";
                          else if (day.count >= 4 && day.count <= 6) bgColor = "bg-[#26a641] border border-[#26a641]/50 shadow-[0_0_12px_rgba(38,166,65,0.7)]";
                          else if (day.count > 6) bgColor = "bg-[#39d353] border border-[#39d353]/50 shadow-[0_0_15px_rgba(57,211,83,0.9)]";
                        } else {
                          bgColor = "bg-transparent border border-transparent";
                        }

                        return (
                          <div
                            key={rowIdx}
                            className={`w-3 h-3 sm:w-[13px] sm:h-[13px] rounded-[3px] ${bgColor} transition-all duration-300 hover:scale-150 hover:z-20 cursor-pointer relative z-10`}
                            title={!day.isFuture ? `${day.count} submissions on ${day.date.toDateString()}` : undefined}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Months Row (Moved Below Grid) */}
                <div className="relative h-5 w-full mt-2 text-[#737373] text-xs">
                  {monthLabels.map((lbl, idx) => (
                    <span
                      key={idx}
                      className="absolute"
                      style={{ left: getMonthPosition(lbl.colIndex, grid.length) }}
                    >
                      {lbl.month}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-1.5 text-[#737373] text-xs mt-2">
              <span>Less</span>
              <div className="w-[13px] h-[13px] rounded-[2px] bg-[#3e3e3e]" />
              <div className="w-[13px] h-[13px] rounded-[2px] bg-[#0e4429]" />
              <div className="w-[13px] h-[13px] rounded-[2px] bg-[#006d32]" />
              <div className="w-[13px] h-[13px] rounded-[2px] bg-[#26a641]" />
              <div className="w-[13px] h-[13px] rounded-[2px] bg-[#39d353]" />
              <span>More</span>
            </div>
          </motion.div>
        </div>

        {/* Visit Profile Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center w-full"
        >
          <a
            href={`https://leetcode.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-orange-500/50 hover:bg-orange-500 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] rounded-lg transition-all duration-300"
          >
            <span className="font-orbitron tracking-widest text-sm text-orange-500 group-hover:text-black uppercase transition-colors font-bold">
              View Profile
            </span>
            <span className="text-orange-500 group-hover:text-black group-hover:translate-x-1 transition-all duration-300 text-lg">
              →
            </span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
