"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  
  const { scrollYProgress } = useScroll();

  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start 0.95", "start 0.3"] 
  });

  const { scrollYProgress: eduScroll } = useScroll({
    target: educationRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: skillsScroll } = useScroll({
    target: skillsRef,
    offset: ["start 0.8", "start 0.2"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 🚀 වේගය උපරිමයෙන් අඩු කර පාලනය කිරීමට (Controlled Slow Scroll)
  const slowEduSpring = useSpring(eduScroll, {
    stiffness: 10, // ඉතා මන්දගාමී වේගය
    damping: 60,   // ලිස්සා යාම නතර කර පාලනය ලබා දෙයි
    mass: 2        // රෝ එකට බරක් ලබා දී වේගය සීමා කරයි
  });

  const maskPosition = useTransform(smoothProgress, [0, 0.15], ["0% 0%", "160% 0%"], { clamp: true });
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0], { clamp: true });

  const syncRange = [0, 0.6];
  const textScale = useTransform(aboutScroll, syncRange, [1.8, 1.2], { clamp: true });
  const textContainerX = useTransform(aboutScroll, syncRange, ["25%", "0%"], { clamp: true });
  const imageOpacity = useTransform(aboutScroll, syncRange, [0, 1], { clamp: true });
  const imageX = useTransform(aboutScroll, syncRange, [120, 0], { clamp: true }); 

  // Unified Movement
  const unifiedX = useTransform(slowEduSpring, [0, 1], ["0%", "-115%"]); 

  const skillsY = useTransform(skillsScroll, [0, 1], [100, 0]);
  const skillsOpacity = useTransform(skillsScroll, [0, 0.5], [0, 1]);

  const educationData = [
    { university: "South Eastern University", degree: "BSc in Computer Science (ICT)", period: "2021 — 2025", desc: "Specializing in AI and Decentralized Technologies." },
    { university: "Secondary Education", degree: "Physical Science Stream", period: "2017 — 2019", desc: "G.C.E Advanced Level - Combined Mathematics, Physics, Chemistry." },
    { university: "Certifications", degree: "Full Stack Web Development", period: "2023", desc: "Specialized in Modern Frameworks and Cloud Deployments." }
  ];

  const skillsData = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "AI/ML Integration", "Blockchain Dev"];

  return (
    <main ref={containerRef} className="bg-slate-200 text-black w-full overflow-x-hidden relative">
      
      <div className="fixed inset-0 z-[-2] pointer-events-none" style={{ backgroundImage: "url('/BgSky.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.85)' }} />
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-30" />
      </div>

      <section className="h-screen w-full flex items-center justify-start px-12 md:px-24 sticky top-0 z-0">
        <motion.h1 style={{ WebkitMaskPosition: maskPosition, opacity: heroOpacity }} className="text-[12vw] font-bold tracking-tighter leading-[0.85] uppercase text-left text-black w-full mix-blend-difference">Imesh <br /> Chathura</motion.h1>
      </section>

      <section ref={aboutRef} className="h-screen w-full flex items-center justify-center relative z-10 px-6 mt-[20vh]">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/40 backdrop-blur-2xl border border-white/50 p-12 md:p-20 rounded-[2rem] shadow-2xl">
          <motion.div style={{ x: textContainerX, scale: textScale, transformOrigin: "left center" }} className="w-full flex flex-col justify-center origin-left">
            <h2 className="text-[10px] uppercase tracking-[0.5em] mb-4 text-slate-500 font-bold">About</h2>
            <div className="text-lg md:text-xl font-light tracking-tight leading-relaxed text-slate-900">
              <p>I am <span className="font-medium text-black">Imesh Chathura</span>, an ICT undergraduate at SEUSL researching <span className="italic font-normal">Artificial Intelligence</span> and <span className="italic font-normal">Decentralized Technology</span>.</p>
              <br />
              <p>I am passionate about exploring modern tech frontiers and building innovative solutions.</p>
            </div>
          </motion.div>
          <motion.div style={{ opacity: imageOpacity, x: imageX }} className="relative aspect-[4/5] w-full max-w-sm ml-auto bg-white/20 backdrop-blur-md border border-white/40 overflow-hidden rounded-2xl shadow-lg" />
        </div>
      </section>

      <section ref={educationRef} className="relative h-[200vh] z-20">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: unifiedX }} className="flex items-center pl-[10vw]">
            <div className="flex-shrink-0 w-[80vw] md:w-[60vw] mr-[30vw]">
              <h2 className="text-[9vw] font-bold uppercase tracking-tighter leading-[0.8] text-black mix-blend-difference">Education <br /> Journey</h2>
            </div>
            <div className="flex gap-12 pr-[10vw]">
              {educationData.map((edu, index) => (
                <div key={index} className="flex-shrink-0 w-[75vw]">
                  <div className="h-[75vh] w-full bg-white/40 backdrop-blur-3xl border border-white/50 p-12 md:p-20 rounded-[3.5rem] shadow-2xl flex flex-col justify-center">
                    <span className="text-slate-500 font-mono text-sm uppercase tracking-widest">{edu.period}</span>
                    <h3 className="text-4xl md:text-[6vw] font-bold mt-8 uppercase text-black leading-tight">{edu.university}</h3>
                    <p className="text-2xl md:text-3xl text-slate-800 mt-8 font-light">{edu.degree}</p>
                    <p className="text-slate-600 text-lg mt-10 italic leading-relaxed max-w-4xl">{edu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={skillsRef} className="min-h-screen w-full flex flex-col items-center justify-center relative z-30 px-6 py-24">
        <motion.div style={{ y: skillsY, opacity: skillsOpacity }} className="max-w-6xl w-full bg-white/30 backdrop-blur-3xl border border-white/40 p-12 md:p-20 rounded-[3.5rem] shadow-2xl">
          <h2 className="text-[10px] uppercase tracking-[0.5em] mb-12 text-slate-600 font-bold text-center">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skillsData.map((skill, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-center text-lg font-medium text-black shadow-sm">{skill}</motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="h-screen w-full flex flex-col items-center justify-center px-12 relative z-30">
        <div className="bg-white/30 backdrop-blur-xl border border-white/40 p-16 md:p-32 rounded-[4rem] text-center shadow-2xl max-w-5xl w-full">
          <h2 className="text-xs uppercase tracking-[0.5em] mb-10 text-slate-600 font-bold">Get In Touch</h2>
          <a href="mailto:hello@imesh.com" className="text-4xl md:text-[6vw] font-bold tracking-tighter uppercase text-black block">hello@imesh.com</a>
        </div>
      </section>
    </main>
  );
}