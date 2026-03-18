import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import GithubStats from "@/components/GithubStats";
import Experience from "@/components/Experience";
// import LeetcodeStats from "@/components/LeetcodeStats";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>Prajapati Satish Kumar | AI Developer</title>
        <meta name="description" content="Futuristic AI Developer Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Background />
      <Navbar />

      <main className="min-h-screen">
        <Hero />
        <About />
        <TechStack />
        <Achievements />
        <Projects />
        <Experience />
        <GithubStats />
        {/* <LeetcodeStats /> */}
        <Contact />
      </main>
    </>
  );
}
